declare global {
  interface XpLibraries {
    "/lib/xp/io": typeof import("./index");
  }
}

/**
 * Returns the mime-type from a name or extension.
 */
export function getMimeType(name: string): string;

/**
 * Looks up a resource.
 */
export function getResource(key: string): Resource;

/**
 * Returns the size of a stream.
 */
export function getSize(stream: ByteSource): number;

/**
 * Returns a new stream from a string.
 */
export function newStream(text: string): ByteSource;

/**
 * Process lines from a stream.
 */
export function processLines(stream: ByteSource, func: (line: string) => void): string;

/**
 * Read lines from a stream.
 */
export function readLines(stream: ByteSource): Array<string>;

/**
 * Read text from a stream.
 */
export function readText(stream: ByteSource): string;

export type ByteSource = import("@item-enonic-types/content").ByteSource;

export interface Resource {
  getKey(): import("../../libs/thymeleaf").ResourceKey;

  getUrl(): unknown;

  requireExists(): void;

  exists(): boolean;

  getSize(): number;

  getTimestamp(): number;

  openStream(): unknown;

  openReader(): unknown;

  readString(): string;

  readBytes(): unknown;

  readLines(): Array<string>;

  getBytes(): ByteSource;
}
