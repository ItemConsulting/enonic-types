export interface ResourceKey {
  applicationKey: string;
  path: string;
  uri: string;
  root: boolean;
  name: string;
  extension: string;
}

export interface ThymeleafLibrary {
  render<Model extends object>(view: ResourceKey, model?: Model, options?: ThymeleafRenderOptions): string;
}

export interface ThymeleafRenderOptions {
  mode: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}
