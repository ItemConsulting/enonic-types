import { Request as CoreRequest, RequestParams, Response as CoreResponse, ResponseBody } from "@enonic-types/core";
export type { ErrorRequest, WebSocketEvent } from "@enonic-types/core";

type Unarray<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;

/**
 * @deprecated Since 7.15.0, use @enonic-types/core instead.
 */
export type Request<Params extends RequestParams = Record<string, string>> = CoreRequest<{
  params: Params;
}>;

/**
 * @deprecated Since 7.15.0, use @enonic-types/core instead.
 */
export type Response<Body extends ResponseBody> = CoreResponse<{
  body: Body;
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
  request: CoreRequest;
};

/**
 * Predefined parameters that CustomSelector service always has
 * @example Request<{ params: Partial<CustomSelectorServiceParams>; }>
 */
export type CustomSelectorServiceParams = {
  count: string;
  start: string;
  ids: string;
  query: string;
};

/**
 * The shape of the response returned by the CustomSelector service
 * @example Response<CustomSelectorServiceResponseBody>
 */
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
 * The shape of a hit returned by the CustomSelector service
 */
export type CustomSelectorServiceResponseHit = Unarray<CustomSelectorServiceResponseBody["hits"]>;

/**
 * The shape of the result from an AdminWidget
 * @example Response<{ body: AdminWidgetBody }>
 */
export type AdminWidgetBody = `<widget>${string}</widget>` | `<widget class="error">${string}</widget>`;
