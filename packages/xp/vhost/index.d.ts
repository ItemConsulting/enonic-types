declare global {
  interface XpLibraries {
    "/lib/xp/vhost": typeof import("./index");
  }
}

/**
 * Returns true if vhosts is enabled
 */
export function isEnabled(): boolean;

/**
 * Returns virtual hosts.
 */
export function list(): ListResult;

export interface ListResult {
  /**
   * Array of virtual hosts
   */
  vhosts: Array<VirtualHost>;
}

export interface VirtualHost {
  /**
   * The name of the virtual host
   */
  readonly name: string;

  /**
   * Refers to basepath used in request
   */
  readonly source: string;

  /**
   * The internal route in XP to the specific endpoint/service
   */
  readonly target: string;

  /**
   * Specifies the hostname (aka domain) the vhost will handle
   */
  readonly host: string;

  /**
   * The default id provider
   */
  readonly defaultIdProviderKey?: string;

  /**
   * Id providers added to the vhost
   */
  readonly idProviderKeys?: Array<{
    /**
     * The key of an id provider
     */
    readonly idProviderKey: string;
  }>;
}
