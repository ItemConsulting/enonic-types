import type { SharedMapValueType } from "@enonic-types/lib-grid";

/**
 * Returns an instance of SharedMap by the specified map identifier.
 *
 * @param {string} mapId map identifier
 * @returns {SharedMap} an instance of SharedMap
 */
export type GridMap = Record<string, SharedMapValueType>;

/**
 * Returns an instance of Shared Memory (Shared Map) by the specified map identifier.
 */
export function getMap<Map extends GridMap>(mapId: string): SharedMap<Map>;

export interface SetParams<Map extends GridMap, Key extends keyof Map> {
  key: Key;
  value: Map[Key] | null;
  ttlSeconds?: number;
}

interface ModifyParams<Map extends GridMap, Key extends keyof Map> {
  key: Key;
  func: (value: Map[Key] | null) => Map[Key] | null;
  ttlSeconds?: number;
}

/**
 * Shared Map is similar to other Map, but its instances are shared across all applications and even cluster nodes.

 WARNING: Due to distributed nature of the Shared Map not all types of keys and values can be used. Strings, numbers, and pure JSON objects are supported. There is no runtime check for type compatibility due to performance reasons. The developer is also responsible for not modifying shared objects (keys and values) in place.
 * @param mapId - map identifier
 * @constructor
 */
export declare class SharedMap<Map extends GridMap> {
  private map;
  constructor(mapId: string);

  /**
   * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
   *
   * @param {string} key - key the key whose associated value is to be returned
   * @returns {string|number|boolean|JSON|null} the value to which the specified key is mapped, or null if this map contains no mapping for the key
   */
  get<Key extends keyof Map>(key: Key): Map[Key] | null;

  /**
   * Puts an entry into this map with a given time to live (TTL).
   * If value is null, the existing entry will be removed.
   *
   * @param {object} params JSON with the parameters.
   * @param {string} params.key key of the entry
   * @param {string|number|boolean|JSON|null} params.value value of the entry
   * @param {number} [params.ttlSeconds] maximum time to live in seconds for this entry to stay in the map. (0 means infinite, negative means map config default or infinite if map config is not available)
   */
  set<Key extends keyof Map>(params: SetParams<Map, Key>): void;

  /**
   * Attempts to compute a mapping for the specified key and its current mapped value.
   *
   * @param {object} params JSON with the parameters.
   * @param {string} params.key  key of the entry
   * @param {function} params.func mapping function that accepts the existing mapped value (or null, if there is no associated mapping).
   *                            The returned value replaces the existing mapped value for the specified key.
   *                            If returned value is null then the value is removed from the map
   * @param {number} [params.ttlSeconds] maximum time to live in seconds for this entry to stay in the map. (0 means infinite, negative means map config default or infinite if map config is not available)
   * @returns the new value to which the specified key is mapped, or null if this map no longer contains mapping for the key
   */
  modify<Key extends keyof Map>(params: ModifyParams<Map, Key>): void;

  /**
   * Removes the mapping for the key from this map if it is present.
   *
   * @param {string} key the key whose associated value is to be removed
   */
  delete(key: keyof Map): void;
}
