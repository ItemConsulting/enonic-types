import { WebSocketEvent } from "./controller";
import { CreateObjectTypeParams, GraphQLSchema, GraphQLType, SchemaGenerator } from "./graphql";
import { XOR } from "./types";

export interface LibGuillotine {
  createSchema(params?: ContextOptions): GraphQLSchema;
  createHeadlessCmsType(): GraphQLType;
  createContext(options?: ContextOptions): Context;
  initWebSockets(schema: GraphQLSchema): (event: WebSocketEvent) => void;
  createWebSocketData(req: CreateWebSocketDataParams): WebSocketData;
  execute(params: XOR<ExecuteBySchemaParams, ExecuteByConfigParams>): string;
}

export interface ContextOptions {
  applications?: Array<string>;
  allowPaths?: Array<string>;
  subscriptionEventTypes?: Array<string>;
  creationCallbacks: Record<string, (context: Context, params: CreateObjectTypeParams) => void>;
  [key: string]: unknown;
}

export interface Context {
  types: Record<string, GraphQLType>;
  dictionary: Array<unknown>;
  nameCountMap: Record<string, number>;
  contentTypeMap: Record<string, unknown>;
  options: ContextOptions;
  addDictionaryType(objectType: unknown): void;
  putContentTypeType(name: string, objectType: unknown): void;
  uniqueName(name: string): string;
  getOption(name: string): ContextOptions;
  putOption(name: string, value: unknown): ContextOptions;
  schemaGenerator: SchemaGenerator;
}

interface CreateWebSocketDataParams {
  branch: string;
  repositoryId: string;
}

interface WebSocketData {
  branch: string;
  repositoryId: string;
  siteId: string;
}

export interface ExecuteBySchemaParams {
  query: string;
  variables: unknown;
  schema: GraphQLSchema;
}

export interface ExecuteByConfigParams {
  query: string;
  variables: unknown;
  siteId?: string;
  branch?: string;
  schemaOptions?: unknown;
}
