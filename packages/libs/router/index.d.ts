import { Request, Response } from "@item-enonic-types/global/controller";

export default function router(): Router;

export type RouterRequest = Request & { pathParams: Record<string, string | undefined> };

/**
 * Path pattern to match.
 */
export type Pattern = string | Array<string>;

export interface Router {
  /**
   * Adds a route that matches the GET method.
   */
  get(pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the POST method.
   */
  post(pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the DELETE method.
   */
  delete(pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the PUT method.
   */
  put(pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the HEAD method.
   */
  head(pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches all methods.
   */
  all(pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route to this router.
   */
  route(method: string, pattern: Pattern, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a filter to this router.
   */
  filter(filter: (req: Request, next: (req: Request) => Response) => Response): void;

  /**
   * Dispatch the request to this router.
   */
  dispatch(req: Request): Response;
}
