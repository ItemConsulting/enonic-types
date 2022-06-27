declare module "*/lib/xp/grid" {
  namespace gridLib {
    export type GridMap = Record<string, any>;

    /**
     * @since 7.10.0
     */
    interface GridLibrary {
      /**
       * Returns an instance of Shared Memory (Shared Map) by the specified map identifier.
       */
      getMap<Map extends GridMap>(mapId: string): SharedMemory<Map>;
    }

    export interface SharedMemory<Map extends GridMap> {
      /**
       * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
       */
      get<Key extends keyof Map>(key: Key): Map[Key] | null;

      /**
       * Puts an entry into this map with a given time to live (TTL).
       * If value is null, the existing entry will be removed.
       */
      set<Key extends keyof Map>(params: SetParams<Map, Key>): void;

      /**
       *  Removes the mapping for the key from this map if it is present.
       */
      delete(key: keyof Map): void;

      /**
       * Attempts to compute a mapping for the specified key and its current mapped value.
       */
      modify<Key extends keyof Map>(params: ModifyParams<Map, Key>): void;
    }

    export interface SetParams<Map extends GridMap, Key extends keyof Map> {
      /**
       * Key of the entry
       */
      key: Key;

      /**
       * Value of the entry
       */
      value: Map[Key];

      /**
       * Maximum time to live in seconds for this entry to stay in the map. (0 means infinite, negative means map config
       * default or infinite if map config is not available)
       */
      ttlSeconds?: number;
    }

    interface ModifyParams<Map extends GridMap, Key extends keyof Map> {
      /**
       * Key of the entry
       */
      key: Key;

      /**
       * Mapping function that accepts the existing mapped value (or null, if there is no associated mapping).
       * The returned value replaces the existing mapped value for the specified key.
       * If returned value is null then the value is removed from the map
       */
      func: (value: Map[Key]) => Map[Key];

      /**
       * Maximum time to live in seconds for this entry to stay in the map.
       * (0 means infinite, negative means map config default or infinite if map config is not available)
       */
      ttlSeconds?: number;
    }
  }

  const gridLib: gridLib.GridLibrary;
  export = gridLib;
}
