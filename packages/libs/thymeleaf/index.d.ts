import type { ResourceKey } from "@item-enonic-types/utils";

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

export interface ThymeleafRenderOptions {
  mode: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}
