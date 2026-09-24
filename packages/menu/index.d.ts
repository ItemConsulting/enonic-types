import type { Content } from "@enonic-types/core";

/**
 * Returns the full breadcrumb menu path for the current content and site.
 *
 * Note: Returns an empty array (not a `BreadcrumbMenu`) if there is no current content, e.g. on an error page.
 */
export function getBreadcrumbMenu(
  params?: GetBreadcrumbMenuParams,
): BreadcrumbMenu;

/**
 * Get menu tree
 */
export function getMenuTree(
  levels: number,
  params?: GetMenuTreeParams,
): MenuTree;

/**
 * Returns submenus of a parent menuitem.
 */
export function getSubMenus(
  parentContent: Content<unknown>,
  levels?: number,
  params?: GetMenuParams,
): Array<MenuItem>;

export interface MenuTree {
  /**
   * The list of menuItems and children
   */
  menuItems: Array<MenuItem>;

  /**
   * The ariaLabel used for this menu. Defaults to "menu".
   */
  ariaLabel: string;
}

export interface GetBreadcrumbMenuParams {
  /**
   *  Wrap the active (current content) item with a link
   */
  linkActiveItem?: boolean;

  /**
   * Return an item for the site homepage.
   *
   * Note: Setting this to `false` has no effect in lib-menu 5.0.0, the homepage item is always returned.
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

  /**
   * Include the content object on each item
   */
  returnContent?: boolean;
}

export interface BreadcrumbMenu {
  /**
   * The `dividerHtml` param, to be rendered between items. `null` if not set.
   */
  divider: string | null;

  /**
   * The breadcrumb items, ordered from the site homepage to the current content
   */
  items: Array<BreadcrumbMenuItem>;

  /**
   * The ariaLabel used for this menu. Defaults to "breadcrumbs".
   */
  ariaLabel: string;
}

export interface BreadcrumbMenuItem {
  /**
   * The content's displayName. For the homepage item, the `homepageTitle` param is used if set.
   */
  title: string;

  /**
   * @deprecated Use `title` instead
   */
  text: string;

  /**
   * Not set on the active item, unless `linkActiveItem` is `true`
   */
  url?: string;

  /**
   * `true` if this item is the current content
   */
  active: boolean;

  /**
   * The content type of the item, e.g. "portal:site"
   */
  type: string;

  /**
   * Only set if `returnContent` is `true`
   */
  content?: Content;
}

export type GetMenuTreeParams = GetMenuParams & {
  /**
   * The 'aria-label' attribute text on the '<nav>' element. Defaults to "menu".
   */
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
   * Include the content object on each menu item
   */
  returnContent?: boolean;

  /**
   * Query string to add when searching for menu items
   */
  query?: string;
}

export interface MenuItem {
  /**
   * The `menuName` from the "menu-item" mixin, falling back to the content's displayName
   */
  title: string;

  /**
   * The content's path (`_path`)
   */
  path: string;

  /**
   * The content's name (`_name`)
   */
  name: string;

  /**
   * The content's id (`_id`)
   */
  id: string;

  /**
   * `true` if `children` is not empty. Only children within the requested number of levels are counted.
   */
  hasChildren: boolean;

  /**
   * `true` if this item is an ancestor of the current content
   */
  inPath: boolean;

  /**
   * `true` if this item is the current content
   */
  isActive: boolean;

  /**
   * Note: The "menu-item" mixin in lib-menu 5.0.0 has no `newWindow` field, so this is always `false`
   * unless your application provides its own mixin with this field.
   */
  newWindow: boolean;

  /**
   * The content type of the item, e.g. "portal:site"
   */
  type: string;

  /**
   * URL to the content's page, of the type given by the `urlType` param
   */
  url: string;

  /**
   * Sub menu items. Empty if there are no children, or the number of requested levels is reached.
   */
  children: Array<MenuItem>;

  /**
   * Only set if `returnContent` is `true`
   */
  content?: Content;
}
