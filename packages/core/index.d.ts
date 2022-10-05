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
