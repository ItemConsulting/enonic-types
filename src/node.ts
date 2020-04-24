import { PermissionsParams } from "./content";

export interface NodeLibrary {
  /**
   * Creates a connection to a repository with a given branch and authentication info.
   */
  connect(params: Source): RepoConnection;

  /**
   * This function fetches nodes.
   */
  get<A>(repo: RepoConnection, keys: string | ReadonlyArray<string>): ReadonlyArray<A & RepoNode> | A & RepoNode;

  /**
   * This function creates a node.
   */
  create<A>(repo: RepoConnection, params: A & NodeCreateParams):  A & RepoNode;

  /**
   * This function deletes a node or nodes.
   */
  delete(repo: RepoConnection, keys: ReadonlyArray<string>): boolean;

  /**
   * This command queries nodes.
   */
  query(repo: RepoConnection, params: NodeQueryParams): NodeQueryResponse;
}

export interface Source {
  readonly repoId: string;
  readonly branch: string;
  readonly user?: {
    readonly login: string;
    readonly idProvider?: string;
  };
  readonly principals?: ReadonlyArray<string>;
}

export interface NodeQueryHit {
  readonly id: string;
  readonly score: number;
}

export interface NodeQueryResponse {
  readonly total: number;
  readonly count: number;
  readonly hits: ReadonlyArray<NodeQueryHit>;
}

export interface NodeQueryParams {
  /**
   * Start index (used for paging).
   */
  readonly start?: number;

  /**
   * Number of contents to fetch.
   */
  readonly count?: number;

  /**
   * Query expression.
   */
  readonly query: string;

  /**
   * Query filters
   */
  readonly filters?: any;

  /**
   * Sorting expression.
   */
  readonly sort?: string;

  /**
   * Aggregations expression.
   */
  readonly aggregations?: string;

  /**
   * Return score calculation explanation.
   */
  readonly explain?: boolean;
}

export interface IndexConfigEntry {
  /**
   * If true, indexing is done based on valueType, according to the table above. I.e. numeric values are indexed as
   * both string and numeric.
   */
  readonly decideByType: boolean;

  /**
   * If false, indexing will be disabled for the affected properties
   */
  readonly enabled: boolean;

  /**
   * Values are stored as 'ngram'
   */
  readonly nGram: boolean;

  /**
   * Values are stored as 'ngram', 'analyzed' and also added to the _allText system property
   */
  readonly fulltext: boolean;

  /**
   * Affected values will be added to the _allText property
   */
  readonly includeInAllText: boolean;

  /**
   * Values are stored as 'path' type and applicable for the pathMatch-function
   */
  readonly path: boolean;

  readonly indexValueProcessors: ReadonlyArray<any>;
  readonly languages: ReadonlyArray<any>;
}

export type IndexConfigTemplates =
  | "none"
  | "byType"
  | "fulltext"
  | "path"
  | "minimal";

export interface IndexConfig {
  readonly default: IndexConfigEntry | IndexConfigTemplates;
  readonly configs?: ReadonlyArray<{
    readonly path: string;
    readonly config: IndexConfigEntry | IndexConfigTemplates;
  }>;
}

export interface NodeCreateParams {
  /**
   * Name of content.
   */
  readonly _name?: string;

  /**
   * Path to place content under.
   */
  readonly _parentPath?: string;

  /**
   * How the document should be indexed. A default value "byType" will be set if no value specified.
   */
  readonly _indexConfig?: IndexConfig;

  /**
   * The access control list for the node. By default the creator will have full access
   */
  readonly _permissions?: ReadonlyArray<PermissionsParams>;

  /**
   * true if the permissions should be inherited from the node parent. Default is false.
   */
  readonly _inheritsPermissions?: boolean;

  /**
   * Value used to order document when ordering by parent and child-order is set to manual
   */
  readonly _manualOrderValue?: number;

  /**
   * Default ordering of children when doing getChildren if no order is given in query
   */
  readonly _childOrder?: string;
}

export interface NodeModifyParams<A> {
  /**
   * Path or ID of the node
   */
  readonly key: string;

  /**
   * Editor callback function
   */
  readonly editor: (node: A & RepoNode) => A & RepoNode;
}

export interface RepoNode {
  readonly _id: string;
  readonly _childOrder: string;
  readonly _indexConfig: IndexConfig;
  readonly _inheritsPermissions: boolean;
  readonly _permissions: ReadonlyArray<PermissionsParams>;
  readonly _state: string;
  readonly _nodeType: string;
}

export interface RepoConnection {
  create<A>(a: A & NodeCreateParams): A & RepoNode;
  delete(keys: ReadonlyArray<string> | string): boolean;
  get<A>(keys: string | ReadonlyArray<string>): ReadonlyArray<A & RepoNode>;
  query<A>(params: NodeQueryParams): NodeQueryResponse;
  modify<A>(params: NodeModifyParams<A>): A & RepoNode;
}
