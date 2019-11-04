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
  readonly settings: any;
  readonly mapping: any;
}

export interface CreateRepoParams {
  readonly id: string;
  readonly rootPermissions?: ReadonlyArray<PermissionsParams>;
  readonly settings?: {
    readonly definitions?: {
      readonly search?: IndexDefinition;
      readonly version?: IndexDefinition;
      readonly branch?: IndexDefinition;
    };
  };
}

export interface CreateBranchParams {
  readonly branchId: string;
  readonly repoId: string;
}

export interface RepositoryConfig {
  readonly id: string;
  readonly branches: ReadonlyArray<string>;
  readonly settings: any;
}

export interface RefreshParams {
  readonly mode?: string;
  readonly repo?: string;
  readonly branch?: string;
}

export interface DeleteBranchParams {
  readonly branchId: string;
  readonly repoId: string;
}
