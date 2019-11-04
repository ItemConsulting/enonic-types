export interface I18nLibrary {
  getPhrases(locale: string | ReadonlyArray<string>, bundles: ReadonlyArray<string>): { [key: string]: string };
  getSupportedLocales(bundles: ReadonlyArray<string>): ReadonlyArray<string>;
  localize(params: LocalizeParams): "NOT_TRANSLATED" | string;
}

export interface LocalizeParams {
  readonly key: string;
  readonly locale?: string | ReadonlyArray<string>;
  readonly values?: ReadonlyArray<string>;
  readonly bundles?: ReadonlyArray<string>;
  readonly application?: string;
}
