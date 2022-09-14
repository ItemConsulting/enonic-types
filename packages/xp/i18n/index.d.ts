declare global {
  interface XpLibraries {
    "/lib/xp/i18n": typeof import("./index");
  }
}

/**
 * Returns an object of key/value-pairs for all phrases with the given locales in the specified bundles.
 */
export function getPhrases(
  locale: string | ReadonlyArray<string>,
  bundles: ReadonlyArray<string>
): { [key: string]: string };

/**
 * Returns the list of supported locale codes for the specified bundles.
 */
export function getSupportedLocales(bundles: ReadonlyArray<string>): ReadonlyArray<string>;

/**
 * Localizes a phrase searching through the list of passed in locales in the given order, to find a translation for the
 * phrase-key. If no translation is found, the default phrase will be used. Some phrases will have placeholders for
 * values that may be inserted into the phrase. These must be provided in the function call for those phrases.
 */
export function localize(params: LocalizeParams): "NOT_TRANSLATED" | string;

export interface LocalizeParams {
  key: string;
  locale?: string | ReadonlyArray<string>;
  values?: ReadonlyArray<string>;
  bundles?: ReadonlyArray<string>;
  application?: string;
}
