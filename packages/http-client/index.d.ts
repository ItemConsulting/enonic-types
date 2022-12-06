import type { ByteSource } from "@enonic-types/core";

export function request(params: HttpRequestParams): HttpResponse;

export interface HttpRequestParams {
  /** URL to which the request is sent. */
  url: string;

  /** The HTTP method to use for the request (e.g. "POST", "GET", "HEAD", "PUT", "DELETE"). */
  method?: string;

  /**
   * Query parameters to be sent with the request.
   * @since 2.2.0
   */
  queryParams?: { readonly [key: string]: string | undefined };

  /** Query or form parameters to be sent with the request. */
  params?: { readonly [key: string]: string | undefined };

  /** HTTP headers, an object where the keys are header names and the values the header values. */
  headers?: { readonly [key: string]: string | undefined };

  /** The timeout on establishing the connection, in milliseconds. */
  connectionTimeout?: number;

  /** The timeout on waiting to receive data, in milliseconds. */
  readTimeout?: number;

  /** Body content to send with the request, usually for POST or PUT requests. It can be of type string or stream. */
  body?: string | ByteSource;

  /** Content type of the request. */
  contentType?: string;

  /**
   * If set to false redirect responses (status=3xx) will not trigger a new internal request, and the function will
   * return directly with the 3xx status.
   */
  followRedirects?: boolean;

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
   * Stream of PEM encoded certificates. Replaces the host platform’s certificate authorities with a custom certificate.
   * @since 2.1.0
   */
  certificates?: ByteSource;

  /**
   * Stream of PEM encoded certificate: Private key (in PKCS #8 format) and the client certificate concatenated.
   * @since 2.2.0
   */
  clientCertificate?: ByteSource;
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
