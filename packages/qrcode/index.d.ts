import type { ByteSource } from "../core";

/**
 * Generates a PNG image with a QR Code that encodes the specified text. The value returned is a stream object.
 * It can be set as the response of an HTTP request, stored in a node or content, or manipulated using the lib-io.
 */
export function generateQrCode(options: GenerateQrCodeParams): ByteSource;

interface GenerateQrCodeParams {
  /**
   * The text or URL to be encoded in the QR code.
   */
  text: string;

  /**
   * The width and height of the square image generated. The default value is 250.
   */
  size?: number;
}
