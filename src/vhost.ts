declare module "*/lib/xp/vhost" {
  namespace vhostLib {
    /**
     * Functions to find virtual host.
     * @since 7.6.0
     */
    interface VhostLibrary {
      /**
       * Returns true if vhosts is enabled
       */
      isEnabled(): boolean;

      /**
       * Returns virtual hosts.
       */
      list(): ListResult;
    }

    interface ListResult {
      /**
       * Array of virtual hosts
       */
      vhosts: Array<VirtualHost>;
    }

    interface VirtualHost {
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
  }

  const vhostLib: vhostLib.VhostLibrary;
  export = vhostLib;
}
