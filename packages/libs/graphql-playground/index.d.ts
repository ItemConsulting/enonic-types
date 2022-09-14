declare global {
  interface XpLibraries {
    "/lib/graphql-playground": typeof import("./index");
  }
}

export function render(): string;
