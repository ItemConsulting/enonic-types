declare module "*/lib/xp/context" {
  namespace contextLib {
    interface ContextLibrary {
      /**
       * Returns the current context
       */
      get(): Context;

      /**
       * Runs a function within a custom context, for instance the one returned by the get() function call.
       * Commonly used when accessing repositories, or to override current users permissions.
       */
      run<Result>(runContext: RunContext, f: () => Result): Result;
    }

    export type PrincipalKey = import("/lib/xp/auth").PrincipalKey;

    export interface Context {
      /**
       * Repository context.
       */
      readonly repository: string;

      /**
       * Branch context.
       */
      readonly branch: string;

      /**
       * Info about the current user
       */
      readonly authInfo: AuthInfo;
    }

    export interface AuthInfo {
      readonly user: User;

      /**
       * Roles or group principals
       */
      readonly principals: ReadonlyArray<PrincipalKey>;
    }

    export interface User {
      readonly type: string;
      readonly key: string;
      readonly displayName: string;
      readonly disabled: boolean;
      readonly email: string;
      readonly login: string;
      readonly idProvider: string;
    }

    export interface RunContext {
      /**
       * Repository context.
       */
      repository?: string;

      /**
       * Branch context.
       */
      branch?: string;

      /**
       * Specify a valid user/idprovider combination
       */
      user?: {
        /**
         * User
         */
        login: string;

        /**
         * ID provider
         */
        idProvider?: string;
      };

      /**
       * Roles or group principals applicable for current user
       */
      principals?: ReadonlyArray<PrincipalKey>;

      /**
       * Custom attributes
       */
      attributes?: { readonly [key: string]: string | boolean | number };
    }
  }

  const contextLib: contextLib.ContextLibrary;
  export = contextLib;
}
