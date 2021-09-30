declare module "*/lib/xp/i18n" {
  namespace i18nLib {
    interface I18nLibrary {
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
  }

  const i18nLib: i18nLib.I18nLibrary;
  export = i18nLib;
}
