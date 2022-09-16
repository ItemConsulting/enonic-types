import type { WrapDataInContent } from "@item-enonic-types/utils/content";
import type { Site } from "@item-enonic-types/lib-content";
import type { ImageUrlParams } from "@enonic-types/lib-portal";

export {
  assetUrl,
  componentUrl,
  attachmentUrl,
  pageUrl,
  serviceUrl,
  idProviderUrl,
  loginUrl,
  logoutUrl,
  url,
  processHtml,
  sanitizeHtml,
  getIdProviderKey,
  getMultipartForm,
  getMultipartItem,
  getMultipartStream,
  getMultipartText,
  imagePlaceholder,
} from "@enonic-types/lib-portal";

export type ImageScale =
  | `block(${number},${"" | " "}${number})`
  | `height(${number})`
  | `max(${number})`
  | `square(${number})`
  | `wide(${number},${"" | " "}${number})`
  | `width(${number})`;

/**
 * This function generates a URL pointing to an image.
 *
 * @example-ref examples/portal/imageUrl.js
 *
 * @param {object} params Input parameters as JSON.
 * @param {string} params.id ID of the image content.
 * @param {string} params.path Path to the image. If `id` is specified, this parameter is not used.
 * @param {string} params.scale Required. Options are width(px), height(px), block(width,height) and square(px).
 * @param {number} [params.quality=85] Quality for JPEG images, ranges from 0 (max compression) to 100 (min compression).
 * @param {string} [params.background] Background color.
 * @param {string} [params.format] Format of the image.
 * @param {string} [params.filter] A number of filters are available to alter the image appearance, for example, blur(3), grayscale(), rounded(5), etc.
 * @param {string} [params.type=server] URL type. Either `server` (server-relative URL) or `absolute`.
 * @param {object} [params.params] Custom parameters to append to the url.
 *
 * @returns {string} The generated URL.
 */
export function imageUrl(params: Omit<ImageUrlParams, "scale"> & { scale: ImageScale }): string;

/**
 * This function returns the parent site of the content corresponding to the current execution context. It is meant to be
 * called from a page, layout or part controller.
 *
 * @example-ref examples/portal/getSite.js
 *
 * @returns {object|null} The current site as JSON.
 */
export function getSite(): Site;

/**
 * This function returns the site configuration for this app in the parent site of the content corresponding to the current
 * execution context. It is meant to be called from a page, layout or part controller.
 *
 * @example-ref examples/portal/getSiteConfig.js
 *
 * @returns {object|null} The site configuration for current application as JSON.
 */
export function getSiteConfig(): XP.SiteConfig;

/**
 * This function returns the content corresponding to the current execution context. It is meant to be called from a page, layout or
 * part controller
 *
 * @example-ref examples/portal/getContent.js
 *
 * @returns {object|null} The current content as JSON.
 */
export function getContent<Data, PageConfig = unknown>(): WrapDataInContent<
  Data,
  {
    page: Component<PageConfig>;
  }
> | null;

export interface Component<Config = unknown> {
  path: string;
  type: "page" | "layout" | "part";
  descriptor: string;
  config: Config;
  regions?: Record<string, Region>;
}

export interface Region {
  components: Array<Component>;
  name: string;
}

/**
 * This function returns the component corresponding to the current execution context. It is meant to be called
 * from a layout or part controller.
 *
 * @example-ref examples/portal/getComponent.js
 *
 * @returns {object|null} The current component as JSON.
 */
export function getComponent<Config = unknown>(): Component<Config> | null;
