import type { Request, Response } from "@enonic-types/core";

export default function router(): Router;

export type RouterRequest = Request & { pathParams: Record<string, string | undefined> };

export type Router = {
  /**
   * Adds a route that matches the GET method.
   */
  get(pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the POST method.
   */
  post(pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the DELETE method.
   */
  delete(pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the PUT method.
   */
  put(pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches the HEAD method.
   */
  head(pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route that matches all methods.
   */
  all(pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a route to this router.
   */
  route(method: string, pattern: string, handler: (req: RouterRequest) => Response): void;

  /**
   * Adds a filter to this router.
   */
  filter(filter: (req: Request, next: (req: Request) => Response) => Response): void;

  /**
   * Dispatch the request to this router.
   */
  dispatch(req: Request): Response;
};
