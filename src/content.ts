import {Region} from "./portal";

export interface ContentLibrary {
  get<Data extends object, PageConfig extends object = never, XData extends object = object>(params: GetContentParams): Content<Data, PageConfig, XData> | null;
  query<Data extends object, AggregationKeys extends string = never>(params: QueryContentParams<AggregationKeys>): QueryResponse<Data, AggregationKeys, QueryResponseMetaDataScore>;
  query<Data extends object, AggregationKeys extends string = never>(params: QueryContentParamsWithSort<AggregationKeys>): QueryResponse<Data, AggregationKeys, QueryResponseMetaDataSort>;
  create<Data extends object>(params: CreateContentParams<Data>): Content<Data>;
  modify<Data extends object, PageConfig extends object = object, XData extends object = object>(params: ModifyContentParams<Data, PageConfig, XData>): Content<Data, PageConfig, XData>;
  delete(params: DeleteContentParams): boolean;
  exists(params: ExistsParams): boolean;
  publish(params: PublishContentParams): PublishResponse;
  unpublish(params: UnpublishContentParams): ReadonlyArray<string>;
  getChildren<Data extends object>(params: GetChildrenParams): QueryResponse<Data>;
  getOutboundDependencies(params: GetOutboundDependenciesParams): ReadonlyArray<string>;
  move<Data extends object>(params: MoveParams): Content<Data>;
  getSite<Config extends object, PageConfig extends object = never>(params: GetSiteParams): Site<Config, PageConfig>;
  getSiteConfig<Config extends object>(params: GetSiteConfigParams): Config;
  createMedia<Data extends object>(params: CreateMediaParams): Content<Data>;
  addAttachment(params: AddAttachmentParams): void;
  getAttachments(key: string): Attachments | null;
  getAttachmentStream(params: AttachmentStreamParams): ByteSource | null;
  removeAttachment(params: RemoveAttachmentParams): void;

  /**
   * Resets custom inheritance flags of a content item. For an item that was inherited from a parent content
   * project/layer this action will reset specified changes made inside a specified layer.
   * @since 7.6.0
   */
  resetInheritance(params: ResetInheritanceParams): void;
  getPermissions(params: GetPermissionsParams): GetPermissionsResult;
  setPermissions(params: SetPermissionsParams): GetPermissionsResult;
  getType(name: string): ContentType | null;
  getTypes(): ReadonlyArray<ContentType>;
}

/**
 * Role that every user in the system has
 */
export const ROLE_SYSTEM_EVERYONE = "role:system.everyone";

/**
 * Role for authenticated users
 */
export const ROLE_SYSTEM_AUTHENTICATED = "role:system.authenticated";

/**
 * Role for administrators
 */
export const ROLE_SYSTEM_ADMIN = "role:system.admin";

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
  readonly query: string;
  readonly filters?: object;
  readonly aggregations?: Record<AggregationKeys, Aggregation>;
  readonly contentTypes?: ReadonlyArray<string>;
  readonly highlight?: Highlight;
}

export type QueryContentParamsWithSort<AggregationKeys extends string = never> = QueryContentParams<AggregationKeys> & {
  readonly sort: string;
}

export interface QueryResponse<Data extends object, AggregationKeys extends string = never, QueryMetaData extends QueryResponseMetaDataSort | QueryResponseMetaDataScore | {} = {}> {
  readonly count: number;
  readonly hits: ReadonlyArray<Content<Data> & QueryMetaData>;
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
  readonly name: string;
  readonly parentPath: string;
  readonly displayName?: string;
  readonly requireValid?: boolean;
  readonly refresh?: boolean;
  readonly contentType: string;
  readonly language?: string;
  readonly childOrder?: string;
  readonly data: Data;
  readonly x?: Record<string, any>;
}

export interface ModifyContentParams<Data extends object, PageConfig extends object = object, XData extends object = object> {
  readonly key: string;
  readonly editor: (c: Content<Data, PageConfig, XData>) => Content<Data, PageConfig, XData>;
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
  readonly start?: number;
  readonly count?: number;
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

export const ALL_PERMISSIONS: Array<Permission> = [
  "READ",
  "CREATE",
  "MODIFY",
  "DELETE",
  "PUBLISH",
  "READ_PERMISSIONS",
  "WRITE_PERMISSIONS"
];

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
