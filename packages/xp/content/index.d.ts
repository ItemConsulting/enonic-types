import type { ByteSource } from "@item-enonic-types/utils";
import type {
  ContentTypeByName,
  KeyOfContentType,
  LiteralContentTypeNames,
  WrapDataInContent,
} from "@item-enonic-types/utils/content";
import type { Component } from "@enonic-types/lib-portal";
import type {
  Content as OriginalContent,
  GetAttachmentStreamParams,
  GetContentParams,
  AddAttachmentParam as OriginalAddAttachmentParam,
  GetSiteParams,
  GetSiteConfigParams,
  GetChildContentParams,
  ContentsResult as OriginalContentsResult,
  CreateContentParams as OriginalCreateContentParams,
  QueryContentParams as OriginalQueryContentParams,
  ModifyContentParams as OriginalModifyContentParams,
  CreateMediaParams as OriginalCreateMediaParams,
  MoveContentParams,
} from "@enonic-types/lib-content";

export {
  getAttachments,
  removeAttachment,
  publish,
  unpublish,
  exists,
  archive,
  restore,
  setPermissions,
  getPermissions,
  getType,
  getTypes,
  getOutboundDependencies,
  resetInheritance,
} from "@enonic-types/lib-content";
import { delete as _delete } from "@enonic-types/lib-content";
export { _delete as delete };

declare global {
  namespace XP {
    interface ContentTypes {
      "base:unstructured": BaseUnstructured;
      "base:structured": BaseStructured;
      "base:folder": BaseFolder;
      "base:shortcut": BaseShortcut;
      "base:media": BaseMedia<"base_Media_Data">;
      "media:audio": BaseMedia<"media_Audio_Data">;
      "media:text": BaseMedia<"media_Text_Data">;
      "media:data": BaseMedia<"media_Data_Data">;
      "media:video": BaseMedia<"media_Video_Data">;
      "media:image": MediaImage;
      "media:vector": BaseMedia<"media_Vector_Data">;
      "media:archive": BaseMedia<"media_Archive_Data">;
      "media:document": BaseMedia<"media_Document_Data">;
      "media:spreadsheet": BaseMedia<"media_Spreadsheet_Data">;
      "media:presentation": BaseMedia<"media_Presentation_Data">;
      "media:code": BaseMedia<"media_Code_Data">;
      "media:executable": BaseMedia<"media_Executable_Data">;
      "portal:site": SiteData;
    }

    interface SiteConfig {}

    interface XData {
      media?: {
        imageInfo?: {
          imageHeight: number;
          imageWidth: number;
          contentType: string;
          pixelSize: number;
          byteSize: number;
        };
      };
    }
  }
}

export type Content<Data = Record<string, unknown>, Type extends string = string> = Omit<
  OriginalContent,
  "type" | "data" | "x"
> & {
  data: Data;
  type: Type;
  page: Component;
  x: XP.XData;
};

/**
 * This function fetches a content.
 *
 * @example-ref examples/content/get.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.key Path or id to the content.
 * @param {string} [params.versionId] Version Id of the content.
 *
 * @returns {object} The content (as JSON) fetched from the repository.
 */
export function get<Data = Record<string, unknown>>(params: GetContentParams): WrapDataInContent<Data> | null;

/**
 * This function returns a data-stream for the specified content attachment.
 *
 * @example-ref examples/content/getAttachmentStream.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.key Path or id to the content.
 * @param {string} params.name Attachment name.
 *
 * @returns {*} Stream of the attachment data.
 */
export function getAttachmentStream(params: GetAttachmentStreamParams): ByteSource | null;

export type AddAttachmentParam = Omit<OriginalAddAttachmentParam, "data"> & {
  data?: ByteSource;
};

export type Site = Content<SiteData>;

export type SiteData = {
  __typename?: "portal_Site_Data";
  description?: string;
  siteConfig: SiteDataSiteConfig | Array<SiteDataSiteConfig>;
};

export interface SiteDataSiteConfig {
  applicationKey: string;
  config: XP.SiteConfig;
}

/**
 * This function returns the parent site of a content.
 *
 * @example-ref examples/content/getSite.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.key Path or id to the content.
 *
 * @returns {object} The current site as JSON.
 */
