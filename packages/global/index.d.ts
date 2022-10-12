declare namespace XP {
  type Request = import("./controller").Request;

  type Response<ResponseBody> = import("./controller").Response<ResponseBody>;

  type Controller = <ResponseBody = unknown>(req: Request) => Response<ResponseBody>;

  type WebSocketEvent<WebSocketData = {}> = import("./controller").WebSocketEvent<WebSocketData>;

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
}
