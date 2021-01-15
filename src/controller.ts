import {XOR} from "./types";

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

export type ResponseType =
  | string
  | object
  | Array<any>
  | ReadonlyArray<any>;

export interface HttpResponse<ResponseBody = ResponseType> {
  readonly status?: number;
  readonly body?: ResponseBody;
  readonly contentType?: string;
  readonly headers?: { readonly [key: string]: string };
  readonly cookies?: { readonly [key: string]: string | Cookie };
  readonly redirect?: string;
  readonly postProcess?: boolean;
  readonly pageContributions?: PageContributions;
  readonly applyFilters?: boolean;
}

export interface WebSocketResponse<WebSocketData = {}> {
  readonly webSocket: {
    readonly data?: WebSocketData;
    readonly subProtocols?: ReadonlyArray<string>;
  }
}

export type Response<ResponseBody = ResponseType, WebSocketData = {}> = XOR<HttpResponse<ResponseBody>, WebSocketResponse<WebSocketData>>;

export interface MacroContext<Params = never> {
  readonly name: string;
  readonly body: string;
  readonly params: Params;
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

/**
 * This Request can be used by a Service that provides data to a CustomSelector input field
 */
export type CustomSelectorServiceRequest = Omit<Request, "params"> & {
  params: {
    readonly count: string;
    readonly start?: string;
    readonly ids?: string;
    readonly query?: string;
    readonly [key: string]: string | undefined;
  }
}

export interface CustomSelectorServiceResponseBody {
  readonly total: number;
  readonly count: number;
  readonly hits: Array<CustomSelectorServiceResponseHit>;
}

/**
 * This Response can be used by a Service that provides data to a CustomSelector input field
 */
export type CustomSelectorServiceResponse = HttpResponse<CustomSelectorServiceResponseBody>;

export interface CustomSelectorServiceResponseHit {
  readonly id: string;
  readonly displayName: string;
  readonly description?: string;
  readonly iconUrl?: string;
  readonly icon?: {
    readonly data: string;
    readonly type: string;
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
  readonly type: 'open';
}

export interface MessageWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: 'message';
  readonly message: string;
}

export interface CloseWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: 'close';
  readonly closeReason: number;
}

export interface ErrorWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
  readonly type: 'error';
  readonly error: string;
}

export type WebSocketEvent<WebSocketData = {}> =
  | OpenWebSocketEvent<WebSocketData>
  | MessageWebSocketEvent<WebSocketData>
  | CloseWebSocketEvent<WebSocketData>
  | ErrorWebSocketEvent<WebSocketData>;
