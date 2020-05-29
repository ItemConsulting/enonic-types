import {ByteSource} from "./content";
import {ResourceKey} from "./thymeleaf";

export interface IOLibrary {
  /**
   * Returns the mime-type from a name or extension.
   */
  getMimeType(name: string): string;

  /**
   * Looks up a resource.
   */
  getResource(key: string): Resource;

  /**
   * Returns the size of a stream.
   */
  getSize(stream: ByteSource): number;

  /**
   * Returns a new stream from a string.
   */
  newStream(text: string): ByteSource;

  /**
   * Process lines from a stream.
   */
  processLines(stream: ByteSource, func: (line: string) => void): string;

  /**
   * Read lines from a stream.
   */
  readLines(stream: ByteSource): Array<string>;

  /**
   * Read text from a stream.
   */
  readText(stream: ByteSource): string;
}

export interface Resource {
  getKey(): ResourceKey;
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
