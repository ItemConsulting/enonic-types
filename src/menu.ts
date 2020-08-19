import {Content} from "./content";

export interface MenuLibrary {
  /**
   * Returns the full breadcrumb menu path for the current content and site.
   */
  getBreadcrumbMenu(params?: GetBreadcrumbMenuParams): BreadcrumbMenu;

  /**
   * Get menu tree
   */
  getMenuTree(levels: number, params?: GetMenuParams): ReadonlyArray<MenuItem>;

  /**
   * Returns submenus of a parent menuitem.
   */
  getSubMenus(parentContent: Content<any>, levels?: number, params?: GetMenuParams): ReadonlyArray<MenuItem>;
}

export interface GetBreadcrumbMenuParams {
  /**
   *  Wrap the active (current content) item with a link
   */
  readonly linkActiveItem?: boolean;

  /**
   * Disable return of item for the site homepage
   */
  readonly showHomepage?: boolean;

  /**
   * Customize (overwrite) the displayName of home/site link (if used). Common usage: "Home" or "Start".
   */
  readonly homepageTitle?: string;

  /**
   * Any custom html you want appended to each item, except the last one. Common usage: '<span class="divider">/</span>'.
   */
  readonly dividerHtml?: string;

  /**
   * Control type of URL to be generated for menu items, default is 'server', only other option is 'absolute'.
   */
  readonly urlType?: 'server' | 'absolute';
}

export interface BreadcrumbMenu {
  readonly divider: string | null;
  readonly items: ReadonlyArray<{
    readonly title: string;
    readonly text: string;
    readonly url: string;
    readonly active: boolean;
    readonly type: string;
  }>;
}

export interface GetMenuParams {
  /**
   * Control type of URL to be generated for menu items, default is 'server', only other option is 'absolute'.
   */
  readonly urlType?: 'server' | 'absolute';
}

export interface MenuItem {
  readonly title: string;
  readonly displayName: string;
  readonly menuName: string | null;
  readonly path: string;
  readonly name: string;
  readonly id: string;
  readonly hasChildren: boolean;
  readonly inPath:  boolean;
  readonly isActive:  boolean;
  readonly newWindow: boolean;
  readonly type: string;
  readonly url: string;
  readonly children: ReadonlyArray<MenuItem>;
}
