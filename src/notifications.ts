import {ByteSource} from "./content";

export interface NotificationsLibrary {
  /**
   * Generate a VAPID public/private key pair.
   */
  generateKeyPair(): KeyPair;

  /**
   * Send a push notification to a client.
   */
  send<A extends object | string>(params: SendParams<A>): number;

  /**
   * Send a push notification to a client. The notification will be sent asynchronously.
   */
  sendAsync<A extends object | string>(params: SendAsyncParams<A>): void;
}

export interface KeyPair {
  /**
   * A new private key encoded as Base64.
   */
  readonly privateKey: string;

  /**
   * A new public key encoded as Base64.
   */
  readonly publicKey: string;

  /**
   * The private key as a binary stream.
   */
  readonly privateKeyBytes: ByteSource;

  /**
   * The public key as a binary stream.
   */
  readonly publicKeyBytes: ByteSource;
}

export interface SendParams<A extends object | string> {
  /**
   * VAPID private key.
   */
  privateKey: string;

  /**
   * VAPID public key.
   */
  publicKey: string;

  /**
   * The Push service endpoint URL, received as part of the Subscription data.
   */
  endpoint: string;

  /**
   * The auth key received as part of the Subscription data.
   */
  auth: string;

  /**
   * The p256dh key received as part of the Subscription data.
   */
  receiverKey: string;

  /**
   * Message payload to send.
   */
  payload: A;
}

export type SendAsyncParams<A extends object | string> = SendParams<A> & {
  /**
   * A function to be called if the sending succeeds. The function gets passed the status from the HTTP request made.
   */
  success: (status: number) => void;

  /**
   * A function to be called if the sending fails.
   */
  error: (status: number) => void;
};
