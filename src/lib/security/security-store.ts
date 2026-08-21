import { Redis } from "@upstash/redis";

export type RateLimitResult = {
  allowed: boolean;
  retryAfter: number;
};

export type FormTokenRecord = {
  issuedAt: number;
  expiresAt: number;
  context: string;
  used: boolean;
};

export type ConsumeTokenResult =
  "consumed" | "missing" | "changed" | "duplicate";

export interface SecurityStore {
  issueTokenPair(
    csrfKey: string,
    formKey: string,
    record: FormTokenRecord,
    ttlSeconds: number,
  ): Promise<boolean>;
  hasCsrfToken(key: string): Promise<boolean>;
  getFormToken(key: string): Promise<FormTokenRecord | null>;
  consumeFormToken(
    key: string,
    expected: FormTokenRecord,
    duplicateKey: string,
    duplicateTtlSeconds: number,
  ): Promise<ConsumeTokenResult>;
  incrementLimit(
    key: string,
    limit: number,
    windowSeconds: number,
  ): Promise<RateLimitResult>;
  releaseLimit(key: string): Promise<void>;
}

const PREFIX = "yge:contact-security:";

function serializeRecord(record: FormTokenRecord) {
  return `${record.issuedAt}:${record.expiresAt}:${record.used ? "1" : "0"}:${record.context}`;
}

function parseRecord(value: unknown): FormTokenRecord | null {
  if (typeof value !== "string") return null;
  const [issuedAt, expiresAt, used, context, ...extra] = value.split(":");
  if (
    extra.length ||
    !issuedAt ||
    !expiresAt ||
    !context ||
    !["0", "1"].includes(used)
  )
    return null;
  const parsed = {
    issuedAt: Number(issuedAt),
    expiresAt: Number(expiresAt),
    context,
    used: used === "1",
  };
  return Number.isSafeInteger(parsed.issuedAt) &&
    Number.isSafeInteger(parsed.expiresAt)
    ? parsed
    : null;
}

class RedisSecurityStore implements SecurityStore {
  constructor(private readonly redis: Redis) {}

  async issueTokenPair(
    csrfKey: string,
    formKey: string,
    record: FormTokenRecord,
    ttlSeconds: number,
  ) {
    const result = await this.redis.eval<string[], number>(
      `
        if redis.call("EXISTS", KEYS[1]) == 1 or redis.call("EXISTS", KEYS[2]) == 1 then
          return 0
        end
        redis.call("SET", KEYS[1], "1", "EX", ARGV[1])
        redis.call("SET", KEYS[2], ARGV[2], "EX", ARGV[1])
        return 1
      `,
      [PREFIX + csrfKey, PREFIX + formKey],
      [String(ttlSeconds), serializeRecord(record)],
    );
    return result === 1;
  }

  async hasCsrfToken(key: string) {
    return (await this.redis.exists(PREFIX + key)) === 1;
  }

  async getFormToken(key: string) {
    return parseRecord(await this.redis.get(PREFIX + key));
  }

  async consumeFormToken(
    key: string,
    expected: FormTokenRecord,
    duplicateKey: string,
    duplicateTtlSeconds: number,
  ) {
    const result = await this.redis.eval<string[], number>(
      `
        local current = redis.call("GET", KEYS[1])
        if not current then return 0 end
        if current ~= ARGV[1] then return 2 end
        if redis.call("EXISTS", KEYS[2]) == 1 then return 3 end
        redis.call("SET", KEYS[1], ARGV[3], "KEEPTTL")
        redis.call("SET", KEYS[2], "1", "EX", ARGV[2], "NX")
        return 1
      `,
      [PREFIX + key, PREFIX + duplicateKey],
      [
        serializeRecord(expected),
        String(duplicateTtlSeconds),
        serializeRecord({ ...expected, used: true }),
      ],
    );
    return (
      (["missing", "consumed", "changed", "duplicate"] as const)[result] ??
      "changed"
    );
  }

  async incrementLimit(key: string, limit: number, windowSeconds: number) {
    const result = await this.redis.eval<string[], [number, number]>(
      `
        local current = redis.call("INCR", KEYS[1])
        if current == 1 then redis.call("EXPIRE", KEYS[1], ARGV[2]) end
        local ttl = redis.call("TTL", KEYS[1])
        if current > tonumber(ARGV[1]) then return {0, ttl} end
        return {1, ttl}
      `,
      [PREFIX + key],
      [String(limit), String(windowSeconds)],
    );
    return {
      allowed: result[0] === 1,
      retryAfter: Math.max(1, result[1]),
    };
  }

  async releaseLimit(key: string) {
    await this.redis.eval<[], number>(
      `
        local current = tonumber(redis.call("GET", KEYS[1]) or "0")
        if current > 1 then return redis.call("DECR", KEYS[1]) end
        if current == 1 then return redis.call("DEL", KEYS[1]) end
        return 0
      `,
      [PREFIX + key],
      [],
    );
  }
}

export class MemorySecurityStore implements SecurityStore {
  private readonly values = new Map<
    string,
    { value: string; expiresAt: number }
  >();

  private get(key: string) {
    const entry = this.values.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
      this.values.delete(key);
      return null;
    }
    return entry;
  }

  async issueTokenPair(
    csrfKey: string,
    formKey: string,
    record: FormTokenRecord,
    ttlSeconds: number,
  ) {
    if (this.get(csrfKey) || this.get(formKey)) return false;
    const expiresAt = Date.now() + ttlSeconds * 1_000;
    this.values.set(csrfKey, { value: "1", expiresAt });
    this.values.set(formKey, { value: serializeRecord(record), expiresAt });
    return true;
  }

  async hasCsrfToken(key: string) {
    return Boolean(this.get(key));
  }

  async getFormToken(key: string) {
    return parseRecord(this.get(key)?.value);
  }

  async consumeFormToken(
    key: string,
    expected: FormTokenRecord,
    duplicateKey: string,
    duplicateTtlSeconds: number,
  ): Promise<ConsumeTokenResult> {
    const current = this.get(key);
    if (!current) return "missing";
    if (current.value !== serializeRecord(expected)) return "changed";
    if (this.get(duplicateKey)) return "duplicate";
    this.values.set(key, {
      ...current,
      value: serializeRecord({ ...expected, used: true }),
    });
    this.values.set(duplicateKey, {
      value: "1",
      expiresAt: Date.now() + duplicateTtlSeconds * 1_000,
    });
    return "consumed";
  }

  async incrementLimit(key: string, limit: number, windowSeconds: number) {
    const existing = this.get(key);
    const value = Number(existing?.value ?? 0) + 1;
    const expiresAt = existing?.expiresAt ?? Date.now() + windowSeconds * 1_000;
    this.values.set(key, { value: String(value), expiresAt });
    return {
      allowed: value <= limit,
      retryAfter: Math.max(1, Math.ceil((expiresAt - Date.now()) / 1_000)),
    };
  }

  async releaseLimit(key: string) {
    const existing = this.get(key);
    if (!existing) return;
    const value = Number(existing.value);
    if (value <= 1) this.values.delete(key);
    else this.values.set(key, { ...existing, value: String(value - 1) });
  }
}

let store: SecurityStore | undefined;

export function getSecurityStore() {
  if (store) return store;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    store = new RedisSecurityStore(new Redis({ url, token }));
    return store;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("Durable contact security storage is not configured");
  }
  store = new MemorySecurityStore();
  return store;
}

export function setSecurityStoreForTests(replacement?: SecurityStore) {
  if (process.env.NODE_ENV === "production") return;
  store = replacement;
}
