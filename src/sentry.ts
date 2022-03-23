declare module "*/lib/sentry" {
  namespace sentryLib {
    type Context = Record<string, unknown>;
    type Primitive = number | string | boolean | symbol | null | undefined;

    interface User {
      [key: string]: any;
      id?: string;
      ip_address?: string;
      email?: string;
      username?: string;
    }

    interface Request {
      url?: string;
      method?: string;
      queryString?: string;
    }

    interface TraceHeader {
      name: string;
      traceId: string;
      spanId: string;
      sampled: boolean;
      tracingEnabled: boolean;
    }

    interface Scope {
      setTag(key: string, value: Primitive): this;
      setTags(tags: Record<string, Primitive>): this;
      setContext(name: string, context: Context | null): this;
      setRequest(req: Request): this;
      setUser(user: User | null): this;
      getUser(): User | undefined;
      setExtras(extras: Record<string, unknown>): this;
      setExtra(key: string, extra: unknown): this;
      clearBreadcrumbs(): void;
    }

    interface Transaction {
      toSentryTrace(): TraceHeader;
      finish(): void;
    }

    interface StartTransactionParams {
      name: string;
      operation?: string;
      description?: string;
      bindToScope?: boolean;
    }

    interface SentryLibrary {
      SENTRY_TRACE_HEADER: "sentry-trace";
      TRACE_ID: "00000000000000000000000000000000";

      isEnabled(): boolean;
      configureScope(callback: (scope: Scope) => void): void;
      withScope(callback: (scope: Scope) => void): void;
      captureMessage(message: string): string;
      captureException(exception: unknown, hint?: string): string;
      clearBreadcrumbs(): void;
      startTransaction({ name, operation, description, bindToScope }: StartTransactionParams): Transaction;
      traceHeaders(): TraceHeader | undefined;
      parseTraceHeaders(config: any): TraceHeader;
      close(): void;
    }
  }
  const sentryLib: sentryLib.SentryLibrary;
  export = sentryLib;
}

declare module "*/lib/sentry/user-agent" {
  namespace sentryUserAgentLib {
    interface UserAgentData {
      browser: {
        name?: string;
        version: string | null;
      };

      os: {
        name?: string;
        version: string | null;
      };

      device: {
        family?: string;
      };
    }

    interface SentryUserAgentLibrary {
      parseUserAgent(req: XP.Request): UserAgentData;
    }
  }
  const sentryUserAgentLib: sentryUserAgentLib.SentryUserAgentLibrary;
  export = sentryUserAgentLib;
}
