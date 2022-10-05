import type { ResourceKey } from "../core";

export function render<Model extends object>(view: ResourceKey, model: Model): string;
