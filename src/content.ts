import {Component} from "./portal";

export interface ContentLibrary {
  get<A>(params: GetContentParams): Content<A, never> | null;
  query<A>(params: QueryContentParams): QueryResponse<A>;
  create<A>(params: CreateContentParams<A>): Content<A>;
  modify<A>(params: ModifyContentParams<A>): Content<A>;
  delete(params: DeleteContentParams): boolean;
  publish(params: PublishContentParams): PublishResponse;
  unpublish(params: UnpublishContentParams): ReadonlyArray<string>;
  getChildren<A>(params: GetChildrenParams): QueryResponse<A>;
  move<A>(params: MoveParams): Content<A>;
  getSite<A, PageConfig = never>(params: GetSiteParams): Site<A, PageConfig>;
  getSiteConfig<A>(params: GetSiteConfigParams): A;
  createMedia<A>(params: CreateMediaParams): Content<A>;
  getAttachments(key: string): Attachments | null;
  getAttachmentStream(params: AttachmentStreamParams): ByteSource | null;
  removeAttachment(params: RemoveAttachmentParams): void;
  getPermissions(params: GetPermissionsParams): GetPermissionsResult;
  setPermissions(params: SetPermissionsParams): GetPermissionsResult;
  getType(name: string): ContentType | null;
  getTypes(): ReadonlyArray<ContentType>;
}

export interface Content<A, PageConfig = never> {
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
  readonly language: string;
  readonly valid: boolean;
  readonly childOrder: string;
  readonly data: A;
  readonly x: { readonly [key: string]: string };
  readonly page: Page<PageConfig>;
  readonly attachments: Attachments;
  readonly publish?: ScheduleParams;
}

export interface Page<A> {
  readonly type: string;
  readonly path: string;
  readonly descriptor: string;
  readonly config: A;
  readonly regions: {
    [key: string]: Array<Component<any>>;
  };
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

export interface QueryContentParams {
  readonly start?: number;
  readonly count: number;
  readonly query: string;
  readonly filters?: object;
  readonly sort?: string;
  readonly aggregations?: string;
  readonly contentTypes?: ReadonlyArray<string>;
}

export interface QueryResponse<A> {
  readonly aggregations: object;
  readonly count: number;
  readonly hits: ReadonlyArray<Content<A>>;
  readonly total: number;
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

export interface ModifyContentParams<A> {
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

export interface Site<A, PageConfig = never> {
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
