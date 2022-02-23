declare module "*/lib/xp/node" {
  namespace nodeLib {
    interface NodeLibrary {
      /**
       * Creates a connection to a repository with a given branch and authentication info.
       */
      connect(params: Source): RepoConnection;

      multiRepoConnect(params: MultiRepoConnectParams): MultiRepoConnection;
    }

    export type PrincipalKey = import("/lib/xp/auth").PrincipalKey;

    export interface Source {
      repoId: string;
      branch: string;
      user?: {
        login: string;
        idProvider?: string;
      };
      principals?: Array<PrincipalKey>;
    }

    // Multi repo connect requires principles to be present for sources
    export type SourceWithPrincipals = Omit<Source, "principals"> & {
      principals: Array<PrincipalKey>;
    };

    export interface MultiRepoConnectParams {
      sources: Array<SourceWithPrincipals>;
    }

    export interface NodeQueryHit {
      id: string;
      score: number;
    }

    export interface MultiRepoNodeQueryHit extends NodeQueryHit {
      repoId: string;
      branch: string;
    }

    export interface NodeQueryResponse<AggregationKeys extends string = never> {
      total: number;
      count: number;
      hits: Array<NodeQueryHit>;
      aggregations: import("/lib/xp/content").AggregationsResponse<AggregationKeys>;
    }

    export type MultiRepoNodeQueryResponse<AggregationKeys extends string = never> = Omit<
      NodeQueryResponse<AggregationKeys>,
      "hits"
    > & {
      hits: Array<MultiRepoNodeQueryHit>;
    };

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

    export interface NodeQueryParams<AggregationKeys extends string = never> {
      /**
       * Start index (used for paging).
       */
      start?: number;

      /**
       * Number of contents to fetch.
       */
      count?: number;

      /**
       * Query expression.
       */
      query?: string;

      /**
       * Query filters
       */
      filters?: import("/lib/xp/content").BasicFilters | import("/lib/xp/content").BooleanFilter;

      /**
       * Sorting expression.
       */
      sort?: string;

      /**
       * Aggregations expression.
       */
      aggregations?: Record<AggregationKeys, import("/lib/xp/content").Aggregation>;

      /**
       * Highlighting config
       */
      highlight?: import("/lib/xp/content").Highlight;

      /**
       * Return score calculation explanation.
       */
      explain?: boolean;
    }

    export interface IndexConfigEntry {
      /**
       * If true, indexing is done based on valueType, according to the table above. I.e. numeric values are indexed as
       * both string and numeric.
       */
      decideByType: boolean;

      /**
       * If false, indexing will be disabled for the affected properties
       */
      enabled: boolean;

      /**
       * Values are stored as 'ngram'
       */
      nGram: boolean;

      /**
       * Values are stored as 'ngram', 'analyzed' and also added to the _allText system property
       */
      fulltext: boolean;

      /**
       * Affected values will be added to the _allText property
       */
      includeInAllText: boolean;

      /**
       * Values are stored as 'path' type and applicable for the pathMatch-function
       */
      path: boolean;

      indexValueProcessors: Array<any>;
      languages: Array<any>;
    }

    export type IndexConfigTemplates = "none" | "byType" | "fulltext" | "path" | "minimal";

    export interface IndexConfig {
      default: IndexConfigEntry | IndexConfigTemplates;
      configs?: Array<{
        path: string;
        config: IndexConfigEntry | IndexConfigTemplates;
      }>;
    }

    export interface NodeCreateParams {
      /**
       * Name of content.
       */
      _name?: string;

      /**
       * Path to place content under.
       */
      _parentPath?: string;

      /**
       * How the document should be indexed. A default value "byType" will be set if no value specified.
       */
      _indexConfig?: IndexConfig;

      /**
       * The access control list for the node. By default the creator will have full access
       */
      _permissions?: Array<import("/lib/xp/content").PermissionsParams>;

      /**
       * true if the permissions should be inherited from the node parent. Default is false.
       */
      _inheritsPermissions?: boolean;

      /**
       * Value used to order document when ordering by parent and child-order is set to manual
       */
      _manualOrderValue?: number;

      /**
       * Default ordering of children when doing getChildren if no order is given in query
       */
      _childOrder?: string;
    }

    export interface NodeModifyParams<NodeData> {
      /**
       * Path or ID of the node
       */
      key: string;

      /**
       * Editor callback function
       */
      editor: (node: NodeData & RepoNode) => NodeData & RepoNode;
    }

    export interface NodeMoveParams {
      /**
       * Path or id of the node to be moved or renamed.
       */
      source: string;

      /**
       * New path or name for the node. If the target ends in slash '/', it specifies the parent path where to be moved.
       * Otherwise it means the new desired path or name for the node.
       */
      target: string;
    }

    export interface NodeFindChildrenParams {
      /**
       * Path or ID of parent to get children of
       */
      parentKey: string;
      /**
       * start index used for paging - default: 0
       */
      start?: number;
      /**
       * number of content to fetch, used for paging - default: 10
       */
      count?: number;
      /**
       * How to order the children - default is value stored on parent
       */
      childOrder?: string;
      /**
       * Optimize for count children only - default is false
       */
      countOnly?: boolean;
      /**
       * Do recursive fetching of all children of children - default is false
       */
      recursive?: boolean;
    }

    export interface RepoNode {
      _id: string;
      _name: string;
      _path: string;
      _childOrder: string;
      _indexConfig: IndexConfig;
      _inheritsPermissions: boolean;
      _permissions: Array<import("/lib/xp/content").PermissionsParams>;
      _state: string;
      _nodeType: string;
      _versionKey: string;
      _ts: string;
    }

    export interface MultiRepoConnection {
      query<AggregationKeys extends string>(
        params: NodeQueryParams<AggregationKeys>
      ): MultiRepoNodeQueryResponse<AggregationKeys>;
    }

    export interface RepoConnection {
      /**
       * Commits the active version of nodes.
       */
      commit(params: CommitParams): CommitResponse;

      commit(params: MultiCommitParams): Array<CommitResponse>;

      /**
       * Creating a node. To create a content where the name is not important and there could be multiple instances under the
       * same parent content, skip the name parameter and specify a displayName.
       */
      create<NodeData>(a: NodeData & NodeCreateParams): NodeData & RepoNode;

      /**
       * Deleting a node or nodes.
       */
      delete(keys: string | Array<string>): Array<string>;

      /**
       * Resolves the differences for a node between current and given branch.
       */
      diff(params: DiffParams): DiffResponse;

      /**
       * Checking if a node or nodes exist for the current context.
       */
      exists(keys: string | Array<string>): Array<string>;

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
      get<NodeData>(keys: Array<string | NodeGetParams>): Array<NodeData & RepoNode>;

      /**
       * Fetches specific nodes by path(s) or ID(s).
       */
      get<NodeData>(
        keys: string | NodeGetParams | Array<string | NodeGetParams>
      ): (NodeData & RepoNode) | Array<NodeData & RepoNode>;

      /**
       * This function fetches commit by id.
       * @since 7.7.0
       */
      getCommit(params: GetCommitParams): CommitResponse;

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
      getBinary(params: GetBinaryParams): import("/lib/xp/content").ByteSource;

      /**
       * This command queries nodes.
       */
      query<AggregationKeys extends string = never>(
        params: NodeQueryParams<AggregationKeys>
      ): NodeQueryResponse<AggregationKeys>;

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
      setChildOrder<NodeData>(params: SetChildOrderParams): NodeData & RepoNode;

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
      key: string;

      /**
       * Array of ids or paths to the nodes
       */
      keys: Array<string>;

      /**
       * Branch to push to
       */
      target: string;

      /**
       * Also push children of given nodes. Default is false.
       */
      includeChildren?: boolean;

      /**
       * Resolve dependencies before pushing, meaning that references will also be pushed. Default is true.
       */
      resolve?: boolean;

      /**
       * Optional array of ids or paths to nodes not to be pushed.
       * If using this, be aware that nodes need to maintain data integrity (e.g parents must be present in target).
       * If data integrity is not maintained with excluded nodes, they will be pushed anyway.
       */
      exclude?: Array<string>;
    }

    export interface PushNodeResult {
      success: Array<string>;
      failed: Array<{
        id: string;
        reason: string;
      }>;
      deleted: Array<string>;
    }

    export interface SetChildOrderParams {
      key: string;
      childOrder: string;
    }

    export interface SetRootPermissionParams {
      _permissions: Array<import("/lib/xp/content").PermissionsParams>;
      _inheritsPermissions: boolean;
    }

    export interface CommitParams {
      /**
       * Node key to commit. It could be an id or a path. Prefer the usage of ID rather than paths.
       */
      keys: string;

      /**
       * Optional commit message
       */
      message?: string;
    }

    export interface MultiCommitParams {
      /**
       * Node keys to commit. Each argument could be an array of the ids and paths. Prefer the usage of ID rather than paths.
       */
      keys: Array<string>;

      /**
       * Optional commit message
       */
      message?: string;
    }

    export interface CommitResponse {
      id: string;
      message: string;
      committer: string;
      timestamp: string;
    }

    export interface NodeGetParams {
      /**
       * Path or ID of the node.
       */
      key: string;

      /**
       * Version to get
       */
      versionId: string;
    }

    export interface GetCommitParams {
      id: string;
    }

    export interface GetActiveVersionParams {
      /**
       * Path or ID of the node
       */
      key: string;
    }

    export interface SetActiveVersionParams {
      /**
       * Path or ID of the node.
       */
      key: string;

      /**
       * Version to set as active.
       */
      versionId: string;
    }

    export interface FindVersionsParams {
      /**
       * Path or ID of parent to get children of
       */
      key: string;
      /**
       * start index used for paging - default: 0
       */
      start?: number;
      /**
       * number of content to fetch, used for paging - default: 10
       */
      count?: number;
    }

    export interface NodeVersionQueryResult {
      total: number;
      count: number;
      hits: Array<NodeVersionMetadata>;
    }

    export interface NodeVersionMetadata {
      versionId: string;
      nodeId: string;
      nodePath: string;
      timestamp: string;
      commitId: string;
    }

    export interface DiffParams {
      /**
       * Path or id to resolve diff for
       */
      key: string;
      /**
       * Branch to differentiate with
       */
      target: string;
      /**
       * If set to true, differences are resolved for all children.
       */
      includeChildren?: boolean;
    }

    export type CompareStatus =
      | "NEW"
      | "NEW_TARGET"
      | "NEWER"
      | "OLDER"
      | "PENDING_DELETE"
      | "PENDING_DELETE_TARGET"
      | "EQUAL"
      | "MOVED"
      | "CONFLICT_PATH_EXISTS"
      | "CONFLICT_VERSION_BRANCH_DIVERGS";

    export interface NodeComparison {
      id: string;
      status: CompareStatus;
    }

    export interface DiffResponse {
      diff: Array<NodeComparison>;
    }
  }

  const nodeLib: nodeLib.NodeLibrary;
  export = nodeLib;
}
