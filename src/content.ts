import {Region} from "./portal";

type EmptyObject = Record<string, never>;

export interface ContentLibrary {
  /**
   * This function fetches a content
   */
  get<Data extends object, XData extends object = object>(params: GetContentParams): Content<Data, EmptyObject, XData> | null;

  /**
   * This command queries content
   */
  query<Data extends object, AggregationKeys extends string = never>(params: QueryContentParams<AggregationKeys>): QueryResponse<Data, AggregationKeys, QueryResponseMetaDataScore>;

  query<Data extends object, AggregationKeys extends string = never>(params: QueryContentParamsWithSort<AggregationKeys>): QueryResponse<Data, AggregationKeys, QueryResponseMetaDataSort>;

  /**
   * This function creates a content.
   */
  create<Data extends object>(params: CreateContentParams<Data>): Content<Data>;

  /**
   * Modifies properties of a content
   */
  modify<Data extends object, PageConfig extends object = object, XData extends object = object>(params: ModifyContentParams<Data, PageConfig, XData>): Content<Data, PageConfig, XData>;

  /**
   * This function deletes a content
   */
  delete(params: DeleteContentParams): boolean;

  /**
   * This function checks if a content exists for the current context.
   */
  exists(params: ExistsParams): boolean;

  /**
   * This function publishes content to a branch
   */
  publish(params: PublishContentParams): PublishResponse;

  /**
   * This function unpublishes content that had been published to the master branch
   */
  unpublish(params: UnpublishContentParams): ReadonlyArray<string>;

  /**
   * This function fetches children of a content
   */
  getChildren<Data extends object>(params: GetChildrenParams): QueryResponse<Data>;

  /**
   * This function returns the list of content items that are outbound dependencies of specified content.
   */
  getOutboundDependencies(params: GetOutboundDependenciesParams): ReadonlyArray<string>;

  /**
   * Rename a content or move it to a new path
   */
  move<Data extends object>(params: MoveParams): Content<Data>;

  /**
   * This function returns the parent site of a content
   */
  getSite<Config extends object, PageConfig extends object = never>(params: GetSiteParams): Site<Config, PageConfig>;

  /**
   * This function returns the site configuration for this app in the parent site of a content
   */
  getSiteConfig<Config extends object>(params: GetSiteConfigParams): Config;

  /**
   * Creates a media content
   */
  createMedia<Data extends object>(params: CreateMediaParams): Content<Data>;

  /**
   * Adds an attachment to an existing content.
   */
  addAttachment(params: AddAttachmentParams): void;

  /**
   * This function returns a content attachments
   */
  getAttachments(key: string): Attachments | null;

  /**
   * This function returns a data-stream for the specified content attachment
   */
  getAttachmentStream(params: AttachmentStreamParams): ByteSource | null;

  /**
   * Removes an attachment from an existing content
   */
  removeAttachment(params: RemoveAttachmentParams): void;

  /**
   * Resets custom inheritance flags of a content item. For an item that was inherited from a parent content
   * project/layer this action will reset specified changes made inside a specified layer.
   * @since 7.6.0
   */
  resetInheritance(params: ResetInheritanceParams): void;

  /**
   * Gets permissions on a content
   */
  getPermissions(params: GetPermissionsParams): GetPermissionsResult;

  /**
   * Sets permissions on a content
   */
  setPermissions(params: SetPermissionsParams): GetPermissionsResult;

  /**
   * Returns the properties and icon of the specified content type
   */
  getType(name: string): ContentType | null;

  /**
   * Returns the list of all the content types currently registered in the system
   */
  getTypes(): ReadonlyArray<ContentType>;
}

export interface ResetInheritanceParams {
  /**
   * Path or id to the content
   */
  key: string;

  /**
   * A unique id of a Content Layer in which the inherited content item should be reset
   */
  projectName: string;

  /**
   * Array of inheritance flags (case-sensitive, all upper-case).
   * Supported values are:
   *  - CONTENT (resets any customized content data)
   *  - PARENT (resets item moved under a different parent)
   *  - NAME (resets renamed item)
   *  - SORT (resets custom sorting)
   */
  inherit: ReadonlyArray<"CONTENT" | "PARENT" | "NAME" | "SORT">;
}

export type WORKFLOW_STATES =
  | "IN_PROGRESS"
  | "PENDING_APPROVAL"
  | "REJECTED"
  | "READY";

