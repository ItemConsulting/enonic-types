export interface ProjectLibrary {
  addPermissions(params: AddPermissionsParams): boolean;
  create(params: CreateProjectParams): Project;
  delete(params: DeleteProjectParams): boolean;
  get(params: GetProjectParams): Project | null;
  list(): ReadonlyArray<Project>;
  modify(params: ModifyProjectParams): Project;
  modifyReadAccess(params: ModifyReadAccessParams): ModifyReadAccessResult;
  removePermissions(params: RemovePermissionsParams): boolean;
}

type ProjectRole = "owner" | "editor" | "author" | "contributor" | "viewer";

type ProjectPermissions = Record<ProjectRole, ReadonlyArray<string>>;

export interface ReadAccess {
  readonly public: boolean;
}

export interface Project {
  readonly id: string;
  readonly displayName: string;
  readonly description?: string;
  readonly language?: string;
  readonly permissions?: ProjectPermissions;
  readonly readAccess: ReadAccess;
}

export type CreateProjectParams = Project;

export interface DeleteProjectParams {
  readonly id: string;
}

export interface GetProjectParams {
  readonly id: string;
}

export interface ModifyProjectParams {
  readonly id: string;
  readonly displayName: string;
  readonly description?: string;
  readonly language?: string;
}

export interface ModifyReadAccessParams {
  readonly id: string;
  readonly readAccess: ReadAccess;
}

export type ModifyReadAccessResult = ModifyReadAccessParams;

export interface AddPermissionsParams {
  readonly id: string;
  readonly permissions: ProjectPermissions;
}

export interface RemovePermissionsParams {
  readonly id: string;
  readonly permissions: ProjectPermissions;
}
