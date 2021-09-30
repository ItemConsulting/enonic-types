declare module "*/lib/qrcode" {
  namespace qrLib {
    interface QRCodeLibrary {
      /**
       * Generates a PNG image with a QR Code that encodes the specified text. The value returned is a stream object.
       * It can be set as the response of an HTTP request, stored in a node or content, or manipulated using the lib-io.
       */
      generateQrCode(options: qrLib.GenerateQrCodeParams): import("/lib/xp/content").ByteSource;
    }

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
  }

  const qrLib: qrLib.QRCodeLibrary;
  export = qrLib;
}
