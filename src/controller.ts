declare namespace XP {
  type Controller = <ResponseBody extends ResponseType = ResponseType>(req: Request) => Response<ResponseBody>;

  interface Request {
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

  type ResponseType = string | object | Array<any> | ReadonlyArray<any> | null;

  interface Response<ResponseBody extends ResponseType = ResponseType> {
    status?: number;
    body?: ResponseBody;
    contentType?:
      | "text/html"
      | "application/json"
      | "application/problem+json"
      | "text/xml"
      | "application/xml"
      | string;
    headers?: { readonly [key: string]: string | undefined };
    cookies?: { readonly [key: string]: string | Cookie | undefined };
    redirect?: string;
    postProcess?: boolean;
    pageContributions?: PageContributions;
    applyFilters?: boolean;
  }

  interface WebSocketResponse<WebSocketData = {}> {
    webSocket: {
      data?: WebSocketData;
      subProtocols?: ReadonlyArray<string>;
    };
  }

  interface MacroContext<Params = never> {
    readonly name: string;
    readonly body: string;
    readonly params: Params;
    readonly document: string;
    readonly request: Request;
  }

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

  /**
   * Request where params potentially are typed as Arrays, reflecting the real
   * behaviour of XP, instead of the common use case.
   */
  type RequestWithArrayParams = Omit<Request, "params"> & {
    params: { readonly [key: string]: string | ReadonlyArray<string> | undefined };
  };

  /**
   * Request object to be used with functions in "error.ts"
   */
  interface ErrorRequest {
    readonly status: number;
    readonly message: string;
    readonly exception?: unknown;
    readonly request: Request;
  }

  /**
   * Predefined parameters that CustomSelector service always has
   */
  interface CustomSelectorServiceRequestParams {
    readonly count: string;
    readonly start?: string;
    readonly ids?: string;
    readonly query?: string;

    readonly [key: string]: string | undefined;
  }

  /**
   * This Request can be used by a Service that provides data to a CustomSelector input field
   */
  type CustomSelectorServiceRequest = Omit<Request, "params"> & {
    params: CustomSelectorServiceRequestParams;
  };

  interface CustomSelectorServiceResponseBody {
    total: number;
    count: number;
    hits: Array<CustomSelectorServiceResponseHit>;
  }

  /**
   * This Response can be used by a Service that provides data to a CustomSelector input field
   */
  type CustomSelectorServiceResponse = Response<CustomSelectorServiceResponseBody>;

  interface CustomSelectorServiceResponseHit {
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

  interface OpenWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
    readonly type: "open";
  }

  interface MessageWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
    readonly type: "message";
    readonly message: string;
  }

  interface CloseWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
    readonly type: "close";
    readonly closeReason: number;
  }

  interface ErrorWebSocketEvent<WebSocketData = {}> extends AbstractWebSocketEvent<WebSocketData> {
    readonly type: "error";
    readonly error: string;
  }

  type WebSocketEvent<WebSocketData = {}> =
    | OpenWebSocketEvent<WebSocketData>
    | MessageWebSocketEvent<WebSocketData>
    | CloseWebSocketEvent<WebSocketData>
    | ErrorWebSocketEvent<WebSocketData>;
}