export interface Content<Data extends object = object, PageConfig extends object = object, XData extends object = object> {
  readonly _id: string;
  readonly _name: string;
  readonly _path: string;
  readonly creator: string;
  readonly modifier: string;
  readonly createdTime: string;
  readonly modifiedTime: string;
  readonly owner: string;
  readonly type: string;
  readonly displayName: string;
  readonly hasChildren: boolean;
  readonly language?: string;
  readonly valid: boolean;
  readonly childOrder: string;
  readonly data: Data;
  readonly x: Record<string, Record<string, XData>>;
  readonly page: Page<PageConfig>;
  readonly attachments: Attachments;
  readonly publish?: ScheduleParams;
  readonly workflow: {
    state: WORKFLOW_STATES,
    checks: Record<string, WORKFLOW_STATES>
  }
}

/**
 * Implements the "data" of type "base:shortcut"
 */
export interface BaseShortcut {
  readonly target: string;
  readonly parameters?: ReadonlyArray<BaseShortcutParameter> | BaseShortcutParameter;
}

export interface BaseShortcutParameter {
  readonly name: string;
  readonly value: string;
}

/**
 * Implements the "data" of type "base:media"
 */
export interface BaseMedia<Media extends object = BaseMediaConfig> {
  readonly media: Media;
  readonly caption?: string;
  readonly artist?: string | ReadonlyArray<string>;
  readonly copyright?: string;
  readonly tags?: string | ReadonlyArray<string>;
}

export interface BaseMediaConfig {
  readonly attachment: string;
}

/**
 * Implements the "data" of type "media:image"
 */
export interface MediaImage extends BaseMedia<ImageConfig> {
  readonly altText?: string;
}

// Image is alias for MediaImage
export type Image = MediaImage;

export interface ImageConfig {
  readonly attachment: string;
  readonly focalPoint: {
    readonly x: number;
    readonly y: number;
  };
  readonly zoomPosition: {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
  },
  readonly cropPosition: {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    readonly zoom: number;
  }
}

export interface Page<Config> {
  readonly type: string;
  readonly path: string;
  readonly descriptor: string;
  readonly config: Config;
  readonly regions: Record<string, Region>;
}

export interface Attachment {
  readonly name: string;
  readonly label?: string;
  readonly size: number;
  readonly mimeType: string;
}

export interface Attachments {
  readonly [key: string]: Attachment;
}

export interface QueryContentParams<AggregationKeys extends string = never> {
  readonly start?: number;
  readonly count: number;
  readonly query?: string;
  readonly filters?: BasicFilters | BooleanFilter;
  readonly aggregations?: Record<AggregationKeys, Aggregation>;
  readonly contentTypes?: ReadonlyArray<string>;
  readonly highlight?: Highlight;
}

export interface ExistsFilter {
  readonly exists: {
    readonly field: string;
  };
}

export interface NotExistsFilter {
  readonly notExists: {
    readonly field: string;
  };
}

export interface HasValueFilter {
  readonly hasValue: {
    readonly field: string;
    readonly values: ReadonlyArray<unknown>;
  };
}

export interface IdsFilter {
  readonly ids: {
    readonly values: ReadonlyArray<string>;
  },
}

export type BasicFilters =
  | ExistsFilter
  | NotExistsFilter
  | HasValueFilter
  | IdsFilter;

export interface BooleanFilter {
  readonly boolean: {
    readonly must?: BasicFilters | ReadonlyArray<BasicFilters>;
    readonly mustNot?: BasicFilters | ReadonlyArray<BasicFilters>;
    readonly should?: BasicFilters | ReadonlyArray<BasicFilters>;
  }
}

export type QueryContentParamsWithSort<AggregationKeys extends string = never> = QueryContentParams<AggregationKeys> & {
  readonly sort: string;
}

export interface QueryResponse<Data extends object, AggregationKeys extends string = never, QueryMetaData extends QueryResponseMetaDataSort | QueryResponseMetaDataScore | {} = {}> {
  readonly count: number;
  readonly hits: ReadonlyArray<Content<Data, EmptyObject> & QueryMetaData>;
  readonly total: number;
  readonly aggregations: AggregationsResponse<AggregationKeys>;
  readonly highlight: HighlightResponse;
}

export interface QueryResponseMetaDataSort {
  readonly _score: null;
  readonly _sort: Array<string>;
}

export interface QueryResponseMetaDataScore {
  readonly _score: number;
}

export type Aggregation =
  | TermsAggregation
  | StatsAggregation
  | RangeAggregation
  | GeoDistanceAggregation
  | DateRangeAggregation
  | DateHistogramAggregation;

export interface TermsAggregation {
  terms: {
    field: string;
    order: string;
    size: number;
  };
  aggregations?: {
    [subaggregation: string]: Aggregation;
  };
}

