export const GraphQLInt: GraphQLInt;
export const GraphQLFloat: GraphQLFloat;
export const GraphQLString: GraphQLString;
export const GraphQLBoolean: GraphQLBoolean;
export const GraphQLID: GraphQLID;
export const Date: GraphQLDate;
export const DateTime: GraphQLDateTime;
export const Time: GraphQLTime;
export const Json: GraphQLJson;
export const LocalDateTime: GraphQLLocalDateTime;
export const LocalTime: GraphQLLocalTime;

/**
 * Create an instance of SchemaGenerator
 */
export function newSchemaGenerator(): SchemaGenerator;

/**
 * Returns a modified type that indicates a list of the underlying wrapped type
 */
export function list(type: GraphQLType): GraphQLListType;

/**
 * Returns a modified type that indicates the underlying wrapped type will not be null
 */
export function nonNull(type: GraphQLType): GraphQLNonNullType;

/**
 * Returns a special type that allows an object/interface type to reference a type by its key. Necessary for self reference.
 */
export function reference(typeKey: string): GraphQLTypeReference;

/**
 * Executes a GraphQL query and variables against a schema
 */
export function execute<ExecuteContext = unknown, Result = any>(
  schema: GraphQLSchema,
  query: string,
  variables: object,
  context?: ExecuteContext,
): Result;

export type GraphQLSchema = unknown & { kind?: "SCHEMA" };

export type GraphQLInt = unknown & {
  kind?: "SCALAR";
  name: "Int";
};

export type GraphQLFloat = unknown & {
  kind?: "SCALAR";
  name: "Float";
};

export type GraphQLString = unknown & {
  kind?: "SCALAR";
  name: "String";
};

export type GraphQLBoolean = unknown & {
  kind?: "SCALAR";
  name: "Boolean";
};

export type GraphQLID = unknown & {
  kind?: "SCALAR";
  name: "ID";
};

export type GraphQLDate = unknown & {
  kind?: "SCALAR";
  name: "Date";
};

export type GraphQLDateTime = unknown & {
  kind?: "SCALAR";
  name: "DateTime";
};

export type GraphQLTime = unknown & {
  kind?: "SCALAR";
  name: "Time";
};

export type GraphQLJson = unknown & {
  kind?: "SCALAR";
  name: "JSON";
};

export type GraphQLLocalDateTime = unknown & {
  kind?: "SCALAR";
  name: "LocalDateTime";
};

export type GraphQLLocalTime = unknown & {
  kind?: "SCALAR";
  name: "LocalTime";
};

export type GraphQLScalarType =
  | GraphQLInt
  | GraphQLFloat
  | GraphQLString
  | GraphQLBoolean
  | GraphQLID
  | GraphQLDate
  | GraphQLDateTime
  | GraphQLTime
  | GraphQLJson
  | GraphQLLocalDateTime
  | GraphQLLocalTime;

export type GraphQLObjectType = unknown & {
  kind?: "OBJECT";
};
export type GraphQLInterfaceType = unknown & {
  kind?: "INTERFACE";
};
export type GraphQLTypeReference = unknown & {
  kind?: "reference";
};
export type GraphQLInputObjectType = unknown & {
  kind?: "INPUT_OBJECT";
};
export type GraphQLInfoObjectType = unknown & {
  kind?: "INFO_OBJECT";
};
export type GraphQLUnionType = unknown & {
  kind?: "UNION";
};
export type GraphQLEnumType = unknown & {
  kind?: "ENUM";
};
export type GraphQLNonNullType = unknown & {
  kind?: "NON_NULL";
};
export type GraphQLListType = unknown & {
  kind?: "LIST";
};

export type GraphQLType =
  | GraphQLScalarType
  | GraphQLObjectType
  | GraphQLInterfaceType
  | GraphQLTypeReference
  | GraphQLInputObjectType
  | GraphQLInfoObjectType
  | GraphQLUnionType
  | GraphQLEnumType
  | GraphQLNonNullType
  | GraphQLListType;

export interface SchemaGenerator {
  /**
   * Creates a GraphQL schema
   */
  createSchema(params: CreateSchemaParams): GraphQLSchema;

  /**
   * Creates a GraphQL page info object type
   */
  createPageInfoObjectType(params: CreatePageInfoObjectTypeParams): GraphQLInfoObjectType;

  /**
   * Creates a GraphQL object type
   */
  createObjectType(params: CreateObjectTypeParams): GraphQLObjectType;

  /**
   * createInputObjectType
   */
  createInputObjectType(params: CreateInputObjectTypeParams): GraphQLInputObjectType;

  /**
   * Creates a GraphQL interface type
   */
  createInterfaceType(params: CreateInterfaceTypeParams): GraphQLInterfaceType;

  /**
   * Creates a GraphQL union type
   */
  createUnionType(params: CreateUnionTypeParams): GraphQLUnionType;

  /**
   * Creates a GraphQL enum type
   */
  createEnumType(params: CreateEnumTypeParams): GraphQLEnumType;
}

export interface CreateSchemaParams {
  query: GraphQLObjectType;
  mutation?: GraphQLObjectType;
  subscription?: GraphQLObjectType;
  dictionary: Array<GraphQLObjectType>;
}

export interface CreateEnumTypeParams {
  readonly name: string;
  readonly values: Array<string>;
  readonly description?: string;
}

export interface GraphQLResolver {
  type: GraphQLType;
  args?: Record<string, GraphQLType>;
  resolve?: <Environment extends GraphQLResolverEnvironment>(env: Environment) => unknown;
}

export interface GraphQLResolverEnvironment<Source = any, Context = any> {
  source: Source;
  args: Record<string, any>;
  context: Context;
}

export interface CreateInterfaceTypeParams {
  name: string;
  fields: Record<string, GraphQLResolver>;
  typeResolver: (env: any) => GraphQLObjectType;
  description?: string;
}

export interface CreateUnionTypeParams {
  name: string;
  types: Array<GraphQLObjectType | GraphQLTypeReference>;
  typeResolver: (env: any) => GraphQLObjectType;
}

export interface CreatePageInfoObjectTypeParams {
  name: string;
  fields: Record<string, GraphQLResolver>;
  interfaces?: Array<GraphQLInterfaceType | GraphQLTypeReference>;
  description?: string;
}

export interface CreateObjectTypeParams {
  name: string;
  description?: string;
  fields: Record<string, GraphQLResolver>;
  interfaces?: Array<GraphQLInterfaceType | GraphQLTypeReference>;
}

export interface CreateInputObjectTypeParams {
  name: string;
  description?: string;
  fields: Record<string, GraphQLResolver>;
  interfaces?: Array<GraphQLInterfaceType | GraphQLTypeReference>;
}
