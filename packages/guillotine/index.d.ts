import type { WebSocketEvent } from "@item-enonic-types/global/controller";
import type {
  CreateObjectTypeParams,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLType,
  SchemaGenerator,
} from "@item-enonic-types/lib-graphql";

type ContextCreationCallbacks = Record<string, (context: Context, params: CreateObjectTypeParams) => void>;

export function createSchema(params?: ContextOptions): GraphQLSchema;

export function createHeadlessCmsType(context?: Context): GraphQLType;

export function createContext(options?: ContextOptions): Context;

export function initWebSockets(schema?: GraphQLSchema): (event: WebSocketEvent) => void;

export function createWebSocketData(req: CreateWebSocketDataParams): WebSocketData;

export function execute(params: ExecuteBySchemaParams | ExecuteByConfigParams): string;

export interface ContextOptions {
  applications?: Array<string>;
  allowPaths?: Array<string>;
  subscriptionEventTypes?: Array<string>;
  creationCallbacks: ContextCreationCallbacks;

  [key: string]: unknown;
}

export interface Context {
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
  options: ContextOptions;

  addDictionaryType(objectType: GraphQLObjectType): void;

  putContentTypeType(name: string, objectType: GraphQLObjectType): void;

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
  variables?: unknown;
  schema: GraphQLSchema;
}

export interface ExecuteByConfigParams {
  query: string;
  variables?: unknown;
  siteId?: string;
  branch?: string;
  schemaOptions?: unknown;
}
