import type { ByteSource } from "@enonic-types/core";

/**
 * Sends an HTTP request and returns the response received from the remote server.
 * The request is sent synchronously, the execution blocks until the response is received.
 */
export function request(params: HttpRequestParams): HttpResponse;

export type HttpRequestParams = {
  /** URL to which the request is sent. Should be a valid http:// or https:// URL. */
  url: string;

  /** The HTTP method to use for the request (e.g. "POST", "GET", "HEAD", "PUT", "DELETE"). Defaults to "GET". */
  method?: string;

  /**
   * Query parameters to be sent with the request. Values are converted to strings, and `null` or `undefined` values
   * are skipped.
   * @since 2.2.0
   */
  queryParams?: {
    readonly [key: string]: string | number | boolean | null | undefined;
  };

  /**
   * Form parameters to be sent with the request. Values are converted to strings, and `null` or `undefined` values
   * are skipped.
   *
   * For "GET" and "HEAD" requests they are added to the query string, but only if `queryParams` is not provided.
   * For other methods they are sent as an `application/x-www-form-urlencoded` body, which takes precedence over
   * `body` and `multipart`.
   */
  params?: {
    readonly [key: string]: string | number | boolean | null | undefined;
  };

  /** HTTP headers, an object where the keys are header names and the values the header values. */
  headers?: { readonly [key: string]: string };

  /**
   * Disable use of HTTP/2 protocol. The default value is false. For insecure HTTP connections HTTP/2 is always disabled.
   * @since 3.2.0
   */
  disableHttp2?: boolean;

  /** The timeout on establishing the connection, in milliseconds. Defaults to 10000. */
  connectionTimeout?: number;

  /** The timeout on waiting to receive data, in milliseconds. Defaults to 10000. */
  readTimeout?: number;

  /** Body content to send with the request, usually for POST or PUT requests. It can be of type string or stream. */
  body?: string | ByteSource;

  /** Content type of the request. Only applicable for requests with `body` or `multipart`. */
  contentType?: string;

  /**
   * If set to false redirect responses (status=3xx) will not trigger a new internal request, and the function will
   * return directly with the 3xx status. Default is to follow redirects, except from https to http.
   */
  followRedirects?: boolean;

  /**
   * Multipart form data to send with the request, an array of part objects. Parts without a `name` or `value` are
   * skipped.
   */
  multipart?: ReadonlyArray<HttpRequestMultipartPart>;

  /** Settings for basic authentication. */
  auth?: {
    /** User name for basic authentication. */
    user?: string;

    /** Password for basic authentication. */
    password?: string;
  };

  /** Proxy settings. */
  proxy?: {
    /** Proxy host name to use. */
    host?: string;

    /** Proxy port to use. */
    port?: number;

    /** User name for proxy authentication. */
    user?: string;

    /** Password for proxy authentication. */
    password?: string;
  };

  /**
   * Stream of PEM encoded certificates. Replaces the host platform’s certificate authorities with a custom certificate.
   * If neither `certificates` nor `clientCertificate` are provided, the default JVM TrustStore and KeyStore are used.
   * @since 2.1.0
   */
  certificates?: ByteSource;

  /**
   * Stream of PEM encoded certificate: Private key (in PKCS #8 format) and the client certificate concatenated.
   * @since 2.2.0
   */
  clientCertificate?: ByteSource;
};

export type HttpRequestMultipartPart = {
  /** Name of the form field */
  name: string;

  /** Value of the part. A stream is sent as binary data, other values as text. */
  value: string | ByteSource;

  /** File name of the part. Only used if `value` is a stream. */
  fileName?: string;

  /** Content type of the part. Only used if `value` is a stream. */
  contentType?: string;
};

export type HttpResponse = {
  /** HTTP status code returned. */
  readonly status: number;

  /** HTTP status message returned (e.g. "OK"). Empty string if the status code is not known by the library. */
  readonly message: string;

  /**
   * HTTP headers of the response. Headers with multiple values (e.g. "set-cookie") are returned as an array.
   */
  readonly headers: { readonly [key: string]: string | string[] | undefined };

  /** Content type of the response. `null` if the response has no "content-type" header. */
  readonly contentType: string | null;

  /**
   * Body of the response as string. `null` if the response content type is not text, JSON, XML or JavaScript.
   */
  readonly body: string | null;

  /** Body of the response as a stream object. */
  readonly bodyStream: ByteSource;

  /** Cookies set by the response */
  readonly cookies: ReadonlyArray<HttpResponseCookie>;
};

export type HttpResponseCookie = {
  /** Name of the cookie */
  readonly name: string;

  /** Value of the cookie */
  readonly value: string;

  /** Path the cookie is valid for. `null` if not set. */
  readonly path: string | null;

  /** Domain the cookie is valid for. `null` if not set. */
  readonly domain: string | null;

  /** Expiry time in milliseconds since epoch. `null` for session cookies. */
  readonly expires: number | null;

  /** `true` if the cookie should only be sent over secure connections */
  readonly secure: boolean;

  /** `true` if the cookie is not accessible from client-side scripts */
  readonly httpOnly: boolean;
};
