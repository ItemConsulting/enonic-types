declare module "*/lib/mustache" {
  namespace mustacheLib {
    interface MustacheLibrary {
      render<Model extends object>(view: import("/lib/thymeleaf").ResourceKey, model: Model): string;
    }
  }

  const mustacheLib: mustacheLib.MustacheLibrary;
  export = mustacheLib;
}
