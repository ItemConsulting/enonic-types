// https://stackoverflow.com/a/51691257/1758634
import type { Content } from "@item-enonic-types/lib-content";
import type { LiteralUnion } from "./index";

export type KeysOfType<O, T> = {
  [K in keyof O]: O[K] extends T ? K : never;
}[keyof O];

export type WrapDataInContent<Data, Meta = {}> = Data extends any
  ? Content<Data, KeyOfContentType<Data>> & Meta
  : never;

export type ContentTypeByName<ContentTypeName, FallbackType> = ContentTypeName extends keyof XP.ContentTypes
  ? XP.ContentTypes[ContentTypeName]
  : FallbackType;

export type KeyOfContentType<Data> = KeysOfType<XP.ContentTypes, Data> extends never
  ? string
  : KeysOfType<XP.ContentTypes, Data>;

export type LiteralContentTypeNames = LiteralUnion<keyof XP.ContentTypes>;
