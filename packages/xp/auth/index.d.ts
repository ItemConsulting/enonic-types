import type {
  CreateGroupParams,
  CreateUserParams,
  LoginParams,
  EditorFn,
  CreateRoleParams,
} from "@enonic-types/lib-auth";
export { logout, hasRole, generatePassword } from "@enonic-types/lib-auth";

export type PrincipalKeyUser = `user:${string}:${string}`;
export type PrincipalKeyGroup = `group:${string}:${string}`;
export type PrincipalKeyRole = `role:${string}`;

export type PrincipalKey = PrincipalKeyUser | PrincipalKeyGroup | PrincipalKeyRole;

export type Principal = User | Role | Group;

export interface User {
  type: "user";
  key: PrincipalKeyUser;
  displayName: string;
  modifiedTime: string;
  disabled: boolean;
  email: string;
  login: string;
  idProvider: string;
}

export interface UserWithProfile<Profile> extends User {
  profile: Profile;
}

export interface Role {
  type: "role";
  key: PrincipalKeyRole;
  displayName: string;
  modifiedTime: string;
  description?: string;
}

export interface Group {
  type: "group";
  key: PrincipalKeyGroup;
  displayName: string;
  modifiedTime: string;
  description?: string;
}

export interface LoginResult {
  authenticated: boolean;
  message: string;
  users?: User;
}

/**
 * Login a user with the specified idProvider, userName, password and scope.
 *
 * @example-ref examples/auth/login.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.user Name of user to log in.
 * @param {string} [params.idProvider] Name of id provider where the user is stored. If not specified it will try all available id providers, in alphabetical order.
 * @param {string} [params.password] Password for the user. Ignored if skipAuth is set to true, mandatory otherwise.
 * @param {('SESSION'|'REQUEST'|'NONE')} [params.scope=SESSION] The scope of this login. Two values are valid. SESSION logs the user in and creates a session in XP for use in future requests. REQUEST logs the user in but only for this particular request and thus does not create a session.
 * @param {boolean} [params.skipAuth=false] Skip authentication.
 * @param {number} [params.sessionTimeout] Session timeout (in seconds). By default, the value of session.timeout from com.enonic.xp.web.jetty.cfg
 * @returns {LoginResult} Information for logged-in user.
 */
export function login(params: LoginParams): LoginResult;

/**
 * Returns the logged-in user. If not logged-in, this will return *undefined*.
 *
 * @example-ref examples/auth/getUser.js
 *
 * @param {object} [params] JSON parameters.
 * @param {boolean} [params.includeProfile=false] Include profile.
 *
 * @returns {User} Information for logged-in user.
 */
export function getUser(params?: { includeProfile?: false }): User | null;
export function getUser<Profile>(params: { includeProfile: true }): UserWithProfile<Profile> | null;

export interface ChangePasswordParams {
  userKey: PrincipalKeyUser;
  password: string;
}

/**
 * Changes password for specified user.
 *
 * @example-ref examples/auth/changePassword.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.userKey Key for user to change password.
 * @param {string} params.password New password to set.
 */
export function changePassword(params: ChangePasswordParams): void;

/**
 * Returns the principal with the specified key.
 *
 * @example-ref examples/auth/getPrincipal.js
 *
 * @param {string} principalKey Principal key to look for.
 * @returns {Principal} the principal specified, or null if it doesn't exist.
 */
export function getPrincipal(principalKey: PrincipalKey): Principal | null;

/**
 * Returns a list of principals the specified principal is a member of.
 *
 * @example-ref examples/auth/getMemberships.js
 *
 * @param {string} principalKey Principal key to retrieve memberships for.
 * @param {boolean} [transitive=false] Retrieve transitive memberships.
 * @returns {Array.<User | Group | Role>} Returns the list of principals.
 */
export function getMemberships(
  principalKey: PrincipalKeyUser | PrincipalKeyGroup,
  transitive?: boolean
): Array<Principal>;

/**
 * Returns a list of principals that are members of the specified principal.
 *
 * @example-ref examples/auth/getMembers.js
 *
 * @param {string} principalKey Principal key to retrieve members for.
 * @returns {Array.<User | Group | Role>} Returns the list of principals.
 */
export function getMembers(principalKey: PrincipalKeyRole | PrincipalKeyGroup): Array<User | Group>;

/**
 * Creates user from passed parameters.
 *
 * @example-ref examples/auth/createUser.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.idProvider Key for id provider where user has to be created.
 * @param {string} params.name User login name to set.
 * @param {string} params.displayName User display name.
 * @param {string} [params.email] User email.
 */
export function createUser(params: CreateUserParams): User;

export interface ModifyUserParams {
  key: PrincipalKeyUser;
  editor: (c: User) => User;
}

/**
 * Retrieves the user specified and updates it with the changes applied.
 *
 * @example-ref examples/auth/modifyUser.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.key Principal key of the user to modify.
 * @param {function} params.editor User editor function to apply to user.
 * @returns {User} the updated user or null if a  user not found.
 */
export function modifyUser(params: ModifyUserParams): User;

/**
 * Creates a group.
 *
 * @example-ref examples/auth/createGroup.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.idProvider Key for id provider where group has to be created.
 * @param {string} params.name Group name.
 * @param {string} params.displayName Group display name.
 * @param {string} params.description as principal description .
 */
export function createGroup(params: CreateGroupParams): Group;

export interface ModifyGroupParams {
  key: PrincipalKeyGroup;
  editor: (c: Group) => Group;
}

