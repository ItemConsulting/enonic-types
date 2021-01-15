import {Aggregation, AggregationsResponse, ByteSource, Highlight, PermissionsParams} from "./content";

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

export interface NodeQueryResponse<B extends string = never> {
  readonly total: number;
  readonly count: number;
  readonly hits: ReadonlyArray<NodeQueryHit>;
  readonly aggregations: AggregationsResponse<B>;
}

export interface GetBinaryParams {
  /**
   * Path or id to the node.
   */
  key: string;

  /**
   * Reference to the binary
   */
  binaryReference: string;
}

export interface NodeQueryParams<AggregationKeys extends string> {
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
  readonly aggregations?: Record<AggregationKeys, Aggregation>;

  /**
   * Highlighting config
   */
  readonly highlight?: Highlight;

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

export interface NodeModifyParams<NodeData> {
  /**
   * Path or ID of the node
   */
  readonly key: string;

  /**
   * Editor callback function
   */
  readonly editor: (node: NodeData & RepoNode) => NodeData & RepoNode;
}

export interface NodeMoveParams {
  /**
   * Path or id of the node to be moved or renamed.
   */
  readonly source: string;

  /**
   * New path or name for the node. If the target ends in slash '/', it specifies the parent path where to be moved.
   * Otherwise it means the new desired path or name for the node.
   */
  readonly target: string;
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
  query<AggregationKeys extends string>(params: NodeQueryParams<AggregationKeys>): NodeQueryResponse<AggregationKeys>;
}

export interface RepoConnection {
  /**
   * Commits the active version of nodes.
   */
  commit(params: CommitParams): CommitResponse;
  commit(params: MultiCommitParams): ReadonlyArray<CommitResponse>;

  /**
   * Creating a node. To create a content where the name is not important and there could be multiple instances under the
   * same parent content, skip the name parameter and specify a displayName.
   */
  create<NodeData>(a: NodeData & NodeCreateParams): NodeData & RepoNode;

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
  get<NodeData>(key: string | NodeGetParams): NodeData & RepoNode;

  /**
   * Fetches specific nodes by paths or IDs.
   */
  get<NodeData>(keys: ReadonlyArray<string | NodeGetParams>): ReadonlyArray<NodeData & RepoNode>;

  /**
   * Fetches specific nodes by path(s) or ID(s).
   */
  get<NodeData>(keys: string | NodeGetParams | ReadonlyArray<string | NodeGetParams>): NodeData & RepoNode | ReadonlyArray<NodeData & RepoNode>;

  /**
   * This function returns the active version of a node.
   */
  getActiveVersion(params: GetActiveVersionParams): any;

  /**
   * This function sets the active version of a node.
   */
  setActiveVersion(params: SetActiveVersionParams): boolean;

  /**
   * This function returns a binary stream.
   */
  getBinary(params: GetBinaryParams): ByteSource;

  /**
   * This command queries nodes.
   */
  query<NodeData extends string = never>(params: NodeQueryParams<NodeData>): NodeQueryResponse<NodeData>;

  /**
   * Refresh the index for the current repoConnection
   */
  refresh(mode?: "ALL" | "SEARCH" | "STORAGE"): void;

  /**
   * This function modifies a node.
   */
  modify<NodeData>(params: NodeModifyParams<NodeData>): NodeData & RepoNode;

  /**
   * Rename a node or move it to a new path.
   */
  move(params: NodeMoveParams): boolean;

  /**
   * Pushes a node to a given branch.
   */
  push(params: PushNodeParams): PushNodeResult;

  /**
   * Set the order of the node’s children.
   */
  setChildOrder<NodeData>(params: SetChildOrderParams): NodeData & RepoNode

  /**
   * Set the root node permissions and inheritance.
   */
  setRootPermission<NodeData>(params: SetRootPermissionParams): NodeData & RepoNode;

  /**
   * Get children for given node.
   */
  findChildren(params: NodeFindChildrenParams): NodeQueryResponse;
}

export interface PushNodeParams {
  /**
   * Id or path to the nodes
   */
  readonly key: string;

  /**
   * Array of ids or paths to the nodes
   */
  readonly keys: ReadonlyArray<string>;

  /**
   * Branch to push to
   */
  readonly target: string;

  /**
   * Also push children of given nodes. Default is false.
   */
  readonly includeChildren?: boolean

  /**
   * Resolve dependencies before pushing, meaning that references will also be pushed. Default is true.
   */
  readonly resolve?: boolean

  /**
   * Optional array of ids or paths to nodes not to be pushed.
   * If using this, be aware that nodes need to maintain data integrity (e.g parents must be present in target).
   * If data integrity is not maintained with excluded nodes, they will be pushed anyway.
   */
  readonly exclude?: ReadonlyArray<string>
}

export interface PushNodeResult {
  readonly success: ReadonlyArray<string>;
  readonly failed: ReadonlyArray<{
    readonly id: string;
    readonly reason: string;
  }>;
  readonly deleted: ReadonlyArray<string>;
}

export interface SetChildOrderParams {
  readonly key: string;
  readonly childOrder: string;
}

export interface SetRootPermissionParams {
  readonly _permissions: ReadonlyArray<PermissionsParams>;
  readonly _inheritsPermissions: boolean;
}

export interface CommitParams {
  /**
   * Node key to commit. It could be an id or a path. Prefer the usage of ID rather than paths.
   */
  readonly keys: string;

  /**
   * Optional commit message
   */
  readonly message?: string;
}

export interface MultiCommitParams {
  /**
   * Node keys to commit. Each argument could be an array of the ids and paths. Prefer the usage of ID rather than paths.
   */
  readonly keys: ReadonlyArray<string>;

  /**
   * Optional commit message
   */
  readonly message?: string;
}

export interface CommitResponse {
  readonly id: string;
  readonly message: string;
  readonly committer: string;
  readonly timestamp: string;
}

export interface NodeGetParams {
  /**
   * Path or ID of the node.
   */
  readonly key: string;

  /**
   * Version to get
   */
  readonly versionId: string;
}

export interface GetActiveVersionParams {
  /**
   * Path or ID of the node
   */
  readonly key: string;
}

export interface SetActiveVersionParams {
  /**
   * Path or ID of the node.
   */
  key: 	string;

  /**
   * Version to set as active.
   */
  versionId:	string;
}

export interface FindVersionsParams {
  /**
   * Path or ID of parent to get children of
   */
  readonly key: string;
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
