/**
 * This library contains built-in authentication functions.
 */
export interface AuthLibrary {
  /**
   * Login a user through the specified idProvider, with userName and password.
   */
  login(params: LoginParams): LoginResult;

  /**
   * Logout the currently logged-in user.
   */
  logout(): void;

  /**
   * Returns the logged-in user. If not logged-in, this will return undefined or null.
   */
  getUser(): User | null;

  /**
   * Changes password for specified user.
   */
  changePassword(params: ChangePasswordParams): void;

  /**
   * Generates a random secure password that may be suggested to a user.
   */
  generatePassword(): string;

  /**
   * This function returns the ID provider configuration. It is meant to be called from an ID provider controller.
   */
  getIdProviderConfig<A>(): A;

  /**
   * Search for users matching the specified query.
   */
  findUsers<A>(params: FindUsersParams): UserQueryResult<A>;

  /**
   * Retrieves the user specified and updates it with the changes applied through the editor.
   */
  modifyUser(params: ModifyUserParams): User;

  /**
   * Creates a user.
   */
  createUser(params: CreateUserParams): User;

  /**
   * Adds members to a principal (user or role).
   */
  addMembers(principalKey: string, members: ReadonlyArray<string>): void;

  /**
   * Returns a list of principals that are members of the specified principal.
   */
  getMembers(principalKey: string): ReadonlyArray<User>;

  /**
   * Removes members from a principal (group or role).
   */
  removeMembers(principalKey: string, members: ReadonlyArray<string>): void;

  /**
   * Returns the principal with the specified key.
   */
  getPrincipal(principalKey: string): User;

  /**
   * Returns the list of principals which the specified principal is a member of.
   */
  getMemberships(principalKey: string, transitive?: boolean): ReadonlyArray<Principal>;

  /**
   * Deletes the principal with the specified key.
   */
  deletePrincipal(principalKey: string): boolean;

  /**
   * Creates a role.
   */
  createRole(params: CreateRoleParams): Role;

  /**
   * Retrieves the role specified and updates it with the changes applied through an editor.
   */
  modifyRole(params: ModifyRoleParams): Role;

  /**
   * Checks if the logged-in user has the specified role.
   */
  hasRole(role: string): boolean;

  /**
   * Creates a group.
   */
  createGroup(params: CreateGroupParams): Group;

  /**
   * Retrieves the group specified and updates it with the changes applied.
   */
  modifyGroup(params: ModifyGroupParams): Group;

  /**
   * Returns the profile of a user.
   */
  getProfile<A>(principalKey: string, scope?: string): A;

  /**
   * This function retrieves the profile of a user and updates it.
   */
  modifyProfile<A>(params: ModifyProfileParams<A>): A;
}

export interface LoginParams {
  /**
   * Mandatory name of the user to log in
   */
  readonly user: string;

  /**
   * Password for the user. Ignored if skipAuth is set to true, mandatory otherwise.
   */
  readonly password?: string;

  /**
   * Name of id provider where the user is stored. If not specified it will try all available id providers,
   * in alphabetical order.
   */
  readonly idProvider?: string;

  /**
   * Skip authentication. Default is false if not specified.
   */
  readonly skipAuth?: boolean;

  /**
   * Session timeout (in seconds). By default, the value of session.timeout from com.enonic.xp.web.jetty.cfg
   */
  readonly sessionTimeout?: number;
}

export interface LoginResult {
  readonly authenticated: boolean;
  readonly user: User;
}

export interface ChangePasswordParams {
  readonly userKey: string;
  readonly password: string;
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

export interface ModifyProfileParams<A> {
  readonly key: string;
  readonly scope?: string;
  readonly editor: (c: A) => A;
}

export interface ModifyGroupParams {
  readonly key: string;
  readonly editor: (c: Group) => Group;
}

export interface ModifyRoleParams {
  readonly key: string;
  readonly editor: (c: Role) => Role;
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
