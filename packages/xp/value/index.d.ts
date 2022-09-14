declare global {
  interface XpLibraries {
    "/lib/xp/value": typeof import("./index");
  }
}

/**
 * Creates a BinaryAttachment java-type.
 */
export function binary(name: string, stream: import("@item-enonic-types/content").ByteSource): BinaryAttachment;

/**
 * Creates a GeoPoint java-type.
 */
export function geoPoint(lat: number, lon: number): GeoPoint;

/**
 * Creates a GeoPoint java-type.
 */
export function geoPointString(value: string): GeoPoint;

/**
 * Creates a Instant java-type.
 */
export function instant(value: string | Date): Instant;

/**
 * Creates a LocalDate java-type.
 */
export function localDate(value: string | Date): LocalDate;

/**
 * Creates a LocalDateTime java-type.
 */
export function localDateTime(value: string | Date): LocalDateTime;

/**
 * Creates a LocalTime java-type.
 */
export function localTime(value: string | Date): LocalTime;

/**
 * Creates a Reference java-type.
 */
export function reference(text: string): Reference;

export interface BinaryAttachment {
  URI: "com.enonic.xp.node.BinaryAttachment";

  getReference(): BinaryReference;

  getByteSource(): import("@item-enonic-types/content").ByteSource;
}

export interface BinaryReference {
  URI: "com.enonic.xp.util.BinaryReference";
}

export interface GeoPoint {
  URI: "com.enonic.xp.util.GeoPoint";

  getLatitude(): number;

  getLongitude(): number;

  toString(): string;
}

export interface Instant {
  URI: "java.time.Instant";
}

export interface LocalDate {
  URI: "java.time.LocalDate";
}

export interface LocalTime {
  URI: "java.time.LocalTime";
}

export interface LocalDateTime {
  URI: "java.time.LocalDateTime";
}

export interface Reference {
  URI: "com.enonic.xp.util.Reference";
}
