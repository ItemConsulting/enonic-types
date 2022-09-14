declare global {
  interface XpLibraries {
    "/lib/xp/mail": typeof import("./index");
  }
}

export function send(params: EmailParams): boolean;

export interface EmailAttachment {
  fileName: string;
  data: import("@item-enonic-types/content").ByteSource;
  mimeType?: string;
  headers?: Record<string, string>;
}

export interface EmailParams {
  from: string;
  to: string | ReadonlyArray<string>;
  cc?: string | ReadonlyArray<string>;
  bcc?: string | ReadonlyArray<string>;
  replyTo?: string;
  subject: string;
  body: string;
  contentType?: string;
  headers?: Record<string, string>;
  attachments?: ReadonlyArray<EmailAttachment>;
}