export function getSite(params: GetSiteParams): Site;

/**
 * This function returns the site configuration for this app in the parent site of a content.
 *
 * @example-ref examples/content/getSiteConfig.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.key Path or id to the content.
 * @param {string} params.applicationKey Application key.
 *
 * @returns {object} The site configuration for current application as JSON.
 */
export function getSiteConfig(params: GetSiteConfigParams): XP.SiteConfig;

export type ContentsResult<Data> = Omit<OriginalContentsResult, "hits"> & {
  hits: Array<WrapDataInContent<Data>>;
};

/**
 * This function fetches children of a content.
 *
 * @example-ref examples/content/getChildren.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.key Path or id to the parent content.
 * @param {number} [params.start=0] Start index (used for paging).
 * @param {number} [params.count=10] Number of contents to fetch.
 * @param {string} [params.sort] Sorting expression.
 *
 * @returns {Object} Result (of content) fetched from the repository.
 */
export function getChildren<Data>(params: GetChildContentParams): ContentsResult<Data>;

export type CreateContentParams<Data, ContentType extends LiteralContentTypeNames> = Omit<
  OriginalCreateContentParams,
  "contentType" | "data" | "x"
> & {
  contentType: ContentType;
  data: ContentTypeByName<ContentType, Data>;
  x?: XP.XData;
};

/**
 * This function creates a content.
 *
 * The parameter `name` is optional, but if it is not set then `displayName` must be specified. When name is not set, the
 * system will auto-generate a `name` based on the `displayName`, by lower-casing and replacing certain characters. If there
 * is already a content with the auto-generated name, a suffix will be added to the `name` in order to make it unique.
 *
 * To create a content where the name is not important and there could be multiple instances under the same parent content,
 * skip the `name` parameter and specify a `displayName`.
 *
 * @example-ref examples/content/create.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} [params.name] Name of content.
 * @param {string} params.parentPath Path to place content under.
 * @param {string} [params.displayName] Display name. Default is same as `name`.
 * @param {boolean} [params.requireValid=true] The content has to be valid, according to the content type, to be created. If requireValid=true and the content is not strictly valid, an error will be thrown.
 * @param {boolean} [params.refresh=true] If refresh is true, the created content will to be searchable through queries immediately, else within 1 second. Since there is a performance penalty doing this refresh, refresh should be set to false for bulk operations.
 * @param {string} params.contentType Content type to use.
 * @param {string} [params.language] The language tag representing the content’s locale.
 * @param {string} [params.childOrder] Default ordering of children when doing getChildren if no order is given in query
 * @param {object} params.data Actual content data.
 * @param {object} [params.x] eXtra data to use.
 * @param {object} [params.workflow] Workflow information to use. Default has state READY and empty check list.
 *
 * @returns {object} Content created as JSON.
 */
export function create<Data = Record<string, unknown>, ContentType extends string = KeyOfContentType<Data>>(
  params: CreateContentParams<Data, ContentType>
): Content<ContentTypeByName<ContentType, Data>, ContentType>;

export type QueryContentParams<ContentTypeName extends LiteralContentTypeNames> = Omit<
  OriginalQueryContentParams,
  "contentTypes"
> & {
  contentTypes?: Array<ContentTypeName>;
};

/**
 * This command queries content.
 *
 * @example-ref examples/content/query.js
 *
 * @param {object} params JSON with the parameters.
 * @param {number} [params.start=0] Start index (used for paging).
 * @param {number} [params.count=10] Number of contents to fetch.
 * @param {string|object} params.query Query expression.
 * @param {object|object[]} [params.filters] Filters to apply to query result
 * @param {string|object|object[]} [params.sort] Sorting expression.
 * @param {object} [params.aggregations] Aggregations expression.
 * @param {string[]} [params.contentTypes] Content types to filter on.
 *
 * @returns {object} Result of query.
 */
export function query<Data, ContentTypeName extends LiteralContentTypeNames = KeyOfContentType<Data>>(
  params: QueryContentParams<ContentTypeName>
): ContentsResult<ContentTypeByName<ContentTypeName, Data>>;

export type ModifyContentParams<Data> = Omit<OriginalModifyContentParams, "editor"> & {
  editor: (c: Content<Data>) => Content<Data>;
};

