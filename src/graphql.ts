import { EmptyObject } from "./content";

export interface GraphQlPlaygroundLibrary {
  render(): string;
}

export interface GraphQlLibrary {
  GraphQLInt: GraphQLInt;
  GraphQLFloat: GraphQLFloat;
  GraphQLString: GraphQLString;
  GraphQLBoolean: GraphQLBoolean;
  GraphQLID: GraphQLID;
  Date: Date;
  DateTime: GraphQLDateTime;
  Time: GraphQLTime;
  Json: GraphQLJson;
  LocalDateTime: GraphQLLocalDateTime;
  LocalTime: GraphQLLocalTime;

  /**
   * Create an instance of SchemaGenerator
   */
  newSchemaGenerator(): SchemaGenerator;

  /**
   * Returns a modified type that indicates a list of the underlying wrapped type
   */
  list(type: GraphQLType): GraphQLListType;

  /**
   * Returns a modified type that indicates the underlying wrapped type will not be null
   */
  nonNull(type: GraphQLType): GraphQLNonNullType;

  /**
   * Returns a special type that allows an object/interface type to reference a type by its key. Necessary for self reference.
   */
  reference(typeKey: string): GraphQLType;

  /**
   * Executes a GraphQL query and variables against a schema
   */
  execute<ExecuteContext = undefined, Result = any>(
    schema: GraphQLSchema,
    query: string,
    variables: object,
    context?: ExecuteContext
  ): Result;
}

export type GraphQLSchema = unknown & { kind?: "SCHEMA" };

export type GraphQLInt = unknown & {
  kind?: "SCALAR";
  name?: "Int";
};

export type GraphQLFloat = unknown & {
  kind?: "SCALAR";
  name?: "Float";
};

export type GraphQLString = unknown & {
  kind?: "SCALAR";
  name?: "String";
};

export type GraphQLBoolean = unknown & {
  kind?: "SCALAR";
  name?: "Boolean";
};

export type GraphQLID = unknown & {
  kind?: "SCALAR";
  name?: "ID";
};

export type GraphQLDate = unknown & {
  kind?: "SCALAR";
  name?: "Date";
};

export type GraphQLDateTime = unknown & {
  kind?: "SCALAR";
  name?: "DateTime";
};

export type GraphQLTime = unknown & {
  kind?: "SCALAR";
  name?: "Time";
};

export type GraphQLJson = unknown & {
  kind?: "SCALAR";
  name?: "JSON";
};

export type GraphQLLocalDateTime = unknown & {
  kind?: "SCALAR";
  name?: "LocalDateTime";
};

export type GraphQLLocalTime = unknown & {
  kind?: "SCALAR";
  name?: "LocalTime";
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
  createPageInfoObjectType<ExecuteContext = EmptyObject>(
    params: CreatePageInfoObjectTypeParams<ExecuteContext>
  ): GraphQLInfoObjectType;

  /**
   * Creates a GraphQL object type
   */
  createObjectType<ExecuteContext = EmptyObject>(params: CreateObjectTypeParams<ExecuteContext>): GraphQLObjectType;

  /**
   * createInputObjectType
   */
  createInputObjectType<ExecuteContext = EmptyObject>(
    params: CreateInputObjectTypeParams<ExecuteContext>
  ): GraphQLInputObjectType;

  /**
   * Creates a GraphQL interface type
   */
  createInterfaceType<ExecuteContext = EmptyObject>(
    params: CreateInterfaceTypeParams<ExecuteContext>
  ): GraphQLInterfaceType;

  /**
   * Creates a GraphQL union type
   */
  createUnionType<ExecuteContext = EmptyObject>(params: CreateUnionTypeParams<ExecuteContext>): GraphQLUnionType;

  /**
   * Creates a GraphQL enum type
   */
  createEnumType(params: CreateEnumTypeParams): GraphQLEnumType;
}

export interface CreateSchemaParams {
  query: GraphQLObjectType;
  mutation?: GraphQLObjectType;
  subscription?: GraphQLObjectType;
  dictionary: string;
}

export interface CreateEnumTypeParams {
  readonly name: string;
  readonly values: Array<string>;
  readonly description?: string;
}

type GraphQLResolverCallback<ExecuteContext, Source> = (
  env: GraphQLResolverEnvironment<Source, ExecuteContext>
) => unknown;

export interface GraphQLResolver<ExecuteContext = EmptyObject, Source = any> {
  type: GraphQLType;
  args?: Record<string, GraphQLType>;
  resolve?: GraphQLResolverCallback<ExecuteContext, Source>;
}

export interface GraphQLResolverEnvironment<Source = any, ExecuteContext = EmptyObject> {
  source: Source;
  args: Record<string, any>;
  context: ExecuteContext;
}

export interface CreateInterfaceTypeParams<ExecuteContext = EmptyObject> {
  readonly name: string;
  readonly fields: Record<string, GraphQLResolver<ExecuteContext>>;
  readonly typeResolver: (env: any) => any;
  readonly description?: string;
}

export interface CreateUnionTypeParams<ExecuteContext = EmptyObject> {
  readonly name: string;
  readonly fields: Record<string, GraphQLResolver<ExecuteContext>>;
  readonly typeResolver: (env: any) => any;
}

export interface CreatePageInfoObjectTypeParams<ExecuteContext = EmptyObject> {
  readonly name: string;
  readonly fields: Record<string, GraphQLResolver<ExecuteContext>>;
  readonly interfaces: Array<GraphQLInterfaceType | GraphQLTypeReference>;
  description: string;
}

export interface CreateObjectTypeParams<ExecuteContext = EmptyObject> {
  readonly name: string;
  readonly description: string;
  readonly fields: Record<string, GraphQLResolver<ExecuteContext>>;
  readonly interfaces: Array<GraphQLInterfaceType | GraphQLTypeReference>;
}

export interface CreateInputObjectTypeParams<ExecuteContext = EmptyObject> {
  readonly name: string;
  readonly description: string;
  readonly fields: Record<string, GraphQLResolver<ExecuteContext>>;
  readonly interfaces: Array<GraphQLInterfaceType | GraphQLTypeReference>;
}
