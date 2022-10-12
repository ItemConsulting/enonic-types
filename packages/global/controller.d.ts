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
