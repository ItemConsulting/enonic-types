import {Region} from "./portal";

export interface ContentLibrary {
  get<A extends object, PageConfig extends object = never>(params: GetContentParams): Content<A, PageConfig> | null;
  query<A extends object, B extends string = never>(params: QueryContentParams<B>): QueryResponse<A, B>;
  create<A extends object>(params: CreateContentParams<A>): Content<A>;
  modify<A extends object>(params: ModifyContentParams<A>): Content<A>;
  delete(params: DeleteContentParams): boolean;
  publish(params: PublishContentParams): PublishResponse;
  unpublish(params: UnpublishContentParams): ReadonlyArray<string>;
  getChildren<A extends object>(params: GetChildrenParams): QueryResponse<A>;
  move<A extends object>(params: MoveParams): Content<A>;
  getSite<A extends object, PageConfig extends object = never>(params: GetSiteParams): Site<A, PageConfig>;
  getSiteConfig<A extends object>(params: GetSiteConfigParams): A;
  createMedia<A extends object>(params: CreateMediaParams): Content<A>;
  getAttachments(key: string): Attachments | null;
  getAttachmentStream(params: AttachmentStreamParams): ByteSource | null;
  removeAttachment(params: RemoveAttachmentParams): void;
  getPermissions(params: GetPermissionsParams): GetPermissionsResult;
  setPermissions(params: SetPermissionsParams): GetPermissionsResult;
  getType(name: string): ContentType | null;
  getTypes(): ReadonlyArray<ContentType>;
}

export interface Content<A extends object = object, PageConfig extends object = object> {
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
  readonly data: A;
  readonly x: { readonly [key: string]: string };
  readonly page: Page<PageConfig>;
  readonly attachments: Attachments;
  readonly publish?: ScheduleParams;
}

export interface Image {
  readonly media: {
    readonly attachment: string;
    readonly focalPoint: {
      readonly x: number;
      readonly y: number;
    };
  };
  readonly caption?: string;
  readonly artist?: string | ReadonlyArray<string>;
  readonly copyright?: string;
  readonly tags?: string | ReadonlyArray<string>;
  readonly altText?: string;
}

export interface Page<A> {
  readonly type: string;
  readonly path: string;
  readonly descriptor: string;
  readonly config: A;
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

export interface QueryContentParams<B extends string = never> {
  readonly start?: number;
  readonly count: number;
  readonly query: string;
  readonly filters?: object;
  readonly sort?: string;
  readonly aggregations?: Record<B, Aggregation>;
  readonly contentTypes?: ReadonlyArray<string>;
  readonly highlight?: Highlight;
}

export interface QueryResponse<A extends object, B extends string = never> {
  readonly count: number;
  readonly hits: ReadonlyArray<Content<A>>;
  readonly total: number;
  readonly aggregations: AggregationsResponse<B>;
  readonly highlight: HighlightResponse;
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

export type AggregationsResponse<B extends string = string> = { [K in B]: AggregationsResponseEntry }

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
}

export interface DeleteContentParams {
  readonly key: string;
}

export interface CreateContentParams<A> {
  readonly name: string;
  readonly parentPath: string;
  readonly displayName?: string;
  readonly requireValid?: boolean;
  readonly refresh?: boolean;
  readonly contentType: string;
  readonly language?: string;
  readonly childOrder?: string;
  readonly data: A;
  readonly x?: string;
}

export interface ModifyContentParams<A extends object> {
  readonly key: string;
  readonly editor: (c: Content<A>) => Content<A>;
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

export interface MoveParams {
  readonly source: string;
  readonly target: string;
}

export interface GetSiteParams {
  readonly key: string;
}

export interface Site<A extends object, PageConfig extends object = never> {
  readonly _id: string;
  readonly _name: string;
  readonly _path: string;
  readonly type: string;
  readonly hasChildren: boolean;
  readonly valid: boolean;
  readonly data: {
    readonly siteConfig: SiteConfig<A>;
  };
  readonly x: { readonly [key: string]: string };
  readonly page: Page<PageConfig>;
  readonly attachments: object;
  readonly publish: ScheduleParams;
}

export interface SiteConfig<A> {
  readonly applicationKey: string;
  readonly config: A;
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

export interface GetPermissionsParams {
  readonly key: string;
}

export interface GetPermissionsResult {
  readonly inheritsPermissions: boolean;
  readonly permissions: ReadonlyArray<PermissionsParams>;
}

export interface PermissionsParams {
  readonly principal: string;
  readonly allow: ReadonlyArray<string>;
  readonly deny: ReadonlyArray<string>;
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
  readonly form: ReadonlyArray<any>;
}
