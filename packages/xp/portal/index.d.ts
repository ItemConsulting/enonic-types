import type { Content } from "@item-enonic-types/lib-content";
import type { Component, ImageUrlParams, Region } from "@enonic-types/lib-portal";
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
  getComponent,
} from "@enonic-types/lib-portal";

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
export function imageUrl(
  params: Omit<ImageUrlParams, "scale"> & {
    scale:
      | `block(${number},${number})`
      | `height(${number})`
      | `max(${number})`
      | `square(${number})`
      | `wide(${number},${number})`
      | `width(${number})`
      | "full";
  }
): string;

/**
 * This function returns the content corresponding to the current execution context. It is meant to be called from a page, layout or
 * part controller
 *
 * @example-ref examples/portal/getContent.js
 *
 * @returns {object|null} The current content as JSON.
 */
export function getContent<
  Data = Record<string, unknown>,
  Type extends string = string,
  Config extends object = object,
  Regions extends Record<string, Region> = Record<string, Region>
>():
  | (Content<Data> & {
      page: Component<Config, Regions>;
    })
  | null;
