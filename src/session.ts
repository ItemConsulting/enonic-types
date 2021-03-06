export interface SessionLibrary {
  setAttribute<T>(key: string, value: T): void;
  getAttribute<T>(key: string): T | null;
  removeAttribute(key: string): void;
  getAttributeNames(key: string): Array<string>;
  getId(): string;
  getCreationTime(): number;
}
