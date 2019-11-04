export interface AuthLibrary {
  login(params: LoginParams): LoginResult;
  logout(): void;
  getUser(): User | null;
  getIdProviderConfig<A>(): A;
  findUsers<A>(params: FindUsersParams): UserQueryResult<A>;
  modifyUser(params: ModifyUserParams): User;
  createUser(params: CreateUserParams): User;
  addMembers(principalKey: string, members: ReadonlyArray<string>): void;
  removeMembers(principalKey: string, members: ReadonlyArray<string>): void;
  getPrincipal(principalKey: string): User;
  createRole(params: CreateRoleParams): Role;
  createGroup(params: CreateGroupParams): Group;
  getMemberships(principalKey: string, transitive?: boolean): ReadonlyArray<Principal>;
}

export interface LoginParams {
  readonly user: string;
  readonly password?: string;
  readonly idProvider?: string;
  readonly skipAuth?: boolean;
  readonly sessionTimeout?: number;
}

export interface LoginResult {
  readonly authenticated: boolean;
  readonly user: User;
}

export interface Principal {
  readonly type: string;
  readonly key: string;
  readonly displayName: string;
  readonly modifiedTime: string;
}

export interface User extends Principal {
  readonly disabled: boolean;
  readonly email: string;
  readonly login: string;
  readonly idProvider: string;
}

export interface WithProfile<A> {
  readonly profile?: A;
}

export interface Role extends Principal {
  readonly description?: string;
}

export interface Group extends Principal {
  readonly description?: string;
}

export interface FindUsersParams {
  readonly start?: number;
  readonly count: number;
  readonly query: string;
  readonly sort?: string;
  readonly includeProfile?: boolean;
}

export interface UserQueryResult<A> {
  readonly total: number;
  readonly count: number;
  readonly hits: ReadonlyArray<User & WithProfile<A>>;
}

export interface ModifyUserParams {
  readonly key: string;
  readonly editor: (c: User) => User;
}

export interface CreateUserParams {
  readonly idProvider: string;
  readonly name: string;
  readonly displayName: string;
  readonly email?: string;
}

export interface CreateRoleParams {
  readonly name: string;
  readonly displayName: string;
  readonly description?: string;
}

export interface CreateGroupParams {
  readonly idProvider: string;
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
}
