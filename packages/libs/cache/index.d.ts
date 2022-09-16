/**
 * This will create a new cache instance.
 */
export function newCache(params: NewCacheParams): Cache;

export interface NewCacheParams {
  /**
   * Size of the cache (in number of items).
   */
  size: number;

  /**
   * Expire time in number of seconds.
   */
  expire: number;
}

export interface Cache {
  /**
   * This function will get (or populate) the named item from cache.
   */
  get<A>(key: string, fetcher: () => A): A;

  /**
   * This will clear all entries from the cache.
   */
  clear(): void;

  /**
   * This will return the number of items currently in the cache.
   */
  getSize(): number;

  /**
   * Removes an entry, identified by its key, from the cache. If the key is not found in the cache, no changes are made.
   */
  remove(key: string): void;

  /**
   * Removes multiple entries, identified by a regular expression, from the cache.
   * If the regex pattern does not match with any existing key, no changes are made.
   */
  removePattern(keyRegex: string): void;
}
