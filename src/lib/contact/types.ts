export type ContactPayload = {
  name?: unknown;
  email?: unknown;
  organization?: unknown;
  topic?: unknown;
  message?: unknown;
  addressLine2?: unknown;
};

export type ContactMessage = {
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string;
};

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "topic" | "message", string>
>;

export type ContactValidationResult =
  | { success: true; message: ContactMessage }
  | {
      success: false;
      fieldErrors: ContactFieldErrors;
      honeypot: boolean;
      malformed: boolean;
    };