/**
 * Retrieves the group specified and updates it with the changes applied.
 *
 * @example-ref examples/auth/modifyGroup.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.key Principal key of the group to modify.
 * @param {function} params.editor Group editor function to apply to group.
 * @returns {Group} the updated group or null if a group not found.
 */
export function modifyGroup(params: ModifyGroupParams): Group;

/**
 * Adds members to a principal (user or role).
 *
 * @example-ref examples/auth/addMembers.js
 *
 * @param {string} principalKey Key of the principal to add members to.
 * @param {string} members Keys of the principals to add.
 */
export function addMembers(
  principalKey: PrincipalKeyRole | PrincipalKeyGroup,
  members: Array<PrincipalKeyGroup | PrincipalKeyUser>
): void;

/**
 * Removes members from a principal (user or role).
 *
 * @example-ref examples/auth/removeMembers.js
 *
 * @param {string} principalKey Key of the principal to remove members from.
 * @param {string} members Keys of the principals to remove.
 */
export function removeMembers(
  principalKey: PrincipalKeyRole | PrincipalKeyGroup,
  members: Array<PrincipalKeyGroup | PrincipalKeyUser>
): void;

export interface FindPrincipalsParams {
  type?: Principal["type"];
  idProvider?: string;
  start?: number;
  count?: number;
  name?: string;
  searchText?: string;
}

export interface FindPrincipalsResult {
  total: number;
  count: number;
  hits: Principal[];
}

/**
 * Search for principals matching the specified criteria.
 *
 * @example-ref examples/auth/findPrincipals.js
 *
 * @param {object} params JSON parameters.
 * @param {string} [params.type] Principal type to look for, one of: 'user', 'group' or 'role'. If not specified all principal types will be included.
 * @param {string} [params.idProvider] Key of the id provider to look for. If not specified all id providers will be included.
 * @param {number} [params.start=0] First principal to return from the search results. It can be used for pagination.
 * @param {number} [params.count=10] A limit on the number of principals to be returned.
 * @param {string} [params.name] Name of the principal to look for.
 * @param {string} [params.searchText] Text to look for in any principal field.
 * @returns {FindPrincipalsResult} The "total" number of principals matching the search, the "count" of principals included, and an array of "hits" containing the principals.
 */
export function findPrincipals(params: FindPrincipalsParams): FindPrincipalsResult;

/**
 * Deletes the principal with the specified key.
 *
 * @example-ref examples/auth/deletePrincipal.js
 *
 * @param {string} principalKey Principal key to delete.
 * @returns {boolean} True if deleted, false otherwise.
 */
export function deletePrincipal(principalKey: PrincipalKey): boolean;

/**
 * This function returns the ID provider configuration.
 * It is meant to be called from an ID provider controller.
 *
 * @example-ref examples/auth/getIdProviderConfig.js
 *
 * @returns {object} The ID provider configuration as JSON.
 */
export function getIdProviderConfig<IdProviderConfig>(): IdProviderConfig | null;

export interface GetProfileParams {
  key: PrincipalKeyUser;
  scope?: string;
}

/**
 * This function retrieves the profile of a user.
 *
 * @example-ref examples/auth/getProfile.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.key Principal key of the user.
 * @param {string} [params.scope] Scope of the data to retrieve.
 * @returns {object} The extra data as JSON
 */
export function getProfile<Profile>(params: GetProfileParams): Profile | null;

export interface ModifyProfileParams<Profile> {
  key: PrincipalKeyUser;
  scope?: string | null;
  editor: EditorFn<Profile>;
}

/**
 * This function retrieves the profile of a user and updates it.
 *
 * @example-ref examples/auth/modifyProfile.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.key Principal key of the user.
 * @param {string} [params.scope] Scope of the data to retrieve and update.
 * @param {function} params.editor Profile editor function to apply.
 * @returns {object} The extra data as JSON
 */
export function modifyProfile<Profile>(params: ModifyProfileParams<Profile>): Profile | null;

export interface FindUsersParams {
  start?: number;
  count: number;
  query: string;
  sort?: string;
}

export interface UserQueryResult<User> {
  total: number;
  count: number;
  hits: User[];
}

/**
 * Search for users matching the specified query.
 *
 * @example-ref examples/auth/findUsers.js
 *
 * @param {object} params JSON with the parameters.
 * @param {number} [params.start=0] Start index (used for paging).
 * @param {number} [params.count=10] Number of contents to fetch.
 * @param {string} params.query Query expression.
 * @param {string} [params.sort] Sorting expression.
 * @param {boolean} [params.includeProfile=false] Include profile.
 *
 * @returns {FindPrincipalsResult} Result of query.
 */
export function findUsers<Profile>(
  params: FindUsersParams & { includeProfile: true }
): UserQueryResult<UserWithProfile<Profile>>;
export function findUsers(params: FindUsersParams & { includeProfile?: false }): UserQueryResult<User>;

/**
 * Creates a role.
 *
 * @example-ref examples/auth/createRole.js
 *
 * @param {string} params.name Role name.
 * @param {string} [params.displayName] Role display name.
 * @param {string} [params.description] as principal description .
 */
export function createRole(params: CreateRoleParams): Role;

export interface ModifyRoleParams {
  key: PrincipalKeyRole;
  editor: EditorFn<Role>;
}

/**
 * Retrieves the role specified and updates it with the changes applied.
 *
 * @example-ref examples/auth/modifyRole.js
 *
 * @param {object} params JSON parameters.
 * @param {string} params.key Principal key of the role to modify.
 * @param {function} params.editor Role editor function to apply to role.
 * @returns {Role} the updated role or null if a role not found.
 */
export function modifyRole(params: ModifyRoleParams): Role;
