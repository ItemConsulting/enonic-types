declare namespace XP {
  /**
   * @deprecated Since 7.15.0, use @enonic-types/core instead.
   */
  type Request<Params extends import("@enonic-types/core").RequestParams = Record<string, string>> =
    import("@enonic-types/core").Request<{
      params: Params;
    }>;

  /**
   * @deprecated Since 7.15.0, use @enonic-types/core instead.
   */
  type Response<Body extends import("@enonic-types/core").ResponseBody = import("@enonic-types/core").ResponseBody> =
    import("@enonic-types/core").Response<{
      body: Body;
    }>;

  /**
   * @deprecated Since 7.15.0, use @enonic-types/core instead.
   */
  type WebSocketEvent<T> = import("@enonic-types/core").WebSocketEvent<T>;

  type WebSocketResponse<WebSocketData = Record<string, never>> =
    import("./controller").WebSocketResponse<WebSocketData>;

  type MacroContext<Params extends Record<string, string> = Record<string, string>> =
    import("./controller").MacroContext<Params>;

  /**
   * @deprecated Since 7.15.0, use @enonic-types/core instead.
   */
  type ErrorRequest<
    T extends import("@enonic-types/core").RequestInterface = import("@enonic-types/core").DefaultRequest,
  > = import("@enonic-types/core").ErrorRequest<T>;

  type CustomSelectorServiceParams = import("./controller").CustomSelectorServiceParams;

  /**
   * Predefined parameters that CustomSelector service always has
   */
  type CustomSelectorServiceResponseBody = import("./controller").CustomSelectorServiceResponseBody;

  type CustomSelectorServiceResponseHit = import("./controller").CustomSelectorServiceResponseHit;
}
