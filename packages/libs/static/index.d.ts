import type { Request, Response } from "@item-enonic-types/global/controller";
import type { Resource } from "@enonic-types/lib-io";

declare global {
  interface XpLibraries {
    "/lib/enonic/static": typeof import("./index");
  }
}

/**
 * Sets up and returns a reusable resource-getter function.
 */
export function buildGetter(root: string, params?: BuildGetterParams): (req: Request) => Response;

/**
 * Sets up and returns a reusable resource-getter function.
 */
export function buildGetter(params: BuildGetterParams & { root: string }): (req: Request) => Response;

/**
 * A specific-recource getter method, returns a response object for the particular asset that’s named in the
 * argument string.
 */
export function get(path: string, params?: GetParams): Response;

/**
 * A specific-recource getter method, returns a response object for the particular asset that’s named in the
 * argument string.
 */
export function get(params: GetParams & { path: string }): Response;

export interface BuildGetterParams extends GetParams {
  /**
   * The default behaviour of the returned getStatic function is to take a request object, and compare the beginning of
   * the current requested path (request.rawPath) to the endpoint’s own root path (request.contextPath) and get a
   * relative asset path below root (so that later, prefixing the root value to that relative path will give the
   * absolute full path to the resource in the JAR).
   */
  getCleanPath?: (req: Request) => string;
}

export interface GetParams {
  /**
   * Override the default Cache-Control header value ('public, max-age=31536000, immutable').
   */
  cacheControl?: boolean | string | CacheControlResolver;

  /**
   * Override the built-in MIME type detection.
   */
  contentType?: boolean | string | Record<string, string> | ContentTypeResolver;

  /**
   *  The default behaviour of lib-static is to generate/handle ETag in prod, while skipping it entirely in dev mode.
   *  - Setting the etag parameter to false will turn off etag processing (runtime content processing, headers and
   *    handling) in prod too.
   *  - Setting it to true will turn it on in dev mode too.
   */
  etag?: boolean;

  /**
   * By default, the .get method should not throw errors when used correctly. Instead, it internally server-logs
   * (and hash-ID-tags) errors and automatically outputs a 500 error response.
   *
   * Setting throwErrors to true overrides this: the 500-response generation is skipped, and the error is re-thrown down
   * to the calling context, to be handled there.
   *
   * This does not apply to 400-bad-request and 404-not-found type "errors", they will always generate a 404-response
   * either way. 200 and 304 are also untouched, of course.
   */
  throwErrors?: boolean;
}

export type CacheControlResolver = (filePathAndName?: string, resource?: Resource, mimeType?: string) => string | null;

export type ContentTypeResolver = (filePathAndName?: string, resource?: Resource) => string | null;
