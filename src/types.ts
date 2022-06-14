export type EmptyObject = Record<string, never>;
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
export type Unarray<T> = T extends Array<infer U> ? U : T extends ReadonlyArray<infer U> ? U : T;
export type PickSelected<OPTION_SET extends { _selected: string }, SELECTED extends string> = Extract<
  OPTION_SET,
  { _selected: SELECTED }
>;
export type PickSelectedValue<
  OPTION_SET extends { _selected: string },
  SELECTED extends string
> = SELECTED extends keyof PickSelected<OPTION_SET, SELECTED> ? PickSelected<OPTION_SET, SELECTED>[SELECTED] : never;

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};
