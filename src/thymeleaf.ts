export interface ResourceKey {
  applicationKey: string;
  path: string;
  uri: string;
  root: boolean;
  name: string;
  extension: string;
}

export interface ThymeleafLibrary {
  render<A extends object>(view: ResourceKey, model?: A, options?: ThymeleafRenderOptions): string;
}

export interface ThymeleafRenderOptions {
  readonly mode: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}

