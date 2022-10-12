declare module "*/lib/turbo-streams" {
  const lib: typeof import("@item-enonic-types/lib-turbo-streams");
  export = lib;
}

declare module "*/lib/turbo-streams/actions" {
  const lib: typeof import("@item-enonic-types/lib-turbo-streams/actions");
  export = lib;
}

declare module "*/lib/turbo-streams/websockets" {
  const lib: typeof import("@item-enonic-types/lib-turbo-streams/websockets");
  export = lib;
}
