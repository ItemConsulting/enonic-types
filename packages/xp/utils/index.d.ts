export type EmptyObject = Record<string, never>;

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type Unarray<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

// com.google.common.io.ByteSource
export interface ByteSource {
  isEmpty(): boolean;

  size(): number;
}

export interface ResourceKey {
  applicationKey: string;
  path: string;
  uri: string;
  root: boolean;
  name: string;
  extension: string;
}
