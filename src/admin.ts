declare module "*/lib/xp/admin" {
  namespace adminLib {
    /**
     * This library contains admin related functions.
     */
    interface AdminLibrary {
      /**
       * Returns the admin assets uri.
       */
      getAssetsUri(): string;

      /**
       * Returns the admin base uri.
       */
      getBaseUri(): string;

      /**
       * Returns the URL for the Home admin tool.
       */
      getHomeToolUrl(params: GetHomeToolUrlParams): string;

      /**
       * Returns installation name.
       */
      getInstallation(): string;

      /**
       * Returns the URL for launcher javascript.
       */
      getLauncherPath(): string;

      /**
       * Returns the URL for the launcher panel.
       */
      getLauncherUrl(): string;

      /**
       * Returns the preferred locale based on the current HTTP request, or the server default locale if none is specified.
       */
      getLocale(): string;

      /**
       * Returns the list of preferred locales based on the current HTTP request, or the server default locale if none is specified.
       */
      getLocales(): ReadonlyArray<string>;

      /**
       * Returns all i18n phrases.
       */
      getPhrases(): string;

      /**
       * Returns the URL for an admin tool of specific application.
       */
      getToolUrl(application: string, tool: string): string;

      /**
       * Returns version of XP installation.
       */
      getVersion(): string;
    }

    export interface GetHomeToolUrlParams {
      path?: string;
      type: "server" | "absolute";
    }
  }

  const adminLib: adminLib.AdminLibrary;
  export = adminLib;
}
