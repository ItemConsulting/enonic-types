import type { ResourceKey } from "@enonic-types/core";

export interface ThymeleafRenderOptions {
  /**
   * Template mode to render with. Defaults to "HTML".
   *
   * Note: The value is case-insensitive, and an invalid value silently falls back to "HTML".
   */
  mode?: "HTML" | "XML" | "TEXT" | "JAVASCRIPT" | "CSS" | "RAW";
}

/**
 * This function renders a view using Thymeleaf.
 *
 * Template errors are thrown as an error with the line number in the template.
 *
 * @param view Location of the view. Use `resolve("./my-view.html")` to resolve a view relative to the controller.
 * @param model Model that is passed to the view. Note: The key `portal` is reserved for the view functions
 * (e.g. `portal.pageUrl(...)`), and will override them if set in the model.
 * @param options Rendering options
 * @returns The rendered output
 */
export function render<Model extends object>(
  view: ResourceKey,
  model?: Model,
  options?: ThymeleafRenderOptions,
): string;