export interface StatsAggregation {
  stats: {
    field: string;
    order: string;
    size: number;
  };
  aggregations?: {
    [subaggregation: string]: Aggregation;
  };
}

export interface RangeAggregation {
  range: {
    field: string;
    ranges?: Array<{
      from?: number;
      to?: number;
    }>;
    range?: {
      from: number;
      to: number;
    };
  };
  aggregations?: {
    [subaggregation: string]: Aggregation;
  };
}

export interface GeoDistanceAggregation {
  geoDistance: {
    field: string;
    ranges?: Array<{
      from?: number;
      to?: number;
    }>;
    range?: {
      from: number;
      to: number;
    };
    unit: string;
    origin: {
      lat: string;
      lon: string;
    };
  };
  aggregations?: {
    [subaggregation: string]: Aggregation;
  };
}

export interface DateRangeAggregation {
  dateRange: {
    field: string;
    format: string;
    ranges: Array<{
      from?: string;
      to?: string;
    }>;
  };
  aggregations?: {
    [subaggregation: string]: Aggregation;
  };
}

export interface DateHistogramAggregation {
  dateHistogram: {
    field: string;
    interval: string;
    minDocCount: number;
    format: string;
  };
  aggregations?: {
    [subaggregation: string]: Aggregation;
  };
}

export interface AggregationsResponseBucket {
  readonly docCount: number;
  readonly key: string;
  readonly from?: number | string;
  readonly to?: number | string;

  readonly [key2: string]: any; // sub aggregations
}

export interface AggregationsResponseEntry {
  readonly buckets: Array<AggregationsResponseBucket>;
}

export type AggregationsResponse<AggregationKeys extends string> = { [K in AggregationKeys]: AggregationsResponseEntry }

export interface Highlight {
  encoder?: 'default' | 'html';
  fragmenter?: 'simple' | 'span';
  fragmentSize?: number;
  numberOfFragments?: number;
  noMatchSize?: number;
  order?: 'score' | 'none';
  preTag?: string;
  postTag?: string;
  requireFieldMatch?: boolean;
  tagsSchema?: string;
  properties: Record<string, Highlight>;
}

export interface HighlightResponse {
  readonly [uuid: string]: {
    [name: string]: ReadonlyArray<string>;
  } | undefined;
}

export interface GetContentParams {
  readonly key: string;
  readonly versionId?: string;
}

export interface DeleteContentParams {
  readonly key: string;
}

export interface ExistsParams {
  readonly key: string;
}

export interface CreateContentParams<Data> {
  /**
   * Name of content
   *
   * The parameter name is optional, but if it is not set then displayName must be specified.
   * When name is not set, the system will auto-generate a name based on the displayName,
   * by lower-casing and replacing certain characters. If there is already a content with the
   * auto-generated name, a suffix will be added to the name in order to make it unique.
   */
  readonly name?: string;

  /**
   * Path to place content under
   */
  readonly parentPath: string;

  /**
   * Display name. Default is same as name
   */
  readonly displayName?: string;

  /**
   * The content has to be valid, according to the content type, to be created.
   * If requireValid=true and the content is not strictly valid, an error will be thrown
   */
  readonly requireValid?: boolean;

  /**
   * If refresh is true, the created content will to be searchable through queries immediately,
   * else within 1 second. Since there is a performance penalty doing this refresh,
   * refresh should be set to false for bulk operations
   */
  readonly refresh?: boolean;

  /**
   * Content type to use
   */
  readonly contentType: string;

  /**
   * The language tag representing the content’s locale
   */
  readonly language?: string;

  /**
   * Default ordering of children when doing getChildren if no order is given in query
   */
  readonly childOrder?: string;

  /**
   * Actual content data
   */
  readonly data: Data;

  /**
   * eXtra data to use
   */
  readonly x?: Record<string, any>;
}

export interface ModifyContentParams<Data extends object, PageConfig extends object = object, XData extends object = object> {
  /**
   * Path or id to the content
   */
  readonly key: string;

  /**
   * Editor callback function
   */
  readonly editor: (c: Content<Data, PageConfig, XData>) => Content<Data, PageConfig, XData>;

  /**
   * The content has to be valid, according to the content type, to be updated.
   * If requireValid=true and the content is not strictly valid, an error will be thrown
   */
  readonly requireValid?: boolean;
}

export interface PublishContentParams {
  readonly keys: ReadonlyArray<string>;
  readonly sourceBranch: string;
  readonly targetBranch: string;
  readonly schedule?: ScheduleParams;
  readonly excludeChildrenIds?: ReadonlyArray<string>;
  readonly includeDependencies?: boolean;
}

