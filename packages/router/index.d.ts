import type { Request, Response } from "@enonic-types/core";

/**
 * Creates a new router instance.
 */
export default function router(): Router;

export type RouterRequest = Request & {
  /**
   * Values of the path parameters in the matched route pattern, e.g. `{ id: "123" }` for the pattern `/persons/{id}`
   * and the path `/persons/123`.
   */
  pathParams: Record<string, string | undefined>;
};

/**
 * Path pattern to match, relative to the request's `contextPath`. Use `{name}` to match a single path segment as a
 * path parameter, or `{name:regex}` to match a path parameter with a custom regular expression.
 * An array of patterns adds one route per pattern.
 */
export type RoutePattern = string | ReadonlyArray<string>;

/**
 * Handler to execute when a route matches
 */
export type RouteHandler = (req: RouterRequest) => Response;

export type Router = {
  /**
   * Adds a route that matches the GET method. HEAD requests are also handled by GET routes, if no HEAD route matches.
   */
  get(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route that matches the POST method.
   */
  post(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route that matches the DELETE method.
   */
  delete(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route that matches the PUT method.
   */
  put(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route that matches the HEAD method.
   */
  head(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route that matches the PATCH method.
   * @since 3.2.0
   */
  patch(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route that matches all methods.
   */
  all(pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a route to this router.
   *
   * @param method HTTP method to match (case-insensitive), or "*" to match all methods
   * @param pattern Path pattern to match, or an array of patterns
   * @param handler Handler to execute when the route matches
   */
  route(method: string, pattern: RoutePattern, handler: RouteHandler): void;

  /**
   * Adds a filter to this router. Filters are executed in the order they are added, before the route is matched.
   * Call `next(req)` to continue to the next filter, or to the matching route.
   */
  filter(
    filter: (req: Request, next: (req: Request) => Response) => Response,
  ): void;

  /**
   * Dispatch the request to this router. Returns `{ status: 404 }` if no route matches.
   */
  dispatch(req: Request): Response;
};
