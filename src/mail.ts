import { ByteSource } from "./content";

export interface MailLibrary {
  send(params: EmailParams): boolean;
}

export interface EmailAttachment {
  readonly fileName: string;
  readonly data: ByteSource;
  readonly mimeType: string;
  readonly headers: { [key: string]: string };
}

export interface EmailParams {
  readonly from: string;
  readonly to: string | ReadonlyArray<string>;
  readonly cc?: string | ReadonlyArray<string>;
  readonly bcc?: string | ReadonlyArray<string>;
  readonly replyTo?: string;
  readonly subject: string;
  readonly body: string;
  readonly contentType?: string;
  readonly headers?: string;
  readonly attachments?: ReadonlyArray<EmailAttachment>;
}
