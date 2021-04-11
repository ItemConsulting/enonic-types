import { ByteSource, Content, Site } from "./content";
import {XOR} from "./types";

export type Params = { readonly [key: string]: string | ReadonlyArray<string> | undefined };

export interface Component<Config> {
  readonly path: string;
  readonly type: string;
  readonly descriptor: string;
  readonly config: Config;
  readonly regions?: Record<string, Region>;
}

export interface Region {
  components: Array<Component<any>>;
  name: string;
}

export interface ByKey {
  readonly key: string;
}

export interface ByPath {
  readonly path: string;
}

export interface ById {
  readonly id: string;
}

interface ByComponent {
  readonly component?: string;
}

export interface PortalLibrary {
  /**
   * This function returns the component corresponding to the current execution context. It is meant to be called
   * from a layout or part controller.
   */
  getComponent<Config extends object = never>(): Component<Config>;

  /**
   * his function returns the content corresponding to the current execution context. It is meant to be called from a
   * page, layout or part controller
   */
  getContent<Data extends object, PageConfig extends object = never>(): Content<Data, PageConfig>;

  /**
   * This function returns the id provider key corresponding to the current execution context.
   */
  getIdProviderKey(): string | null;

  /**
   * This function returns a JSON containing multipart items.
   */
  getMultipartForm(): ReadonlyArray<MultipartItem | ReadonlyArray<MultipartItem>>;

  /**
   * This function returns a JSON containing a named multipart item.
   */
  getMultipartItem(name: string, index?: number): MultipartItem | undefined;

  /**
   * This function returns a data-stream for a named multipart item.
   */
  getMultipartStream(name: string, index?: number): ByteSource | undefined;

  /**
   * This function returns the multipart item data as text.
   */
  getMultipartText(name: string, index?: number): string | undefined;

  /**
   * This function returns the parent site of the content corresponding to the current execution context. It is meant
   * to be called from a page, layout or part controller.
   */
  getSite<Config extends object>(): Site<Config>;

  /**
   * This function returns the site configuration for this app in the parent site of the content corresponding to the
   * current execution context. It is meant to be called from a page, layout or part controller.
   */
  getSiteConfig<Config>(): Config;

  /**
   * This function generates a URL pointing to an ID provider.
   */
  idProviderUrl(params: IdProviderUrlParams): string;

  /**
   * This function generates a URL to an image placeholder.
   */
  imagePlaceholder(params: ImagePlaceHolderParams): string;

  /**
   * This function generates a URL pointing to a static file.
   */
  assetUrl(params: AssetUrlParams): string;

  /**
   * This function generates a URL pointing to an attachment.
   */
  attachmentUrl(params: AttachmentUrlParams): string;

  /**
   * This function generates a URL pointing to a component.
   */
  componentUrl(params: ComponentUrlParams): string;

  /**
   * This function generates a URL pointing to a service.
   */
  serviceUrl(params: ServiceUrlParams): string;

  /**
   * This function generates a URL pointing to an image.
   */
  imageUrl(params: ImageUrlParams): string;

  /**
   * This function generates a URL pointing to the login function of an ID provider.
   */
  loginUrl(params: LoginUrlParams): string;

  /**
   * This function generates a URL pointing to the logout function of the application corresponding to the current user.
   */
  logoutUrl(params: LogoutUrlParams): string;

  /**
   * This function generates a URL pointing to a page.
   */
  pageUrl(params: PageUrlParams): string;

  /**
   * This function generates a URL.
   */
  url(params: UrlParams): string;

  /**
   * This function replaces abstract internal links contained in an HTML text by generated URLs.
   *
   * When outputting processed HTML in Thymeleaf, use attribute `data-th-utext="${processedHtml}"`.
   */
  processHtml(params: ProcessHtmlParams): string;

  /**
   * This function sanitizes an HTML string by stripping all potentially unsafe tags and attributes.
   *
   * HTML sanitization can be used to protect against cross-site scripting (XSS) attacks by sanitizing any HTML code
   * submitted by a user.
   */
  sanitizeHtml(html: string): string;
}

export interface IdProviderUrlParams {
  readonly idProvider?: string;
  readonly contextPath?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export interface ImagePlaceHolderParams {
  readonly width: number;
  readonly height: number;
}

export interface AssetUrlParams {
  readonly path: string;
  readonly application?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export type AttachmentUrlParams = XOR<ById, ByPath> & {
  readonly name?: string;
  readonly label?: string; // source
  readonly download?: boolean;
  readonly params?: Params;
  readonly type?: "server" | "absolute";
}

export declare type ComponentUrlParams = XOR<ByComponent, XOR<ById, ByPath>> & {
  readonly type?: "server" | "absolute";
  readonly params?: Params;
};

export type ImageScale =
  | `block(${number},${'' | ' '}${number})`
  | `height(${number})`
  | `max(${number})`
  | `square(${number})`
  | `wide(${number},${'' | ' '}${number})`
  | `width(${number})`;

export type ImageUrlParams = XOR<ById, ByPath> & {
  readonly scale: ImageScale;
  readonly quality?: number;
  readonly background?: string;
  readonly format?: string;
  readonly filter?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export type PageUrlParams = XOR<ById, ByPath> & {
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export interface LoginUrlParams {
  readonly idProvider?: string;
  readonly redirect?: string;
  readonly contextPath?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export interface LogoutUrlParams {
  readonly redirect?: string;
  readonly contextPath?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export interface ServiceUrlParams {
  readonly service: string;
  readonly application?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export interface UrlParams {
  readonly path?: string;
  readonly type?: "server" | "absolute";
  readonly params?: Params;
}

export interface ProcessHtmlParams {
  readonly value: string;
  readonly type?: "server" | "absolute";
}

export interface MultipartItem {
  readonly name: string;
  readonly fileName?: string;
  readonly contentType?: string;
  readonly size: number;
}
