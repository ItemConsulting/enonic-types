declare module "*/lib/guillotine" {
  namespace guillotineLib {
    interface GuillotineLibrary {
      createSchema<ExecuteContext = import("./types").EmptyObject>(
        params?: ContextOptions<ExecuteContext>
      ): import("/lib/graphql").GraphQLSchema;

      createHeadlessCmsType(): import("/lib/graphql").GraphQLType;

      createContext<ExecuteContext = import("./types").EmptyObject>(
        options?: ContextOptions<ExecuteContext>
      ): Context<ExecuteContext>;

      initWebSockets(schema: import("/lib/graphql").GraphQLSchema): (event: XP.WebSocketEvent) => void;

      createWebSocketData(req: CreateWebSocketDataParams): WebSocketData;

      execute(params: import("./types").XOR<ExecuteBySchemaParams, ExecuteByConfigParams>): string;
    }

    export interface ContextOptions<ExecuteContext = import("./types").EmptyObject> {
      applications?: Array<string>;
      allowPaths?: Array<string>;
      subscriptionEventTypes?: Array<string>;
      creationCallbacks: Record<
        string,
        (
          context: Context<ExecuteContext>,
          params: import("/lib/graphql").CreateObjectTypeParams<ExecuteContext>
        ) => void
      >;

      [key: string]: unknown;
    }

    export interface Context<ExecuteContext = import("./types").EmptyObject> {
      types: Record<string, import("/lib/graphql").GraphQLType>;
      dictionary: Array<unknown>;
      nameCountMap: Record<string, number>;
      contentTypeMap: Record<string, unknown>;
      options: ContextOptions<ExecuteContext>;

      addDictionaryType(objectType: unknown): void;

      putContentTypeType(name: string, objectType: unknown): void;

      uniqueName(name: string): string;

      getOption(name: string): ContextOptions<ExecuteContext>;

      putOption(name: string, value: unknown): ContextOptions<ExecuteContext>;

      schemaGenerator: import("/lib/graphql").SchemaGenerator;
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
      variables?: unknown;
      schema: import("/lib/graphql").GraphQLSchema;
    }

    export interface ExecuteByConfigParams {
      query: string;
      variables?: unknown;
      siteId?: string;
      branch?: string;
      schemaOptions?: unknown;
    }
  }

  const guillotineLib: guillotineLib.GuillotineLibrary;
  export = guillotineLib;
}
