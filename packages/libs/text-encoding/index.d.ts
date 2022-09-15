import type { ByteSource } from "@item-enonic-types/utils";

declare global {
  interface XpLibraries {
    "/lib/text-encoding": typeof import("./index");
  }
}

export function base64Encode(stream: ByteSource | string): string;
export function base64Decode(text: string): ByteSource | null;

export function base64UrlEncode(stream: ByteSource | string): string;
export function base64UrlDecode(text: string): ByteSource | null;

export function base32Encode(stream: ByteSource | string): string;
export function base32Decode(text: string): ByteSource | null;

export function hexEncode(stream: ByteSource | string): string;
export function hexDecode(text: string): ByteSource | null;

export function charsetDecode(stream: ByteSource, charsetName?: string): string;
export function charsetEncode(text: string, charsetName?: string): ByteSource;

export function urlEscape(text: string): string;
export function urlUnescape(text: string): string;

export function htmlEscape(text: string): string;
export function htmlUnescape(text: string): string;

export function xmlEscape(text: string): string;
export function xmlUnescape(text: string): string;

export function md5(stream: string | ByteSource): string;
export function sha1(stream: string | ByteSource): string;
export function sha256(stream: string | ByteSource): string;
export function sha512(stream: string | ByteSource): string;

export function hmacSha1AsHex(stream: string | ByteSource, key: string): string;
export function hmacSha1AsStream(stream: string | ByteSource, key: string): ByteSource;

export function hmacSha256AsHex(stream: string | ByteSource, key: string): string;
export function hmacSha256AsStream(stream: string | ByteSource, key: string): ByteSource;

export function hmacSha512AsHex(stream: string | ByteSource, key: string): string;
export function hmacSha512AsStream(stream: string | ByteSource, key: string): ByteSource;
