import type { ResourceKey } from "@enonic-types/core";

export function render<Model extends object>(view: ResourceKey, model: Model): string;
