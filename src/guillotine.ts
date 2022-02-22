declare module "*/lib/guillotine" {
  namespace guillotineLib {
    type EmptyObject = import("./types").EmptyObject;
    type ContextCreationCallbacks<ExecuteContext = EmptyObject> = Record<
      string,
      (context: Context<ExecuteContext>, params: import("/lib/graphql").CreateObjectTypeParams<ExecuteContext>) => void
    >;
    interface GuillotineLibrary {
      createSchema<ExecuteContext = EmptyObject>(
        params?: ContextOptions<ExecuteContext>
      ): import("/lib/graphql").GraphQLSchema;

      createHeadlessCmsType<ExecuteContext = EmptyObject>(
        context?: Context<ExecuteContext>
      ): import("/lib/graphql").GraphQLType;

      createContext<ExecuteContext = EmptyObject>(options?: ContextOptions<ExecuteContext>): Context<ExecuteContext>;

      initWebSockets(schema?: import("/lib/graphql").GraphQLSchema): (event: XP.WebSocketEvent) => void;

      createWebSocketData(req: CreateWebSocketDataParams): WebSocketData;

      execute(params: import("./types").XOR<ExecuteBySchemaParams, ExecuteByConfigParams>): string;
    }

    export interface ContextOptions<ExecuteContext = EmptyObject> {
      applications?: Array<string>;
      allowPaths?: Array<string>;
      subscriptionEventTypes?: Array<string>;
      creationCallbacks: ContextCreationCallbacks<ExecuteContext>;

      [key: string]: unknown;
    }

    type GraphQLInputObjectType = import("/lib/graphql").GraphQLInputObjectType;
    type GraphQLObjectType = import("/lib/graphql").GraphQLObjectType;
    type GraphQLEnumType = import("/lib/graphql").GraphQLEnumType;
    type GraphQLInterfaceType = import("/lib/graphql").GraphQLInterfaceType;

    export interface Context<ExecuteContext = EmptyObject> {
      types: {
        // acl-types
        principalKeyType: GraphQLObjectType;
        permissionType: GraphQLEnumType;
        accessControlEntryType: GraphQLObjectType;
        permissionsType: GraphQLObjectType;

        // enum-types
        urlType: GraphQLEnumType;

        // form-types
        formItemTypeType: GraphQLEnumType;
        formItemType: GraphQLInterfaceType;
        occurrencesType: GraphQLObjectType;
        defaultValueType: GraphQLObjectType;
        formItemSetType: GraphQLObjectType;
        formLayoutType: GraphQLObjectType;
        formOptionSetOptionType: GraphQLObjectType;
        formOptionSetType: GraphQLObjectType;
        formInputType: GraphQLObjectType;

        // generic-content-types
        geoPointType: GraphQLObjectType;
        mediaFocalPointType: GraphQLObjectType;
        mediaUploaderType: GraphQLObjectType;
        siteConfiguratorType: GraphQLObjectType;

        // generic-types
        publishInfoType: GraphQLObjectType;
        attachmentType: GraphQLObjectType;
        extraDataType: GraphQLObjectType;
        iconType: GraphQLObjectType;
        contentTypeType: GraphQLObjectType;
        contentType: GraphQLInterfaceType;
        untypedContentType: GraphQLObjectType;
        queryContentConnectionType: GraphQLObjectType;

        // input-types
        processHtmlType: GraphQLInputObjectType;
        numberRangeInputType: GraphQLInputObjectType;
        dateRangeInputType: GraphQLInputObjectType;
        geoPointInputType: GraphQLInputObjectType;
        termsAggregationInputType: GraphQLInputObjectType;
        statsAggregationInputType: GraphQLInputObjectType;
        rangeAggregationInputType: GraphQLInputObjectType;
        dateRangeAggregationInputType: GraphQLInputObjectType;
        dateHistogramAggregationInputType: GraphQLInputObjectType;
        geoDistanceAggregationInputType: GraphQLInputObjectType;
        minAggregationInputType: GraphQLInputObjectType;
        maxAggregationInputType: GraphQLInputObjectType;
        valueCountAggregationInputType: GraphQLInputObjectType;
        aggregationInputType: GraphQLInputObjectType;
        existsFilterInputType: GraphQLInputObjectType;
        notExistsFilterInputType: GraphQLInputObjectType;
        hasValueFilterInputType: GraphQLInputObjectType;
        idsFilterInputType: GraphQLInputObjectType;
        booleanFilterInputType: GraphQLInputObjectType;
        filterInputType: GraphQLInputObjectType;

        // page-types
        imageStyleType: GraphQLObjectType;
        imageType: GraphQLObjectType;
        richTextType: GraphQLObjectType;
        componentTypeType: GraphQLEnumType;
        pageComponentDataType: GraphQLObjectType;
        layoutComponentDataType: GraphQLObjectType;
        partComponentDataType: GraphQLObjectType;
        imageComponentDataType: GraphQLObjectType;
        textComponentDataType: GraphQLObjectType;
        fragmentComponentDataType: GraphQLObjectType;
        componentType: GraphQLObjectType;
      };
      dictionary: Array<GraphQLObjectType>;
      nameCountMap: Record<string, number>;
      contentTypeMap: Record<string, GraphQLObjectType>;
      options: ContextOptions<ExecuteContext>;

      addDictionaryType(objectType: GraphQLObjectType): void;

      putContentTypeType(name: string, objectType: GraphQLObjectType): void;

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

declare module "*/lib/guillotine/macro" {
  namespace guillotineMacroLib {
    interface GuillotineMacroLibrary {
      processHtml(params: ProcessHtmlParams): ProcessHtmlResult;
    }

    interface ProcessHtmlParams {
      value: string;
      type?: string;
      imageWidths?: Array<number>;
      imageSizes?: string;
    }

    interface ProcessHtmlResult<MacroConfig = unknown> {
      raw: string;
      processedHtml: string;
      macrosAsJson: Array<{
        ref: string;
        name: string;
        descriptor: string;
        config: MacroConfig;
      }>;
      images: Array<{
        imageId: string;
        imageRef: string;
      }>;
    }
  }

  const guillotineMacroLib: guillotineMacroLib.GuillotineMacroLibrary;
  export = guillotineMacroLib;
}
