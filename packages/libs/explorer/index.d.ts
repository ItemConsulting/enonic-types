declare global {
  interface XpLibraries {
    "/lib/explorer": typeof import("./index");
    "/lib/explorer/model/2/constants": typeof import("./model/2/constants");
    "/lib/explorer/document": typeof import("./document");
    "/lib/explorer/client": typeof import("./client");
  }
}

export * from "./client";
export * from "./document";
