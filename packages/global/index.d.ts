import { Request } from "@enonic-types/core";

export type WebSocketResponse<WebSocketData = Record<string, never>> = {
  webSocket: {
    data?: WebSocketData;
    subProtocols?: string[];
  };
};

export type MacroContext<
  Params extends Record<string, string> = Record<string, string>,
> = {
  name: string;
  body: string;
  params: Params;
  document: string;
  request: Request;
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
  hits: {
    id: string;
    displayName: string;
    description?: string;
    iconUrl?: string;
    icon?: {
      data: string;
      type: string;
    };
  }[];
};
