import type { ResourceKey } from "@enonic-types/core";

/**
 * This function renders a view using XSLT. The model is automatically transformed to XML.
 *
 * The model is placed in a `<root>` element, where each key becomes an element, and each array item becomes an
 * `<item>` element. The keys must therefore be valid XML element names.
 *
 * @param view Location of the view. Use `resolve("./my-view.xsl")` to resolve a view relative to the controller.
 * @param model Model that is passed to the view
 * @returns The rendered output
 */
export function render<Model extends object>(
  view: ResourceKey,
  model?: Model,
): string;
