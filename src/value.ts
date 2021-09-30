declare module "*/lib/xp/value" {
  namespace valueLib {
    interface ValueLibrary {
      /**
       * Creates a BinaryAttachment java-type.
       */
      binary(name: string, stream: import("/lib/xp/content").ByteSource): BinaryAttachment;

      /**
       * Creates a GeoPoint java-type.
       */
      geoPoint(lat: number, lon: number): GeoPoint;

      /**
       * Creates a GeoPoint java-type.
       */
      geoPointString(value: string): GeoPoint;

      /**
       * Creates a Instant java-type.
       */
      instant(value: string | Date): Instant;

      /**
       * Creates a LocalDate java-type.
       */
      localDate(value: string | Date): LocalDate;

      /**
       * Creates a LocalDateTime java-type.
       */
      localDateTime(value: string | Date): LocalDateTime;

      /**
       * Creates a LocalTime java-type.
       */
      localTime(value: string | Date): LocalTime;

      /**
       * Creates a Reference java-type.
       */
      reference(text: string): Reference;
    }
    export interface BinaryAttachment {
      URI: "com.enonic.xp.node.BinaryAttachment";

      getReference(): valueLib.BinaryReference;

      getByteSource(): import("/lib/xp/content").ByteSource;
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
  }

  const valueLib: valueLib.ValueLibrary;
  export = valueLib;
}
