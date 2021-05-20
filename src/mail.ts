import { ByteSource } from "./content";

export interface MailLibrary {
  send(params: EmailParams): boolean;
}

export interface EmailAttachment {
  fileName: string;
  data: ByteSource;
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
