declare module "*/lib/xslt" {
  namespace xsltLib {
    interface XsltLibrary {
      render<Model extends object>(view: import("/lib/thymeleaf").ResourceKey, model: Model): string;
    }
  }
  const xsltLib: xsltLib.XsltLibrary;
  export = xsltLib;
}
