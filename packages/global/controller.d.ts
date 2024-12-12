type LooseAutocomplete<T extends string> = T | Omit<string, T>;
type Unarray<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;

export type Request<Params extends Record<string, string | undefined> = Record<string, string>> = {
  method: string;
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
  params: Partial<Params>;
  headers: { [key: string]: string | undefined };
  cookies: { [key: string]: string | undefined };
  contentType: string;
};

export type Response<ResponseBody = unknown> = Partial<{
  status: number;
  body: ResponseBody;
  contentType: LooseAutocomplete<
    "text/html" | "application/json" | "application/problem+json" | "text/xml" | "application/xml"
  >;
  headers: { [key: string]: string | undefined };
  cookies: { [key: string]: string | Cookie | undefined };
  redirect: string;
  postProcess: boolean;
  pageContributions: {
    headBegin?: string | Array<string>;
    headEnd?: string | Array<string>;
    bodyBegin?: string | Array<string>;
    bodyEnd?: string | Array<string>;
  };
  applyFilters: boolean;
}>;

export type WebSocketResponse<WebSocketData = Record<string, never>> = {
  webSocket: {
    data?: WebSocketData;
    subProtocols?: string[];
  };
};

export type MacroContext<Params extends Record<string, string> = Record<string, string>> = {
  name: string;
  body: string;
  params: Params;
  document: string;
  request: Request;
};

/**
 * Request object to be used with functions in "error.ts"
 */
export type ErrorRequest = {
  status: number;
  message: string;
  exception?: unknown;
  request: Request;
};

/**
 * Predefined parameters that CustomSelector service always has
 */
export type CustomSelectorServiceParams = {
  count: string;
  start: string;
  ids: string;
  query: string;
};

/**
 * @deprecated Use `Partial<CustomSelectorServiceParams>`
 */
export type CustomSelectorServiceRequestParams = {
  count: string;
  start?: string;
  ids?: string;
  query?: string;

  [key: string]: string | undefined;
};

/**
 * @deprecated Use `Request<CustomSelectorServiceParams>`
 */
export type CustomSelectorServiceRequest = Request<CustomSelectorServiceParams>;

export type CustomSelectorServiceResponseBody = {
  total: number;
  count: number;
  hits: Array<{
    id: string;
    displayName: string;
    description?: string;
    iconUrl?: string;
    icon?: {
      data: string;
      type: string;
    };
  }>;
};

/**
 * This Response can be used by a Service that provides data to a CustomSelector input field
 */
export type CustomSelectorServiceResponse = Response<CustomSelectorServiceResponseBody>;

export type CustomSelectorServiceResponseHit = Unarray<CustomSelectorServiceResponseBody["hits"]>;

type AbstractWebSocketEvent<WebSocketData> = {
  session: {
    id: string;
    path: string;
    params: { [key: string]: string | undefined };
  };
  data: WebSocketData;
};

export type OpenWebSocketEvent<WebSocketData = {}> = AbstractWebSocketEvent<WebSocketData> & {
  type: "open";
};

export type MessageWebSocketEvent<WebSocketData = {}> = AbstractWebSocketEvent<WebSocketData> & {
  type: "message";
  message: string;
};

export type CloseWebSocketEvent<WebSocketData = {}> = AbstractWebSocketEvent<WebSocketData> & {
  type: "close";
  closeReason: number;
};

export type ErrorWebSocketEvent<WebSocketData = {}> = AbstractWebSocketEvent<WebSocketData> & {
  type: "error";
  error: string;
};

export type WebSocketEvent<WebSocketData = {}> =
  | OpenWebSocketEvent<WebSocketData>
  | MessageWebSocketEvent<WebSocketData>
  | CloseWebSocketEvent<WebSocketData>
  | ErrorWebSocketEvent<WebSocketData>;

type Cookie = {
  value: string;
  path?: string;
  domain?: string;
  comment?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Lax" | "Strict" | "None" | " ";
};

export type AdminWidgetBody = `<widget>${string}</widget>` | `<widget class="error">${string}</widget>`;

/**
 * @deprecated Use `Response<AdminWidgetBody>` instead.
 */
export type AdminWidgetResponse = Response<AdminWidgetBody>;
