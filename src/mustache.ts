import { ResourceKey } from "./thymeleaf";

export interface MustacheLibrary {
  render<Model extends object>(view: ResourceKey, model: Model): string;
}
