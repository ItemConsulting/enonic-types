import type { ByteSource } from "@enonic-types/core";

/**
 * Generates a PNG image with a QR Code that encodes the specified text. The value returned is a stream object.
 * It can be set as the response of an HTTP request, stored in a node or content, or manipulated using the lib-io.
 *
 * Throws an error if `text` is empty, or too long to be encoded in a QR code.
 *
 * @param options Options for the QR code
 */
export function generateQrCode(options: GenerateQrCodeParams): ByteSource;

export interface GenerateQrCodeParams {
  /**
   * The text or URL to be encoded in the QR code. Must not be empty. The text is encoded as UTF-8.
   */
  text: string;

  /**
   * The width and height (in pixels) of the square image generated. Must be a whole number. The default value is 250.
   *
   * Note: The image can be larger than this, if the QR code needs more pixels to encode the text.
   */
  size?: number;
}
