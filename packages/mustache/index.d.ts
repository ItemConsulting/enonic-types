import type { ResourceKey } from "@enonic-types/lib-export";

export function render<Model extends object>(view: ResourceKey, model: Model): string;
