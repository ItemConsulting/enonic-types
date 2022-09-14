declare global {
  interface XpLibraries {
    "/lib/thymeleaf": typeof import("./index");
  }
}

export function render<Model extends object>(
  view: ResourceKey,
  model?: Model,
  options?: ThymeleafRenderOptions
): string;

export interface ResourceKey {
  applicationKey: string;
  path: string;
  uri: string;
  root: boolean;
  name: string;
  extension: string;
}

export interface ThymeleafRenderOptions {
  mode: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}
