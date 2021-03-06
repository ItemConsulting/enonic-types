export interface Request {
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
  readonly webSocket?: boolean;
}

export type ResponseType = string | object | Array<any> | ReadonlyArray<any>;

export interface Response<ResponseBody extends ResponseType = ResponseType> {
  status?: number;
  body?: ResponseBody;
  contentType?: string;
  headers?: { readonly [key: string]: string };
  cookies?: { readonly [key: string]: string | Cookie };
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

export interface PageContributions {
  headBegin?: string | Array<string>;
  headEnd?: string | Array<string>;
  bodyBegin?: string | Array<string>;
  bodyEnd?: string | Array<string>;
}

export interface Cookie {
  value: string;
  path?: string;
  domain?: string;
  comment?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
}

/**
 * Request where params potentially are typed as Arrays, reflecting the real
 * behaviour of XP, instead of the common use case.
 */
export type RequestWithArrayParams = Omit<Request, "params"> & {
  params: { readonly [key: string]: string | ReadonlyArray<string> | undefined };
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

/**
 * This Request can be used by a Service that provides data to a CustomSelector input field
 */
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

export interface AbstractWebSocketEvent<WebSocketData = {}> {
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
