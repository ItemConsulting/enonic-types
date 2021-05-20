import {PermissionsParams } from "./content";

export interface RepoLibrary {
  create(params: CreateRepoParams): RepositoryConfig;
  createBranch(params: CreateBranchParams): RepositoryConfig;
  get(id: string): RepositoryConfig | null;
  list(): ReadonlyArray<RepositoryConfig>;
  delete(id: string): boolean;
  deleteBranch(params: DeleteBranchParams): any; // TODO Figure out the shape here for "any"
  refresh(params: RefreshParams): ReadonlyArray<RepositoryConfig>;
}

export interface IndexDefinition {
  settings: any;
  mapping: any;
}

export interface CreateRepoParams {
  id: string;
  rootPermissions?: ReadonlyArray<PermissionsParams>;
  settings?: {
    definitions?: {
      search?: IndexDefinition;
      version?: IndexDefinition;
      branch?: IndexDefinition;
    };
  };
}

export interface CreateBranchParams {
  branchId: string;
  repoId: string;
}

export interface RepositoryConfig {
  readonly id: string;
  readonly branches: ReadonlyArray<string>;
  readonly settings: any;
}

export interface RefreshParams {
  mode?: string;
  repo?: string;
  branch?: string;
}

export interface DeleteBranchParams {
  branchId: string;
  repoId: string;
}
