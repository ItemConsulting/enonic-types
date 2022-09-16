import type { ResourceKey } from "@item-enonic-types/utils";

export function render<Model extends object>(view: ResourceKey, model: Model): string;
