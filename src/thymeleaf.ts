export interface ThymeleafLibrary {
  render<A>(view: any, model?: A, options?: ThymeleafRenderOptions): string;
}

export interface ThymeleafRenderOptions {
  readonly mode: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}

