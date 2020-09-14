export declare interface Request {
  readonly method: "GET" | "PUT" | "POST" | "DELETE";
  readonly scheme: string;
  readonly host: string;
  readonly port: string;
  readonly path: string;
  readonly url: string;
  readonly remoteAddress: string;
  readonly mode: "inline" | "edit" | "preview" | "live";
  readonly branch: "draft" | "master";
  readonly body: string;
  readonly params: { readonly [key: string]: string | undefined };
  readonly headers: { readonly [key: string]: string | undefined };
  readonly cookies: { readonly [key: string]: string | undefined };
}

export type ResponseType =
  | string
  | object
  | Array<any>
  | ReadonlyArray<any>;

export declare interface Response {
  readonly status?: number;
  readonly body?: ResponseType;
  readonly contentType?: string;
  readonly headers?: { readonly [key: string]: string };
  readonly cookies?: { readonly [key: string]: string | Cookie };
  readonly redirect?: string;
  readonly postProcess?: boolean;
  readonly pageContributions?: PageContributions;
  readonly applyFilters?: boolean;
}

export interface MacroContext<A = never> {
  readonly name: string;
  readonly body: string;
  readonly params: A;
  readonly document: string;
  readonly request: Request;
}

export interface PageContributions {
  readonly headBegin?: string | ReadonlyArray<string>;
  readonly headEnd?: string | ReadonlyArray<string>;
  readonly bodyBegin?: string | ReadonlyArray<string>;
  readonly bodyEnd?: string | ReadonlyArray<string>;
}

export interface Cookie {
  readonly value: string;
  readonly path?: string;
  readonly domain?: string;
  readonly comment?: string;
  readonly maxAge?: number;
  readonly secure?: boolean;
  readonly httpOnly?: boolean;
}

/**
 * Request where params potentially are typed as Arrays, reflecting the real
 * behaviour of XP, instead of the common use case.
 */
export type RequestWithArrayParams = Omit<Request, 'params'> & {
  params: { readonly [key: string]: string | ReadonlyArray<string> | undefined }
};

/**
 * Request object to be used with functions in "error.ts"
 */
export interface ErrorRequest {
  readonly status: number;
  readonly message: string;
  readonly exception?: unknown;
  readonly request: Request;
}
