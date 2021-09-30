declare module "*/lib/tineikt/freemarker" {
  namespace freemarkerLib {
    interface FreeMarkerLibrary {
      render<Model extends object>(view: import("/lib/thymeleaf").ResourceKey, model?: Model): string;
    }
  }
  const freemarkerLib: freemarkerLib.FreeMarkerLibrary;
  export = freemarkerLib;
}
