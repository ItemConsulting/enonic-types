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

  newSchemaGenerator(): SchemaGenerator;
  list(type: GraphQLScalarType): GraphQLListType;
  nonNull(type: GraphQLScalarType): GraphQLNonNullType;
  reference(typeKey: string): GraphQLScalarType;
  execute<T>(schema: GraphQLSchema, query: string, variables: object, context?: object): T;
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
  createSchema(params: CreateSchemaParams): GraphQLSchema;
  createPageInfoObjectType(params: CreatePageInfoObjectTypeParams): GraphQLInfoObjectType;
  createObjectType(params: CreateObjectTypeParams): GraphQLObjectType;
  createInputObjectType(params: CreateInputObjectTypeParams): GraphQLInputObjectType;
  createInterfaceType(params: CreateInterfaceTypeParams): GraphQLInterfaceType;
  createUnionType(params: CreateUnionTypeParams): GraphQLUnionType;
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

export interface GraphQLResolver {
  type: GraphQLType;
  args?: Record<string, GraphQLScalarType>;
  resolve?: (env: any) => unknown;
}

export interface CreateInterfaceTypeParams {
  readonly name: string;
  readonly fields: Record<string, GraphQLResolver>;
  readonly typeResolver: (env: any) => any;
  readonly description?: string;
}

export interface CreateUnionTypeParams {
  readonly name: string;
  readonly fields: Record<string, GraphQLResolver>;
  readonly typeResolver: (env: any) => any;
}

export interface CreatePageInfoObjectTypeParams {
  readonly name: string;
  readonly fields: Record<string, GraphQLResolver>;
  readonly interfaces: Array<GraphQLInterfaceType | GraphQLTypeReference>;
  description: string;
}

export interface CreateObjectTypeParams {
  readonly name: string;
  readonly description: string;
  readonly fields: Record<string, GraphQLResolver>;
  readonly interfaces: Array<GraphQLInterfaceType | GraphQLTypeReference>;
}

export interface CreateInputObjectTypeParams {
  readonly name: string;
  readonly description: string;
  readonly fields: Record<string, GraphQLResolver>;
  readonly interfaces: Array<GraphQLInterfaceType | GraphQLTypeReference>;
}
