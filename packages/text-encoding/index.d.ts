import type { ByteSource } from "@enonic-types/core";

/**
 * Binary stream or value to read bytes from. Strings, numbers and booleans are converted to text, and read as UTF-8.
 */
export type TextEncodingInput = ByteSource | string | number | boolean;

/**
 * Converts a binary stream to its equivalent string representation that is encoded as base64.
 *
 * @param stream Stream or value to encode
 * @returns The string representation in base64
 */
export function base64Encode(stream: TextEncodingInput): string;

/**
 * Converts a base64 encoded string to an equivalent binary stream.
 *
 * @param text The string representation in base64
 * @returns A binary stream that is equivalent to the encoded input text, or `null` if the input is not valid base64
 */
export function base64Decode(text: string): ByteSource | null;

/**
 * Converts a binary stream to its equivalent string representation that is encoded as "base64url".
 *
 * The "base64url" encoding uses an alternative alphabet to the standard base64. The '+' and '/' characters are
 * respectively replaced by '-' and '_'. Its output is safe to use as filenames, or to pass in URLs without escaping.
 *
 * @param stream Stream or value to encode
 * @returns The string representation in base64url
 */
export function base64UrlEncode(stream: TextEncodingInput): string;

/**
 * Converts a "base64url" encoded string to an equivalent binary stream.
 *
 * @param text The string representation in base64url
 * @returns A binary stream that is equivalent to the encoded input text, or `null` if the input is not valid base64url
 */
export function base64UrlDecode(text: string): ByteSource | null;

/**
 * Converts a binary stream to its equivalent string representation that is encoded as base32.
 * The Base32 alphabet consists of twenty-six uppercase letters (A–Z) and six digits (2–7).
 *
 * @param stream Stream or value to encode
 * @returns The string representation in base32
 */
export function base32Encode(stream: TextEncodingInput): string;

/**
 * Converts a base32 encoded string to an equivalent binary stream.
 *
 * @param text The string representation in base32. Must be uppercase.
 * @returns A binary stream that is equivalent to the encoded input text, or `null` if the input is not valid base32
 */
export function base32Decode(text: string): ByteSource | null;

/**
 * Converts a binary stream to its equivalent string representation in hexadecimal.
 *
 * @param stream Stream or value to encode
 * @returns The string representation in uppercase hexadecimal
 */
export function hexEncode(stream: TextEncodingInput): string;

/**
 * Converts a hexadecimal encoded string to an equivalent binary stream.
 *
 * @param text The string representation in hexadecimal (case-insensitive)
 * @returns A binary stream that is equivalent to the encoded input text, or `null` if the input is not valid hexadecimal
 */
export function hexDecode(text: string): ByteSource | null;

/**
 * Generates a string by decoding a stream of bytes using the specified charset.
 *
 * @param stream Stream to read text from
 * @param charsetName The charset used to decode the stream (e.g. "UTF-8", "ASCII", "ISO-8859-1", "Windows-1252").
 * Defaults to "UTF-8". Throws an error if the charset is not supported.
 * @returns The decoded string
 */
export function charsetDecode(stream: ByteSource, charsetName?: string): string;

/**
 * Encodes a string into a sequence of bytes using the specified charset, returned as a stream object.
 *
 * @param text The text string to encode
 * @param charsetName The charset used to encode the string (e.g. "UTF-8", "ASCII", "ISO-8859-1", "Windows-1252").
 * Defaults to "UTF-8". Throws an error if the charset is not supported.
 * @returns A binary stream with the text encoded using the specified charset
 */
export function charsetEncode(text: string, charsetName?: string): ByteSource;

/**
 * Escapes a string so it can be safely included in URL form parameter names and values, using UTF-8.
 * Spaces are escaped as "+".
 *
 * @param text The text string to URL-escape
 * @returns A string that can be safely included in URL form parameters
 */
export function urlEscape(text: string): string;

/**
 * Unescapes a string used in URL parameters, using UTF-8. "+" is unescaped as a space.
 *
 * @param text The text string to URL-unescape
 * @returns The unescaped string
 */
export function urlUnescape(text: string): string;

/**
 * Escapes a string to be included in HTML attribute values and elements' text contents.
 * Only the following five ASCII characters are replaced: '"&<>
 *
 * @param text The text string to HTML-escape
 * @returns A string that can be safely included in HTML attributes and elements' text contents
 */
export function htmlEscape(text: string): string;

/**
 * Unescapes a string containing HTML entity escapes to a string containing the actual Unicode characters.
 *
 * @param text The text string to HTML-unescape
 * @returns The unescaped string
 */
export function htmlUnescape(text: string): string;

