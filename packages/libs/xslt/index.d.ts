import type { ResourceKey } from "@item-enonic-types/utils";

declare global {
  interface XpLibraries {
    "/lib/xslt": typeof import("./index");
  }
}

export function render<Model extends object>(view: ResourceKey, model: Model): string;
