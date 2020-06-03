import { PermissionsParams } from "./content";

export interface NodeLibrary {
  /**
   * Creates a connection to a repository with a given branch and authentication info.
   */
  connect(params: Source): RepoConnection;
  multiRepoConnect(params: MultiRepoConnectParams): MultiRepoConnection;
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

export interface MultiRepoConnectParams {
  sources: ReadonlyArray<Source>;
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

export interface NodeFindChildrenParams {
  /**
   * Path or ID of parent to get children of
   */
  readonly parentKey: string;
  /**
   * start index used for paging - default: 0
   */
  readonly start?: number;
  /**
   * number of content to fetch, used for paging - default: 10
   */
  readonly count?: number;
  /**
   * How to order the children - default is value stored on parent
   */
  readonly childOrder?: string;
  /**
   * Optimize for count children only - default is false
   */
  readonly countOnly?: boolean;
  /**
   * Do recursive fetching of all children of children - default is false
   */
  readonly recursive?: boolean;
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

export interface MultiRepoConnection {
  query(params: NodeQueryParams): NodeQueryResponse;
}

export interface RepoConnection {
  /**
   * Creating a node. To create a content where the name is not important and there could be multiple instances under the
   * same parent content, skip the name parameter and specify a displayName.
   */
  create<A>(a: A & NodeCreateParams): A & RepoNode;

  /**
   * Deleting a node or nodes.
   */
  delete(keys: string | ReadonlyArray<string>): ReadonlyArray<string>;

  /**
   * Resolves the differences for a node between current and given branch.
   */
  diff(params: DiffParams): DiffResponse;

  /**
   * Checking if a node or nodes exist for the current context.
   */
  exists(keys: string | ReadonlyArray<string>): ReadonlyArray<string>;

  /**
   * Fetch the versions of a node.
   */
  findVersions(params: FindVersionsParams): NodeVersionQueryResult;

  /**
   * Fetches a specific node by path or ID.
   */
  get<A>(key: string): A & RepoNode;

  /**
   * Fetches specific nodes by path or ID.
   */
  get<A>(keys: ReadonlyArray<string>): ReadonlyArray<A & RepoNode>;

  /**
   * This command queries nodes.
   */
  query<A>(params: NodeQueryParams): NodeQueryResponse;

  /**
   * This function modifies a node.
   */
  modify<A>(params: NodeModifyParams<A>): A & RepoNode;

  /**
   * Get children for given node.
   */
  findChildren(params: NodeFindChildrenParams): NodeQueryResponse;
}

export interface FindVersionsParams {
  /**
   * Path or ID of parent to get children of
   */
  readonly parentKey: string;
  /**
   * start index used for paging - default: 0
   */
  readonly start?: number;
  /**
   * number of content to fetch, used for paging - default: 10
   */
  readonly count?: number;
}

export interface NodeVersionQueryResult {
  readonly total: number;
  readonly count: number;
  readonly hits: ReadonlyArray<NodeVersionMetadata>;
}

export interface NodeVersionMetadata {
  readonly versionId: string;
  readonly nodeId: string;
  readonly nodePath: string;
  readonly timestamp: string;
  readonly commitId: string;
}

export interface DiffParams {
  /**
   * Path or id to resolve diff for
   */
  readonly key: string;
  /**
   * Branch to differentiate with
   */
  readonly target: string;
  /**
   * If set to true, differences are resolved for all children.
   */
  readonly includeChildren?: boolean;
}

export type CompareStatus =
  | 'NEW'
  | "NEW_TARGET"
  | "NEWER"
  | 'OLDER'
  | 'PENDING_DELETE'
  | 'PENDING_DELETE_TARGET'
  | 'EQUAL'
  | 'MOVED'
  | 'CONFLICT_PATH_EXISTS'
  | 'CONFLICT_VERSION_BRANCH_DIVERGS';

export interface NodeComparison {
  readonly id: string;
  readonly status: CompareStatus;
}

export interface DiffResponse {
  diff: ReadonlyArray<NodeComparison>
}