/**
 * This function modifies a content.
 *
 * @example-ref examples/content/modify.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.key Path or id to the content.
 * @param {function} params.editor Editor callback function.
 * @param {boolean} [params.requireValid=true] The content has to be valid, according to the content type, to be updated. If requireValid=true and the content is not strictly valid, an error will be thrown.
 *
 * @returns {object} Modified content as JSON.
 */
export function modify<Data>(params: ModifyContentParams<Data>): Content<Data> | null;

export type CreateMediaParams = Omit<OriginalCreateMediaParams, "focalX" | "focalY" | "data"> & {
  data: ByteSource;
};

export type CreateMediaImageParams = CreateMediaParams & {
  focalX: number;
  focalY: number;
};

/**
 * Creates a media content.
 *
 * @example-ref examples/content/createMedia.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.name Name of content.
 * @param {string} [params.parentPath=/] Path to place content under.
 * @param {string} [params.mimeType] Mime-type of the data.
 * @param {number} [params.focalX] Focal point for X axis (if it's an image).
 * @param {number} [params.focalY] Focal point for Y axis (if it's an image).
 * @param  params.data Data (as stream) to use.
 *
 * @returns {object} Returns the created media content.
 */
export function createMedia<Data = MediaImage>(params: CreateMediaImageParams): Content<Data>;
export function createMedia<Data>(params: CreateMediaParams): Content<Data>;

/**
 * Rename a content or move it to a new path.
 *
 * @example-ref examples/content/move.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.source Path or id of the content to be moved or renamed.
 * @param {string} params.target New path or name for the content. If the target ends in slash '/', it specifies the parent path where to be moved. Otherwise it means the new desired path or name for the content.
 *
 * @returns {object} The content that was moved or renamed.
 */
export function move<Data>(params: MoveContentParams): Content<Data>;

export function addAttachment(params: AddAttachmentParam): void;

/**
 * Implements the "data" of type "base:shortcut"
 */
export interface BaseShortcut {
  __typename?: "base_Shortcut_Data";
  target: string;
  parameters?: Array<BaseShortcutParameter> | BaseShortcutParameter;
}

export interface BaseShortcutParameter {
  name: string;
  value: string;
}

/**
 * Implements the "data" of type "base:unstructured"
 */
export interface BaseUnstructured {
  __typename?: "base_Unstructured_Data";
}

/**
 * Implements the "data" of type "base:structured"
 */
export interface BaseStructured {
  __typename?: "base_Structured_Data";
}

/**
 * Implements the "data" of type "base:folder"
 */
export interface BaseFolder {
  __typename?: "base_Folder_Data";
}

/**
 * Implements the "data" of type "base:media"
 */
export interface BaseMedia<TypeName extends string, Media extends object = BaseMediaConfig> {
  __typename?: TypeName;
  media: Media;
  caption?: string;
  artist?: string | Array<string>;
  copyright?: string;
  tags?: string | Array<string>;
}

export interface BaseMediaConfig {
  attachment: string;
}

/**
 * Implements the "data" of type "media:image"
 */
export interface MediaImage extends BaseMedia<"media_Image_Data", ImageConfig> {
  altText?: string;
}

export interface ImageConfig {
  attachment: string;
  focalPoint: {
    x: number;
    y: number;
  };
  zoomPosition: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  cropPosition: {
    left: number;
    top: number;
    right: number;
    bottom: number;
    zoom: number;
  };
}

export interface MediaImageXData {
  media: {
    imageInfo: {
      imageHeight: number;
      imageWidth: number;
      contentType: string;
      colorSpace: string;
      pixelSize: number;
      byteSize: number;
      description: string;
      fileSource: string;
    };
    cameraInfo: {
      make: string;
      model: string;
      lens: string;
      iso: string;
      focalLength: string;
      focalLength35: string;
      exposureBias: string;
      aperture: string;
      shutterTime: string;
      flash: string;
      autoFlashCompensation: string;
      whiteBalance: string;
      exposureProgram: string;
      shootingMode: string;
      meteringMode: string;
      exposureMode: string;
      focusDistance: string;
      orientation: string;
    };
  };
}
