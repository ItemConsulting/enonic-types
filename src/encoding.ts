import {ByteSource} from "./content";

export interface EncodingLibrary {
  base64Encode(stream: ByteSource | string): string;
  base64Decode(text: string): ByteSource | null;

  base64UrlEncode(stream: ByteSource | string): string;
  base64UrlDecode(text: string): ByteSource | null;

  base32Encode(stream: ByteSource | string): string;
  base32Decode(text: string): ByteSource | null;

  hexEncode(stream: ByteSource | string): string;
  hexDecode(text: string): ByteSource | null;

  charsetDecode(stream: ByteSource, charsetName?: string): string;
  charsetEncode(text: string, charsetName?: string): ByteSource;

  urlEscape(text: string): string;
  urlUnescape(text: string): string;

  htmlEscape(text: string): string;
  htmlUnescape(text: string): string;

  xmlEscape(text: string): string;
  xmlUnescape(text: string): string;

  md5(stream: string | ByteSource): string;
  sha1(stream: string | ByteSource): string;
  sha256(stream: string | ByteSource): string;
  sha512(stream: string | ByteSource): string;

  hmacSha1AsHex(stream: string | ByteSource, key: string): string;
  hmacSha1AsStream(stream: string | ByteSource, key: string): ByteSource;

  hmacSha256AsHex(stream: string | ByteSource, key: string): string;
  hmacSha256AsStream(stream: string | ByteSource, key: string): ByteSource;

  hmacSha512AsHex(stream: string | ByteSource, key: string): string;
  hmacSha512AsStream(stream: string | ByteSource, key: string): ByteSource;
}
