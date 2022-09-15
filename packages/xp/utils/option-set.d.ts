export type PickSelected<OPTION_SET extends { _selected: string }, SELECTED extends string> = Extract<
  OPTION_SET,
  { _selected: SELECTED }
>;

export type PickSelectedValue<
  OPTION_SET extends { _selected: string },
  SELECTED extends string
> = SELECTED extends keyof PickSelected<OPTION_SET, SELECTED> ? PickSelected<OPTION_SET, SELECTED>[SELECTED] : never;
