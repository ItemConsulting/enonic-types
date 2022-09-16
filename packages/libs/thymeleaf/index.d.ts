import type { ResourceKey } from "@item-enonic-types/utils";

export function render<Model extends object>(
  view: ResourceKey,
  model?: Model,
  options?: ThymeleafRenderOptions
): string;

export interface ThymeleafRenderOptions {
  mode: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}
