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
  getIdProviderConfig<IdProviderConfig>(): IdProviderConfig;

  /**
   * Search for users matching the specified query.
   */
  findUsers<Profile>(params: FindUsersParams & { includeProfile: true }): UserQueryResult<UserWithProfile<Profile>>;
  findUsers(params: FindUsersParams  & { includeProfile?: false }): UserQueryResult<User>;

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
  addMembers(principalKey: string, members: Array<string>): void;

  /**
   * Returns a list of principals that are members of the specified principal.
   */
  getMembers(principalKey: string): ReadonlyArray<User>;

  /**
   * Removes members from a principal (group or role).
   */
  removeMembers(principalKey: string, members: Array<string>): void;

  /**
   * Returns the principal with the specified key.
   */
  getPrincipal(principalKey: string): User | null;

  /**
   * Search for principals matching the specified criteria.
   */
  findPrincipals(params: FindPrincipalsParams): FindPrincipalsResult;

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
  getProfile<Profile>(params: GetProfileParams): Profile;

  /**
   * This function retrieves the profile of a user and updates it.
   */
  modifyProfile<Profile>(params: ModifyProfileParams<Profile>): Profile;
}

export interface LoginParams {
  /**
   * Mandatory name of the user to log in
   */
  user: string;

  /**
   * Password for the user. Ignored if skipAuth is set to true, mandatory otherwise.
   */
  password?: string;

  /**
   * Name of id provider where the user is stored. If not specified it will try all available id providers,
   * in alphabetical order.
   */
  idProvider?: string;

  /**
   * Skip authentication. Default is false if not specified.
   */
  skipAuth?: boolean;

  /**
   * Session timeout (in seconds). By default, the value of session.timeout from com.enonic.xp.web.jetty.cfg
   */
  sessionTimeout?: number;

  /**
   * Defines the scope of the login.
   */
  scope?: 'SESSION' | 'REQUEST'
}

export interface LoginResult {
  readonly authenticated: boolean;
  readonly user: User;
}

export interface ChangePasswordParams {
  userKey: string;
  password: string;
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

export interface UserWithProfile<Profile> extends User {
  readonly profile: Profile;
}

export interface Role extends Principal {
  readonly description?: string;
}

export interface Group extends Principal {
  readonly description?: string;
}

export interface FindPrincipalsParams {
  type?: string;
  idProvider?: string;
  start?: string;
  count?: string;
  name?: string;
  searchText?: string;
}

export interface FindPrincipalsResult {
  total: number;
  count: number;
  hits: ReadonlyArray<Principal>;
}

export interface FindUsersParams {
  start?: number;
  count: number;
  query: string;
  sort?: string;
}

export interface UserQueryResult<User> {
  readonly total: number;
  readonly count: number;
  readonly hits: ReadonlyArray<User>;
}

export interface ModifyUserParams {
  key: string;
  editor: (c: User) => User;
}

export interface GetProfileParams {
  principalKey: string;
  scope?: string;
}

export interface ModifyProfileParams<Profile> {
  /**
   * Principal key of the user.
   */
  key: string;

  /**
   * Scope of the data to retrieve and update.
   */
  scope?: string;

  /**
   * Profile editor function to apply.
   */
  editor: (c: Profile) => Profile;
}

export interface ModifyGroupParams {
  key: string;
  editor: (c: Group) => Group;
}

export interface ModifyRoleParams {
  key: string;
  editor: (c: Role) => Role;
}

export interface CreateUserParams {
  idProvider: string;
  name: string;
  displayName: string;
  email?: string;
}

export interface CreateRoleParams {
  name: string;
  displayName: string;
  description?: string;
}

export interface CreateGroupParams {
  idProvider: string;
  name: string;
  displayName: string;
  description: string;
}
