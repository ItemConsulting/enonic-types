declare global {
  interface XpLibraries {
    "/lib/xp/admin": typeof import("./index");
  }
}

/**
 * Returns the admin assets uri.
 */
export function getAssetsUri(): string;

/**
 * Returns the admin base uri.
 */
export function getBaseUri(): string;

/**
 * Returns the URL for the Home admin tool.
 */
export function getHomeToolUrl(params: GetHomeToolUrlParams): string;

/**
 * Returns installation name.
 */
export function getInstallation(): string;

/**
 * Returns the URL for launcher javascript.
 */
export function getLauncherPath(): string;

/**
 * Returns the URL for the launcher panel.
 */
export function getLauncherUrl(): string;

/**
 * Returns the preferred locale based on the current HTTP request, or the server default locale if none is specified.
 */
export function getLocale(): string;

/**
 * Returns the list of preferred locales based on the current HTTP request, or the server default locale if none is specified.
 */
export function getLocales(): ReadonlyArray<string>;

/**
 * Returns all i18n phrases.
 */
export function getPhrases(): string;

/**
 * Returns the URL for an admin tool of specific application.
 */
export function getToolUrl(application: string, tool: string): string;

/**
 * Returns version of XP installation.
 */
export function getVersion(): string;

export interface GetHomeToolUrlParams {
  path?: string;
  type: "server" | "absolute";
}
