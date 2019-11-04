export interface ContextLibrary {
  get(): Context;
  run<A>(runContext: RunContext, f: () => A): A;
}

export interface Context {
  readonly repository: string;
  readonly branch: string;
  readonly authInfo: AuthInfo;
}

export interface AuthInfo {
  readonly user: User;
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
  readonly repository?: string;
  readonly branch?: string;
  readonly user?: {
    readonly login: string;
    readonly idProvider?: string;
  };
  readonly principals?: ReadonlyArray<string>;
  readonly attributes?: { readonly [key: string]: string | boolean | number };
}
