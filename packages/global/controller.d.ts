export interface Request {
  method: "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "PATCH" | "OPTIONS" | "TRACE" | "CONNECT";
  scheme: string;
  host: string;
  port: number;
  path: string;
  rawPath: string;
  url: string;
  remoteAddress: string;
  mode: "inline" | "edit" | "preview" | "live";
  webSocket?: boolean;
  repositoryId: string;
  branch: "draft" | "master";
  contextPath: string;
  body: string;
  params: { [key: string]: string | undefined };
  headers: { [key: string]: string | undefined };
  cookies: { [key: string]: string | undefined };
  contentType: string;
}

export interface Response<ResponseBody = unknown> {
  status?: number;
  body?: ResponseBody;
  contentType?: "text/html" | "application/json" | "application/problem+json" | "text/xml" | "application/xml" | string;
  headers?: { [key: string]: string | undefined };
  cookies?: { [key: string]: string | Cookie | undefined };
  redirect?: string;
  postProcess?: boolean;
  pageContributions?: PageContributions;
  applyFilters?: boolean;
}

export interface WebSocketResponse<WebSocketData = {}> {
  webSocket: {
    data?: WebSocketData;
    subProtocols?: string[];
  };
}

export interface MacroContext<Params = never> {
  name: string;
  body: string;
  params: Params;
  document: string;
  request: Request;
}

/**
 * Request object to be used with functions in "error.ts"
 */
export interface ErrorRequest {
  status: number;
  message: string;
  exception?: unknown;
  request: Request;
}

/**
 * Predefined parameters that CustomSelector service always has
 */
export interface CustomSelectorServiceRequestParams {
  count: string;
  start?: string;
  ids?: string;
  query?: string;

  [key: string]: string | undefined;
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
  session: {
    id: string;
    path: string;
    params: { [key: string]: string | undefined };
  };
  data: WebSocketData;
}

export interface OpenWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  type: "open";
}

export interface MessageWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  type: "message";
  message: string;
}

export interface CloseWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  type: "close";
  closeReason: number;
}

export interface ErrorWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  type: "error";
  error: string;
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

export type AdminWidgetResponse = Response<`<widget>${string}</widget>` | `<widget class="error">${string}</widget>`>;
