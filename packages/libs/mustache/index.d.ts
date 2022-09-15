import type { ResourceKey } from "@item-enonic-types/utils";

declare global {
  interface XpLibraries {
    "/lib/mustache": typeof import("./index");
  }
}

export function render<Model extends object>(view: ResourceKey, model: Model): string;
