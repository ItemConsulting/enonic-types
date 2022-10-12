export interface Request {
  readonly method: "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "PATCH" | "OPTIONS" | "TRACE" | "CONNECT";
  readonly scheme: string;
  readonly host: string;
  readonly port: number;
  readonly path: string;
  readonly rawPath: string;
  readonly url: string;
  readonly remoteAddress: string;
  readonly mode: "inline" | "edit" | "preview" | "live";
  readonly webSocket?: boolean;
  readonly repositoryId: string;
  readonly branch: "draft" | "master";
  readonly contextPath: string;
  readonly body: string;
  readonly params: { readonly [key: string]: string | undefined };
  readonly headers: { readonly [key: string]: string | undefined };
  readonly cookies: { readonly [key: string]: string | undefined };
  readonly contentType: string;
}

export interface Response<ResponseBody = unknown> {
  status?: number;
  body?: ResponseBody;
  contentType?: "text/html" | "application/json" | "application/problem+json" | "text/xml" | "application/xml" | string;
  headers?: { readonly [key: string]: string | undefined };
  cookies?: { readonly [key: string]: string | Cookie | undefined };
  redirect?: string;
  postProcess?: boolean;
  pageContributions?: PageContributions;
  applyFilters?: boolean;
}

export interface WebSocketResponse<WebSocketData = {}> {
  webSocket: {
    data?: WebSocketData;
    subProtocols?: ReadonlyArray<string>;
  };
}

export interface MacroContext<Params = never> {
  readonly name: string;
  readonly body: string;
  readonly params: Params;
  readonly document: string;
  readonly request: Request;
}

/**
 * Request object to be used with functions in "error.ts"
 */
export interface ErrorRequest {
  readonly status: number;
  readonly message: string;
  readonly exception?: unknown;
  readonly request: Request;
}

/**
 * Predefined parameters that CustomSelector service always has
 */
export interface CustomSelectorServiceRequestParams {
  readonly count: string;
  readonly start?: string;
  readonly ids?: string;
  readonly query?: string;

  readonly [key: string]: string | undefined;
}

export type CustomSelectorServiceRequest = Omit<Request, "params"> & {
  params: CustomSelectorServiceRequestParams;
};

export interface CustomSelectorServiceResponseBody {
  total: number;
  count: number;
  hits: Array<CustomSelectorServiceResponseHit>;
}

/**
 * This Response can be used by a Service that provides data to a CustomSelector input field
 */
export type CustomSelectorServiceResponse = Response<CustomSelectorServiceResponseBody>;

export interface CustomSelectorServiceResponseHit {
  id: string;
  displayName: string;
  description?: string;
  iconUrl?: string;
  icon?: {
    data: string;
    type: string;
  };
}

interface AbstractWebSocketEvent<WebSocketData = {}> {
  readonly session: {
    readonly id: string;
    readonly path: string;
    readonly params: { readonly [key: string]: string | undefined };
  };
  readonly data: WebSocketData;
}

export interface OpenWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: "open";
}

export interface MessageWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: "message";
  readonly message: string;
}

export interface CloseWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: "close";
  readonly closeReason: number;
}

export interface ErrorWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: "error";
  readonly error: string;
}

export type WebSocketEvent<WebSocketData = {}> =
  | OpenWebSocketEvent<WebSocketData>
  | MessageWebSocketEvent<WebSocketData>
  | CloseWebSocketEvent<WebSocketData>
  | ErrorWebSocketEvent<WebSocketData>;

interface PageContributions {
  headBegin?: string | Array<string>;
  headEnd?: string | Array<string>;
  bodyBegin?: string | Array<string>;
  bodyEnd?: string | Array<string>;
}

interface Cookie {
  value: string;
  path?: string;
  domain?: string;
  comment?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
}