/**
 * Escapes a string to be included in an XML document as an attribute value or element content.
 *
 * @param text The text string to XML-escape
 * @returns A string that can be safely included in an XML document
 */
export function xmlEscape(text: string): string;

/**
 * Unescapes a string containing XML entity escapes to a string containing the actual Unicode characters.
 *
 * @param text The text string to XML-unescape
 * @returns The unescaped string
 */
export function xmlUnescape(text: string): string;

/**
 * Hashes the contents of a string or binary stream, using the MD5 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as an uppercase hexadecimal string
 */
export function md5(stream: TextEncodingInput): string;

/**
 * Hashes the contents of a string or binary stream, using the MD5 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as a binary stream
 */
export function md5AsStream(stream: TextEncodingInput): ByteSource;

/**
 * Hashes the contents of a string or binary stream, using the SHA-1 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as an uppercase hexadecimal string
 */
export function sha1(stream: TextEncodingInput): string;

/**
 * Hashes the contents of a string or binary stream, using the SHA-1 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as a binary stream
 */
export function sha1AsStream(stream: TextEncodingInput): ByteSource;

/**
 * Hashes the contents of a string or binary stream, using the SHA-256 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as an uppercase hexadecimal string
 */
export function sha256(stream: TextEncodingInput): string;

/**
 * Hashes the contents of a string or binary stream, using the SHA-256 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as a binary stream
 */
export function sha256AsStream(stream: TextEncodingInput): ByteSource;

/**
 * Hashes the contents of a string or binary stream, using the SHA-512 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as an uppercase hexadecimal string
 */
export function sha512(stream: TextEncodingInput): string;

/**
 * Hashes the contents of a string or binary stream, using the SHA-512 hash function.
 *
 * @param stream Stream or value to hash
 * @returns The resulting hash code as a binary stream
 */
export function sha512AsStream(stream: TextEncodingInput): ByteSource;

/**
 * Hashes the contents of a string or binary stream, using the HMAC-SHA1 hash function and a secret key.
 *
 * @param stream Stream or value to compute the hash code for
 * @param key The secret key as a hexadecimal string, e.g. `hexEncode("my-secret")`. Throws an error if it is not
 * valid hexadecimal.
 * @returns The resulting hash code as a lowercase hexadecimal string
 */
export function hmacSha1AsHex(stream: TextEncodingInput, key: string): string;

/**
 * Hashes the contents of a string or binary stream, using the HMAC-SHA1 hash function and a secret key.
 *
 * @param stream Stream or value to compute the hash code for
 * @param key The secret key as a hexadecimal string, e.g. `hexEncode("my-secret")`. Throws an error if it is not
 * valid hexadecimal.
 * @returns The resulting hash code as a binary stream
 */
export function hmacSha1AsStream(
  stream: TextEncodingInput,
  key: string,
): ByteSource;

/**
 * Hashes the contents of a string or binary stream, using the HMAC-SHA256 hash function and a secret key.
 *
 * @param stream Stream or value to compute the hash code for
 * @param key The secret key as a hexadecimal string, e.g. `hexEncode("my-secret")`. Throws an error if it is not
 * valid hexadecimal.
 * @returns The resulting hash code as a lowercase hexadecimal string
 */
export function hmacSha256AsHex(stream: TextEncodingInput, key: string): string;

/**
 * Hashes the contents of a string or binary stream, using the HMAC-SHA256 hash function and a secret key.
 *
 * @param stream Stream or value to compute the hash code for
 * @param key The secret key as a hexadecimal string, e.g. `hexEncode("my-secret")`. Throws an error if it is not
 * valid hexadecimal.
 * @returns The resulting hash code as a binary stream
 */
export function hmacSha256AsStream(
  stream: TextEncodingInput,
  key: string,
): ByteSource;

/**
 * Hashes the contents of a string or binary stream, using the HMAC-SHA512 hash function and a secret key.
 *
 * @param stream Stream or value to compute the hash code for
 * @param key The secret key as a hexadecimal string, e.g. `hexEncode("my-secret")`. Throws an error if it is not
 * valid hexadecimal.
 * @returns The resulting hash code as a lowercase hexadecimal string
 */
export function hmacSha512AsHex(stream: TextEncodingInput, key: string): string;

/**
 * Hashes the contents of a string or binary stream, using the HMAC-SHA512 hash function and a secret key.
 *
 * @param stream Stream or value to compute the hash code for
 * @param key The secret key as a hexadecimal string, e.g. `hexEncode("my-secret")`. Throws an error if it is not
 * valid hexadecimal.
 * @returns The resulting hash code as a binary stream
 */
export function hmacSha512AsStream(
  stream: TextEncodingInput,
  key: string,
): ByteSource;
