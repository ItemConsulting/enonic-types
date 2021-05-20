export interface I18nLibrary {
  getPhrases(locale: string | ReadonlyArray<string>, bundles: ReadonlyArray<string>): { [key: string]: string };
  getSupportedLocales(bundles: ReadonlyArray<string>): ReadonlyArray<string>;
  localize(params: LocalizeParams): "NOT_TRANSLATED" | string;
}

export interface LocalizeParams {
  key: string;
  locale?: string | ReadonlyArray<string>;
  values?: ReadonlyArray<string>;
  bundles?: ReadonlyArray<string>;
  application?: string;
}
