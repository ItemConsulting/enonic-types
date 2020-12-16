import {Content, Site} from "./content";

export interface MenuLibrary {
  /**
   * Returns the full breadcrumb menu path for the current content and site.
   */
  getBreadcrumbMenu(params?: GetBreadcrumbMenuParams): BreadcrumbMenu;

  /**
   * Get menu tree
   */
  getMenuTree(levels: number, params?: GetMenuTreeParams): MenuTree;

  /**
   * Returns submenus of a parent menuitem.
   */
  getSubMenus(parentContent: Content<any> | Site<any>, levels?: number, params?: GetMenuParams): ReadonlyArray<MenuItem>;
}

export interface MenuTree {
  /**
   * The list of menuItems and children
   */
  readonly menuItems: ReadonlyArray<MenuItem>;

  /**
   * The ariaLabel used for this menu
   */
  readonly ariaLabel?: string;
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

  /**
   * The 'aria-label' attribute text on the '<nav>' element. This should be the name of the navigation, e.g "Breadcrumbs".
   */
  readonly ariaLabel?: string;
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

  readonly ariaLabel?: string;
}

export type GetMenuTreeParams = GetMenuParams & {
  readonly ariaLabel?: string;
};

export interface GetMenuParams {
  /**
   * Control type of URL to be generated for menu items, default is 'server', only other option is 'absolute'.
   */
  readonly urlType?: 'server' | 'absolute';

  /**
   * Controls what info to return
   */
  readonly returnContent?: boolean;

  /**
   * Query string to add when searching for menu items
   */
  readonly query?: string;
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
