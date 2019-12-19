import {Content} from "./content";

export interface MenuLibrary {
  /**
   * Returns the full breadcrumb menu path for the current content and site.
   */
  getBreadcrumbMenu(params: GetBreadcrumbMenuParams): BreadcrumbMenu;

  /**
   * Get menu tree
   */
  getMenuTree(levels: number): ReadonlyArray<MenuItem>;

  /**
   * Returns submenus of a parent menuitem.
   */
  getSubMenus(parentContent: Content<any>, levels: number): ReadonlyArray<MenuItem>;
}

export interface GetBreadcrumbMenuParams {
  readonly linkActiveItem?: boolean;
  readonly showHomepage?: boolean;
  readonly homepageTitle?: string;
  readonly dividerHtml?: string;
  readonly urlType?: string;
}

export interface BreadcrumbMenu {
  readonly divider: string | null;
  readonly items: ReadonlyArray<{
    readonly text: string;
    readonly url: string;
    readonly active: boolean;
    readonly type: string;
  }>;
}

export interface MenuItem {
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
  readonly children: ReadonlyArray<MenuItem>;
}