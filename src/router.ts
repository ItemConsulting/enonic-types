import {Request, Response} from "./controller";

export type RouterLib = () => Router;

export type RouterRequest = Request & { pathParams: Record<string, string | undefined> }

export interface Router {
  get(pattern: string, handler: (req: RouterRequest) => Response): void;
  post(pattern: string, handler: (req: RouterRequest) => Response): void;
  delete(pattern: string, handler: (req: RouterRequest) => Response): void;
  put(pattern: string, handler: (req: RouterRequest) => Response): void;
  head(pattern: string, handler: (req: RouterRequest) => Response): void;
  all(pattern: string, handler: (req: RouterRequest) => Response): void;
  route(method: string, pattern: string, handler: (req: RouterRequest) => Response): void;
  filter(filter: (req: Request, next: (req: Request) => Response) => Response): void;
  dispatch(req: Request): Response;
}
