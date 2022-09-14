declare module "*/lib/guillotine" {
  const lib: typeof import("../packages/libs/guillotine");
  export = lib;
}

declare module "*/lib/guillotine/macro" {
  const lib: typeof import("@item-enonic-types/guillotine/macro");
  export = lib;
}
