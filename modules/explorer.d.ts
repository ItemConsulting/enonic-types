declare module "*/lib/explorer" {
  const lib: typeof import("../packages/libs/explorer");
  export = lib;
}

declare module "*/lib/explorer/client" {
  const lib: typeof import("@item-enonic-types/explorer/client");
  export = lib;
}

declare module "*/lib/explorer/document" {
  const lib: typeof import("@item-enonic-types/explorer/document");
  export = lib;
}

declare module "*/lib/explorer/model/2/constants" {
  const lib: typeof import("@item-enonic-types/explorer/model/2/constants");
  export = lib;
}
