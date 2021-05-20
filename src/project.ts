export interface ProjectLibrary {
  /**
   * Adds permissions to an existing Content Project. To modify permissions, user must have Owner permissions for the
   * project, or either system.admin or cms.admin role.
   */
  addPermissions(params: AddPermissionsParams): boolean;

  /**
   * Creates a new Content Project. Only system.admin and cms.admin roles have permissions to create new projects.
   */
  create(params: CreateProjectParams): Project;

  /**
   * Deletes an existing Content Project and the project repository along with all the data inside. To delete a project,
   * user must have either system.admin or cms.admin role.
   */
  delete(params: DeleteProjectParams): boolean;

  /**
   * Returns an existing Content Project. To get a project, user must have permissions for this project, or either
   * system.admin or cms.admin role.
   */
  get(params: GetProjectParams): Project | null;

  /**
   * Returns all Content Projects that user in the current context has permissions for. Users with system.admin or
   * cms.admin roles will get the list of all projects.
   */
  list(): ReadonlyArray<Project>;

  /**
   * Modifies an existing Content Project. To modify a project, user must have Owner permissions for this project,
   * or either system.admin or cms.admin role.
   */
  modify(params: ModifyProjectParams): Project;

  /**
   * Toggles public/private READ access for an existing Content Project. This will modify permissions on ALL the
   * content items inside the project repository by adding or removing READ access for system.everyone. To modify READ
   * access, user must have Owner permissions for the project, or either system.admin or cms.admin role.
   */
  modifyReadAccess(params: ModifyReadAccessParams): ModifyReadAccessResult;

  /**
   * Removes permissions from an existing Content Project. To remove permissions, user must have Owner permissions for
   * the project, or either system.admin or cms.admin role.
   */
  removePermissions(params: RemovePermissionsParams): boolean;
}

type ProjectRoleId = "owner" | "editor" | "author" | "contributor" | "viewer";

type ProjectPermissions = Record<ProjectRoleId, Array<string>>;

export interface ReadAccess {
  /**
   * Public read access (READ permissions for system.everyone).
   */
  public: boolean;
}

export interface Project {
  /**
   * Unique project id (alpha-numeric characters and hyphens allowed).
   */
  id: string;

  /**
   * Project display name.
   */
  displayName: string;

  /**
   * Parent project id. If provided, the new project will be a Content Layer that automatically inherits changes from
   * the parent project.
   * @since 7.6.0
   */
  parent: string;

  /**
   * Project description.
   */
  description?: string;

  /**
   * Default project language.
   */
  language?: string;

  /**
   * Project permissions. 1 to 5 properties where key is role id and value is an array of principals.
   */
  permissions?: ProjectPermissions;

  // Note: In XP8 `readAccess` can not be undefined
  /**
   * Read access settings.
   */
  readAccess?: ReadAccess;
}

export type CreateProjectParams = Project;

export interface DeleteProjectParams {
  /**
   * Unique project id to identify the project.
   */
  id: string;
}

export interface GetProjectParams {
  /**
   * Unique project id to identify the project.
   */
  id: string;
}

export interface ModifyProjectParams {
  /**
   * Unique project id (alpha-numeric characters and hyphens allowed).
   */
  id: string;

  /**
   * Project display name.
   */
  displayName: string;

  /**
   * Project description.
   */
  description?: string;

  /**
   * Default project language.
   */
  language?: string;
}

export interface ModifyReadAccessParams {
  /**
   * Unique project id (alpha-numeric characters and hyphens allowed).
   */
  id: string;

  /**
   * Read access settings.
   */
  readAccess: ReadAccess;
}

export type ModifyReadAccessResult = ModifyReadAccessParams;

export interface AddPermissionsParams {
  /**
   * Unique project id to identify the project.
   */
  id: string;

  /**
   * Project permissions to add. 1 to 5 properties where key is role id and value is an array of principals.
   */
  permissions: ProjectPermissions;
}

export interface RemovePermissionsParams {
  /**
   * Unique project id (alpha-numeric characters and hyphens allowed).
   */
  id: string;

  /**
   * Project permissions to delete. 1 to 5 properties where key is role id and value is an array of principals.
   */
  permissions: ProjectPermissions;
}
