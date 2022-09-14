declare global {
  interface XpLibraries {
    "/lib/xslt": typeof import("./index");
  }
}

export function render<Model extends object>(view: import("../thymeleaf").ResourceKey, model: Model): string;
