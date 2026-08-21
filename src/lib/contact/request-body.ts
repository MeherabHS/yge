export const MAX_CONTACT_PAYLOAD_BYTES = 16_384;

export class PayloadTooLargeError extends Error {}

export async function readLimitedJson(request: Request): Promise<unknown> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const parsed = Number(declaredLength);
    if (!Number.isSafeInteger(parsed) || parsed < 0) throw new SyntaxError();
    if (parsed > MAX_CONTACT_PAYLOAD_BYTES) throw new PayloadTooLargeError();
  }

  if (!request.body) throw new SyntaxError();
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytesRead = 0;
  let body = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytesRead += value.byteLength;
      if (bytesRead > MAX_CONTACT_PAYLOAD_BYTES) {
        await reader.cancel();
        throw new PayloadTooLargeError();
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  return JSON.parse(body) as unknown;
}
