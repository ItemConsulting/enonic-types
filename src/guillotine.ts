import { WebSocketEvent } from "./controller";
import { CreateObjectTypeParams, GraphQLSchema, GraphQLType, SchemaGenerator } from "./graphql";
import { XOR } from "./types";
import { EmptyObject } from "./content";

export interface LibGuillotine {
  createSchema<ExecuteContext = EmptyObject>(params?: ContextOptions<ExecuteContext>): GraphQLSchema;

  createHeadlessCmsType(): GraphQLType;

  createContext<ExecuteContext = EmptyObject>(options?: ContextOptions<ExecuteContext>): Context<ExecuteContext>;

  initWebSockets(schema: GraphQLSchema): (event: WebSocketEvent) => void;

  createWebSocketData(req: CreateWebSocketDataParams): WebSocketData;

  execute(params: XOR<ExecuteBySchemaParams, ExecuteByConfigParams>): string;
}

export interface ContextOptions<ExecuteContext = EmptyObject> {
  applications?: Array<string>;
  allowPaths?: Array<string>;
  subscriptionEventTypes?: Array<string>;
  creationCallbacks: Record<
    string,
    (context: Context<ExecuteContext>, params: CreateObjectTypeParams<ExecuteContext>) => void
  >;

  [key: string]: unknown;
}

export interface Context<ExecuteContext = EmptyObject> {
  types: Record<string, GraphQLType>;
  dictionary: Array<unknown>;
  nameCountMap: Record<string, number>;
  contentTypeMap: Record<string, unknown>;
  options: ContextOptions<ExecuteContext>;

  addDictionaryType(objectType: unknown): void;

  putContentTypeType(name: string, objectType: unknown): void;

  uniqueName(name: string): string;

  getOption(name: string): ContextOptions<ExecuteContext>;

  putOption(name: string, value: unknown): ContextOptions<ExecuteContext>;

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
