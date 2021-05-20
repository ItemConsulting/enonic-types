export interface HttpLibrary {
  request(params: HttpRequestParams): HttpResponse;
}

import {ByteSource} from "./content";

export interface HttpRequestParams {
  /** URL to which the request is sent. */
  url: string;

  /** The HTTP method to use for the request (e.g. "POST", "GET", "HEAD", "PUT", "DELETE"). */
  method?: string;

  /** Query or form parameters to be sent with the request. */
  params?: { readonly [key: string]: string };

  /** HTTP headers, an object where the keys are header names and the values the header values. */
  headers?: { readonly [key: string]: string };

  /** The timeout on establishing the connection, in milliseconds. */
  connectionTimeout?: number;

  /** The timeout on waiting to receive data, in milliseconds. */
  readTimeout?: number;

  /** Body content to send with the request, usually for POST or PUT requests. It can be of type string or stream. */
  body?: string | ByteSource;

  /** Content type of the request. */
  contentType?: string;

  /**
   * Multipart form data to send with the request, an array of part objects. Each part object contains
   * 'name', 'value', and optionally 'fileName' and 'contentType' properties. Where 'value' can be either a string or a
   * Stream object.
   */
  multipart?: ReadonlyArray<{
    name: string;
    value: string | ByteSource;
    fileName?: string;
    contentType?: string;
  }>;

  /** Settings for basic authentication. */
  auth?: HttpRequestParamsAuth;

  /** Proxy settings. */
  proxy?: HttpRequestParamsProxy;

  /**
   * If set to false redirect responses (status=3xx) will not trigger a new internal request, and the function will
   * return directly with the 3xx status.
   */
  followRedirects?: boolean;
}

export interface HttpRequestParamsAuth {
  /** User name for basic authentication. */
  user?: string;

  /** Password for basic authentication. */
  password?: string;
}

export interface HttpRequestParamsProxy {
  /** Proxy host name to use. */
  host?: string;

  /** Proxy port to use. */
  port?: number;

  /** User name for proxy authentication. */
  user?: string;

  /** Password for proxy authentication. */
  password?: string;
}

export interface HttpResponse {
  /** HTTP status code returned. */
  readonly status: number;

  /** HTTP status message returned. */
  readonly message: string;

  /** HTTP headers of the response. */
  readonly headers: { readonly [key: string]: string | undefined };

  /** Content type of the response. */
  readonly contentType: string;

  /** Body of the response as string. Null if the response content-type is not of type text. */
  readonly body: string | null;

  /** Body of the response as a stream object. */
  readonly bodyStream: ByteSource;
}
