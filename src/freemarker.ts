import {ResourceKey} from "./thymeleaf";

export interface FreeMarkerLibrary {
  render<Model extends object>(view: ResourceKey, model?: Model): string;
}
