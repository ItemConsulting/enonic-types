declare global {
  // eslint-disable-next-line  @typescript-eslint/no-empty-object-type
  interface XpBeans {}
}

type LooseAutocomplete<T extends string> = T | Omit<string, T>;

declare type Request<Params extends Record<string, string | undefined> = Record<string, string>> = {
  method: string;
  scheme: string;
  host: string;
  port: number;
  path: string;
  rawPath: string;
  url: string;
  remoteAddress: string;
  mode: "inline" | "edit" | "preview" | "live";
  webSocket?: boolean;
  repositoryId: string;
  branch: "draft" | "master";
  contextPath: string;
  body: string;
  params: Partial<Params>;
  headers: { [key: string]: string | undefined };
  cookies: { [key: string]: string | undefined };
  contentType: string;
};

declare type Response<ResponseBody = unknown> = Partial<{
  status: number;
  body: ResponseBody;
  contentType: LooseAutocomplete<
    "text/html" | "application/json" | "application/problem+json" | "text/xml" | "application/xml"
  >;
  headers: { [key: string]: string | undefined };
  cookies: { [key: string]: string | Cookie | undefined };
  redirect: string;
  postProcess: boolean;
  pageContributions: {
    headBegin?: string | Array<string>;
    headEnd?: string | Array<string>;
    bodyBegin?: string | Array<string>;
    bodyEnd?: string | Array<string>;
  };
  applyFilters: boolean;
}>;

declare type WebSocketResponse<WebSocketData = unknown> = {
  webSocket: {
    data?: WebSocketData;
    subProtocols?: string[];
  };
};

declare type MacroContext<Params extends Record<string, string> = Record<string, string>> = {
  name: string;
  body: string;
  params: Params;
  document: string;
  request: Request;
};

/**
 * Request object to be used with functions in "error.ts"
 */
declare type ErrorRequest<Params extends Record<string, string | undefined> = Record<string, string>> = {
  status: number;
  message: string;
  exception?: unknown;
  request: Request<Params>;
};

/**
 * Predefined parameters that CustomSelector service always has
 */
declare type CustomSelectorServiceParams = {
  count: string;
  start: string;
  ids: string;
  query: string;
};

declare type CustomSelectorServiceResponseBody = {
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

type AbstractWebSocketEvent<WebSocketData> = {
  session: {
    id: string;
    path: string;
    params: { [key: string]: string | undefined };
  };
  data: WebSocketData;
};

declare type OpenWebSocketEvent<WebSocketData = unknown> = AbstractWebSocketEvent<WebSocketData> & {
  type: "open";
};

declare type MessageWebSocketEvent<WebSocketData = unknown> = AbstractWebSocketEvent<WebSocketData> & {
  type: "message";
  message: string;
};

declare type CloseWebSocketEvent<WebSocketData = unknown> = AbstractWebSocketEvent<WebSocketData> & {
  type: "close";
  closeReason: number;
};

declare type ErrorWebSocketEvent<WebSocketData = unknown> = AbstractWebSocketEvent<WebSocketData> & {
  type: "error";
  error: string;
};

declare type WebSocketEvent<WebSocketData = unknown> =
  | OpenWebSocketEvent<WebSocketData>
  | MessageWebSocketEvent<WebSocketData>
  | CloseWebSocketEvent<WebSocketData>
  | ErrorWebSocketEvent<WebSocketData>;

declare type Cookie = {
  value: string;
  path?: string;
  domain?: string;
  comment?: string;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "Lax" | "Strict" | "None" | " ";
};

declare type AdminWidgetBody = `<widget>${string}</widget>` | `<widget class="error">${string}</widget>`;

/**
 * Logging functions.
 *
 * @example
 * // Log with simple message
 * log.debug('My log message');
 *
 * @example
 * // Log with placeholders
 * log.info('My %s message with %s', 'log', 'placeholders');
 *
 * @example
 * // Log a JSON object
 * log.warning('My JSON: %s', {a: 1});
 *
 * @example
 * // Log JSON object using string
 * log.error('My JSON: %s', JSON.stringify({a: 1}, null, 2));
 *
 * @global
 * @namespace
 */
declare const log: {
  /**
   * Log debug message.
   *
   * @param {Array} args... logging arguments.
   */
  debug: (...args: unknown[]) => void;

  /**
   * Log info message.
   *
   * @param {Array} args... logging arguments.
   */
  info: (...args: unknown[]) => void;

  /**
   * Log warning message.
   *
   * @param {Array} args... logging arguments.
   */
  warning: (...args: unknown[]) => void;

  /**
   * Log error message.
   *
   * @param {Array} args... logging arguments.
   */
  error: (...args: unknown[]) => void;
};

declare interface ScriptValue {
  isArray(): boolean;

  isObject(): boolean;

  isValue(): boolean;

  isFunction(): boolean;

  getValue(): unknown;

  getKeys(): string[];

  hasMember(key: string): boolean;

  getMember(key: string): ScriptValue;

  getArray(): ScriptValue[];

  getMap(): Record<string, unknown>;

  getList(): object[];
}

/**
 * Javascript to Java bridge functions.
 *
 * @example
 * var bean = __.newBean('com.enonic.xp.MyJavaUtils');
 *
 * @example
 * return __.toNativeObject(bean.findArray(arrayName));
 *
 * @global
 * @namespace
 */
declare const __: {
  /**
   * Creates a new JavaScript bean that wraps the given Java class and makes its methods available to be called from JavaScript.
   */
  newBean: <T = unknown, Bean extends keyof XpBeans | string = string>(
    bean: Bean,
  ) => Bean extends keyof XpBeans ? XpBeans[Bean] : T;
  /**
   * Converts arrays or complex Java objects to JSON.
   * @param value Value to convert
   */
  toNativeObject: <T = unknown>(value: T) => T;

  /**
   * Converts JSON to a Java Map structure that can be used as parameters to a Java method on a bean created with newBean.
   * @param value Value to convert
   */
  toScriptValue: <T = object>(value: T) => ScriptValue;

  /**
   * Add a disposer that is called when the app is stopped.
   * @param callback Function to call
   */
  disposer: (callback: (...args: unknown[]) => unknown) => void;

  /**
   * Converts a JavaScript variable that is undefined to a Java <code>null</code> object.
   * If the JavaScript variable is defined, it is returned as is.
   * @param value Value to convert
   */
  nullOrValue: <T = object>(value: T) => T | null | undefined;

  /**
   * Doc registerMock.
   *
   * @param name Name of mock.
   * @param value Value to register.
   */
  registerMock: (name: string, value: unknown) => void;
};

/**
 * Resolves a path to another file. Can use relative or absolute path.
 *
 * @example
 * // Resolve relative to this
 * var path = resolve('./other.html');
 *
 * @example
 * // Resolve absolute
 * var path = resolve('/path/to/other.html');
 *
 * @param {string} path Path to resolve.
 * @returns {*} Reference to an object.
 * @global
 */
declare const resolve: (path: string) => import("@enonic-types/core").ResourceKey;
