import { ResourceKey } from "./thymeleaf";

export interface XsltLibrary {
  render<Model extends object>(view: ResourceKey, model: Model): string;
}