export interface ScheduleParams {
  readonly from?: string;
  readonly to?: string;
  readonly first?: string;
}

export interface PublishResponse {
  readonly pushedContents: ReadonlyArray<string>;
  readonly deletedContents: ReadonlyArray<string>;
  readonly failedContents: ReadonlyArray<string>;
}

export interface UnpublishContentParams {
  readonly keys: ReadonlyArray<string>;
}

export interface GetChildrenParams {
  readonly key: string;
  readonly count: number;
  readonly start?: number;
  readonly sort?: string;
}

export interface GetOutboundDependenciesParams {
  /**
   * Path or id to the content
   */
  readonly key: string;
}

export interface MoveParams {
  readonly source: string;
  readonly target: string;
}

export interface GetSiteParams {
  readonly key: string;
}

export interface Site<Config extends object, PageConfig extends object = never, XData extends object = object> {
  readonly _id: string;
  readonly _name: string;
  readonly _path: string;
  readonly type: string;
  readonly hasChildren: boolean;
  readonly valid: boolean;
  readonly data: {
    readonly siteConfig: SiteConfig<Config> | ReadonlyArray<SiteConfig<Config>>;
  };
  readonly x: Record<string, Record<string, XData>>;
  readonly page: Page<PageConfig>;
  readonly attachments: object;
  readonly publish: ScheduleParams;
}

export interface SiteConfig<Config> {
  readonly applicationKey: string;
  readonly config: Config;
}

export interface GetSiteConfigParams {
  readonly key: string;
  readonly applicationKey: string;
}

export interface AttachmentStreamParams {
  readonly key: string;
  readonly name: string;
}

export interface RemoveAttachmentParams {
  readonly key: string;
  readonly name: string | ReadonlyArray<string>;
}

// com.google.common.io.ByteSource
export interface ByteSource {
  isEmpty(): boolean;
  size(): number;
}

export interface CreateMediaParams {
  readonly name: string;
  readonly parentPath: string;
  readonly mimeType?: string;
  readonly focalX?: number;
  readonly focalY?: number;
  readonly data: ByteSource;
}

export interface AddAttachmentParams {
  readonly key: string;
  readonly name: string;
  readonly mimeType: string;
  readonly label?: string;
  readonly data?: ByteSource;
}

export interface GetPermissionsParams {
  readonly key: string;
}

export interface GetPermissionsResult {
  readonly inheritsPermissions: boolean;
  readonly permissions: ReadonlyArray<PermissionsParams>;
}

/**
 * From enum "com.enonic.xp.security.acl.Permission"
 */
export type Permission =
  | "READ"
  | "CREATE"
  | "MODIFY"
  | "DELETE"
  | "PUBLISH"
  | "READ_PERMISSIONS"
  | "WRITE_PERMISSIONS";

export interface PermissionsParams {
  readonly principal: string;
  readonly allow: ReadonlyArray<Permission>;
  readonly deny: ReadonlyArray<Permission>;
}

export interface SetPermissionsParams {
  readonly key: string;
  readonly inheritPermissions: boolean;
  readonly overwriteChildPermissions: boolean;
  readonly permissions: ReadonlyArray<PermissionsParams>;
}

export interface IconType {
  readonly data?: ByteSource;
  readonly mimeType?: string;
  readonly modifiedTime?: string;
}

export interface ContentType {
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly superType: string;
  readonly abstract: boolean;
  readonly final: boolean;
  readonly allowChildContent: boolean;
  readonly displayNameExpression: string;
  readonly icon: ReadonlyArray<IconType>;
  readonly form: ReadonlyArray<FormItem>;
}

export type InputType =
  | "Time"
  | "DateTime"
  | "CheckBox"
  | "ComboBox"
  | "Long"
  | "Double"
  | "RadioButton"
  | "TextArea"
  | "ContentTypeFilter"
  | "GeoPoint"
  | "TextLine"
  | "Tag"
  | "CustomSelector"
  | "AttachmentUploader"
  | "ContentSelector"
  | "MediaSelector"
  | "ImageSelector"
  | "HtmlArea";

export type FormItemType =
  | "Input"
  | "ItemSet"
  | "Layout"
  | "OptionSet";

export interface FormItem<Config = unknown> {
  readonly formItemType: FormItemType | string;
  readonly name: string,
  readonly label: string,
  readonly maximize: boolean,
  readonly inputType: InputType,
  readonly occurrences: {
    readonly maximum: 1,
    readonly minimum: 1
  },
  readonly config: Config;
}
