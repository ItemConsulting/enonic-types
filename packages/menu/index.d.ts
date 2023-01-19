import type { Content } from "@enonic-types/core";

/**
 * Returns the full breadcrumb menu path for the current content and site.
 */
export function getBreadcrumbMenu(params?: GetBreadcrumbMenuParams): BreadcrumbMenu;

/**
 * Get menu tree
 */
export function getMenuTree(levels: number, params?: GetMenuTreeParams): MenuTree;

/**
 * Returns submenus of a parent menuitem.
 */
export function getSubMenus(parentContent: Content<unknown>, levels?: number, params?: GetMenuParams): Array<MenuItem>;

export interface MenuTree {
  /**
   * The list of menuItems and children
   */
  menuItems: Array<MenuItem>;

  /**
   * The ariaLabel used for this menu
   */
  ariaLabel?: string;
}

export interface GetBreadcrumbMenuParams {
  /**
   *  Wrap the active (current content) item with a link
   */
  linkActiveItem?: boolean;

  /**
   * Disable return of item for the site homepage
   */
  showHomepage?: boolean;

  /**
   * Customize (overwrite) the displayName of home/site link (if used). Common usage: "Home" or "Start".
   */
  homepageTitle?: string;

  /**
   * Any custom html you want appended to each item, except the last one. Common usage: '<span class="divider">/</span>'.
   */
  dividerHtml?: string;

  /**
   * Control type of URL to be generated for menu items, default is 'server', only other option is 'absolute'.
   */
  urlType?: "server" | "absolute";

  /**
   * The 'aria-label' attribute text on the '<nav>' element. This should be the name of the navigation, e.g "Breadcrumbs".
   */
  ariaLabel?: string;

  /**
   * Key to content used to get the current site, Also gets content is in path or active based on this.
   */
  currentContent?: string;
}

export interface BreadcrumbMenu {
  divider: string | null;
  items: Array<{
    title: string;
    text: string;
    url: string;
    active: boolean;
    type: string;
  }>;

  ariaLabel?: string;
}

export type GetMenuTreeParams = GetMenuParams & {
  ariaLabel?: string;
};

export interface GetMenuParams {
  /**
   * The content that sets the context of the menu. CurrentContent defaults to the current context content: portal.getContent().
   */
  currentContent?: string;

  /**
   * Control type of URL to be generated for menu items, default is 'server', only other option is 'absolute'.
   */
  urlType?: "server" | "absolute";

  /**
   * Controls what info to return
   */
  returnContent?: boolean;

  /**
   * Query string to add when searching for menu items
   */
  query?: string;
}

export interface MenuItem {
  title: string;
  displayName: string;
  menuName: string | null;
  path: string;
  name: string;
  id: string;
  hasChildren: boolean;
  inPath: boolean;
  isActive: boolean;
  newWindow: boolean;
  type: string;
  url: string;
  children: Array<MenuItem>;
}
