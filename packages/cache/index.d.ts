/**
 * This will create a new cache instance.
 */
export function newCache(params: NewCacheParams): Cache;

export interface NewCacheParams {
  /**
   * Maximum number of items in the cache. Must be a whole number. If not set, the cache size is unbounded.
   */
  size?: number;

  /**
   * Expire time in number of seconds, counted from when the entry was written. Must be a whole number.
   * If not set, entries will never expire.
   */
  expire?: number;
}

export interface Cache {
  /**
   * This function will get (or populate) the named item from cache.
   *
   * Note: Objects are cached by reference, so modifying the returned value could affect the cached value.
   *
   * @param key Cache key to use
   * @param fetcher Function that calculates the value if it is not in the cache. Must not return `null` or
   * `undefined`, since that will throw an error.
   */
  get<A>(key: string, fetcher: () => A): A;

  /**
   * Returns value for cache entry if exists, otherwise it returns null.
   *
   * @param key Cache key to use
   */
  getIfPresent<A>(key: string): A | null;

  /**
   * This will clear all entries from the cache.
   */
  clear(): void;

  /**
   * This will return the number of items currently in the cache.
   */
  getSize(): number;

  /**
   * Puts the value into the cache with the provided key.
   *
   * Note: Objects are cached by reference. If you modify an object after storing it in the cache, or modify an
   * object retrieved from the cache, those modifications could affect the cached object. Deep clone after retrieval
   * if the value must be changed.
   *
   * @param key Cache key to use
   * @param value Value to store in the cache
   */
  put(key: string, value: unknown): void;

  /**
   * Removes an entry, identified by its key, from the cache. If the key is not found in the cache, no changes are made.
   *
   * @param key Cache key to remove
   */
  remove(key: string): void;

  /**
   * Removes multiple entries, identified by a regular expression, from the cache.
   * If the regex pattern does not match with any existing key, no changes are made.
   *
   * @param keyRegex Java regular expression that must match the whole key, e.g. use `"user-.*"` (not `"user-"`) to
   * remove all keys starting with "user-"
   */
  removePattern(keyRegex: string): void;
}
