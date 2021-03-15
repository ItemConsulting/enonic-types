export interface HttpLibrary {
  request(params: HttpRequestParams): HttpResponse;
}

import {ByteSource} from "./content";

export interface HttpRequestParamsProxy {
  /** Proxy host name to use. */
  readonly host?: string;

  /** Proxy port to use. */
  readonly port?: number;

  /** User name for proxy authentication. */
  readonly user?: string;

  /** Password for proxy authentication. */
  readonly password?: string;
}

export interface HttpRequestParamsAuth {
  /** User name for basic authentication. */
  readonly user?: string;

  /** Password for basic authentication. */
  readonly password?: string;
}

export interface HttpRequestParams {
  /** URL to which the request is sent. */
  readonly url: string;

  /** The HTTP method to use for the request (e.g. "POST", "GET", "HEAD", "PUT", "DELETE"). */
  readonly method?: string;

  /** Query or form parameters to be sent with the request. */
  readonly params?: { readonly [key: string]: string };

  /** HTTP headers, an object where the keys are header names and the values the header values. */
  readonly headers?: { readonly [key: string]: string };

  /** The timeout on establishing the connection, in milliseconds. */
  readonly connectionTimeout?: number;

  /** The timeout on waiting to receive data, in milliseconds. */
  readonly readTimeout?: number;

  /** Body content to send with the request, usually for POST or PUT requests. It can be of type string or stream. */
  readonly body?: string | ByteSource;

  /** Content type of the request. */
  readonly contentType?: string;

  /**
   * Multipart form data to send with the request, an array of part objects. Each part object contains
   * 'name', 'value', and optionally 'fileName' and 'contentType' properties. Where 'value' can be either a string or a
   * Stream object.
   */
  readonly multipart?: ReadonlyArray<{
    readonly name: string;
    readonly value: string | ByteSource;
    readonly fileName?: string;
    readonly contentType?: string;
  }>;

  /** Settings for basic authentication. */
  readonly auth?: HttpRequestParamsAuth;

  /** Proxy settings. */
  readonly proxy?: HttpRequestParamsProxy;

  /**
   * If set to false redirect responses (status=3xx) will not trigger a new internal request, and the function will
   * return directly with the 3xx status.
   */
  readonly followRedirects?: boolean;
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
