import { ByteSource, Content, Site } from "./content";

export interface Component<A> {
  readonly path: string;
  readonly type: string;
  readonly descriptor: string;
  readonly config: A;
  readonly regions: {
    [key: string]: {
      components: Array<Component<any>>;
      name: string;
    };
  };
}

export interface PortalLibrary {
  getComponent<A>():  Component<A> | null;
  getContent<A>(): Content<A> | null;
  getIdProviderKey(): string | null;

  /**
   * This function returns a JSON containing multipart items.
   */
  getMultipartForm(): ReadonlyArray<MultipartItem | ReadonlyArray<MultipartItem>>;

  /**
   * This function returns a JSON containing a named multipart item.
   */
  getMultipartItem(name: string, index: number): MultipartItem | null;

  /**
   * This function returns a data-stream for a named multipart item.
   */
  getMultipartStream(name: string, index: number): ByteSource | null;

  /**
   * This function returns the multipart item data as text.
   */
  getMultipartText(name: string, index: number): string | null;

  getSite<A>(): Site<A>;
  getSiteConfig<A>(): A;
  idProviderUrl(params: IdProviderUrlParams): string;
  imagePlaceholder(params: ImagePlaceHolderParams): string;
  assetUrl(params: AssetUrlParams): string;
  attachmentUrl(params: AttachmentUrlParams): string;
  componentUrl(params: ComponentUrlParams): string;
  serviceUrl(params: ServiceUrlParams): string;
  imageUrl(params: ImageUrlParams): string;
  loginUrl(params: LoginUrlParams): string;
  logoutUrl(params: LogoutUrlParams): string;
  pageUrl(params: PageUrlParams): string;
  url(params: UrlParams): string;
  processHtml(params: ProcessHtmlParams): string;
  sanitizeHtml(html: string): string;
}

export interface IdProviderUrlParams {
  readonly idProvider?: string;
  readonly contextPath?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface ImagePlaceHolderParams {
  readonly width: number;
  readonly height: number;
}

export interface AssetUrlParams {
  readonly path: string;
  readonly application?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface AttachmentUrlParams {
  readonly id?: string;
  readonly path?: string;
  readonly name?: string;
  readonly label?: string; // source
  readonly download?: boolean;
  readonly params?: { readonly [key: string]: string };
  readonly type?: "server" | "absolute";
}

export interface ComponentUrlParams {
  readonly id?: string;
  readonly path?: string;
  readonly component?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface ImageUrlParams {
  readonly id?: string;
  readonly path?: string;
  readonly scale: string;
  readonly quality?: number;
  readonly background?: string;
  readonly format?: string;
  readonly filter?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface PageUrlParams {
  readonly id?: string;
  readonly path?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface LoginUrlParams {
  readonly idProvider?: string;
  readonly redirect?: string;
  readonly contextPath?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface LogoutUrlParams {
  readonly redirect?: string;
  readonly contextPath?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface ServiceUrlParams {
  readonly service: string;
  readonly application?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface UrlParams {
  readonly path?: string;
  readonly type?: "server" | "absolute";
  readonly params?: { readonly [key: string]: string };
}

export interface ProcessHtmlParams {
  readonly value: string;
  readonly type?: "server" | "absolute";
}

export interface MultipartItem {
  readonly name: string;
  readonly fileName: string;
  readonly contentType: string;
  readonly size: number;
}
