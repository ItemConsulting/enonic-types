declare namespace XP {
  type Request<Params extends Record<string, string | undefined> = Record<string, string>> =
    import("./controller").Request<Params>;

  type Response<ResponseBody = unknown> = import("./controller").Response<ResponseBody>;

  type Controller = <
    Params extends Record<string, string | undefined> = Record<string, string>,
    ResponseBody = unknown,
  >(
    req: Request<Params>,
  ) => Response<ResponseBody>;

  type WebSocketEvent<WebSocketData = {}> = import("./controller").WebSocketEvent<WebSocketData>;

  type WebSocketResponse<WebSocketData = {}> = import("./controller").WebSocketResponse<WebSocketData>;

  type MacroContext<Params extends Record<string, string> = Record<string, string>> =
    import("./controller").MacroContext<Params>;

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
  type ErrorRequest = import("./controller").ErrorRequest;

  /**
   * Predefined parameters that CustomSelector service always has
   */
  type CustomSelectorServiceParams = import("./controller").CustomSelectorServiceParams;

  /**
   * @deprecated Use `Partial<CustomSelectorServiceParams>`
   */
  type CustomSelectorServiceRequestParams = import("./controller").CustomSelectorServiceRequestParams;

  /**
   * @deprecated Use `Request<CustomSelectorServiceParams>`
   */
  type CustomSelectorServiceRequest = import("./controller").CustomSelectorServiceRequest;

  type CustomSelectorServiceResponseBody = import("./controller").CustomSelectorServiceResponseBody;

  /**
   * This Response can be used by a Service that provides data to a CustomSelector input field
   */
  type CustomSelectorServiceResponse = import("./controller").CustomSelectorServiceResponse;

  type CustomSelectorServiceResponseHit = import("./controller").CustomSelectorServiceResponseHit;

  /**
   * @deprecated Use `Response<AdminWidgetBody>` instead.
   */
  type AdminWidgetResponse = import("./controller").AdminWidgetResponse;
}
