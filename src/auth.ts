declare module "*/lib/xp/auth" {
  namespace authLib {
    /**
     * This library contains built-in authentication functions.
     */
    interface AuthLibrary {
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
      findUsers(params: FindUsersParams & { includeProfile?: false }): UserQueryResult<User>;

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
      addMembers(
        principalKey: PrincipalKeyRole | PrincipalKeyGroup,
        members: Array<PrincipalKeyGroup | PrincipalKeyUser>
      ): void;

      /**
       * Returns a list of principals that are members of the specified principal.
       */
      getMembers(principalKey: PrincipalKeyRole | PrincipalKeyGroup): ReadonlyArray<User | Group>;

      /**
       * Removes members from a principal (group or role).
       */
      removeMembers(
        principalKey: PrincipalKeyRole | PrincipalKeyGroup,
        members: Array<PrincipalKeyGroup | PrincipalKeyUser>
      ): void;

      /**
       * Returns the principal with the specified key.
       */
      getPrincipal(principalKey: PrincipalKey): Principal | null;

      /**
       * Search for principals matching the specified criteria.
       */
      findPrincipals(params: FindPrincipalsParams): FindPrincipalsResult;

      /**
       * Returns the list of principals which the specified principal is a member of.
       */
      getMemberships(
        principalKey: PrincipalKeyUser | PrincipalKeyGroup,
        transitive?: boolean
      ): ReadonlyArray<Principal>;

      /**
       * Deletes the principal with the specified key.
       */
      deletePrincipal(principalKey: PrincipalKey): boolean;

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

    type PrincipalKeySystem =
      | "role:system.everyone"
      | "role:system.authenticated"
      | "role:system.admin"
      | "role:system.admin.login"
      | "role:system.auditlog"
      | "role:system.user.admin"
      | "role:system.user.app"
      | "user:system:su";

    type PrincipalKeyUser = `user:${string}:${string}`;
    type PrincipalKeyGroup = `group:${string}:${string}`;
    type PrincipalKeyRole = `role:${string}`;

    type PrincipalKey = PrincipalKeySystem | PrincipalKeyUser | PrincipalKeyGroup | PrincipalKeyRole;

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
      scope?: "SESSION" | "REQUEST" | "NONE";
    }

    export interface LoginResult {
      readonly authenticated: boolean;
      readonly user: User;
    }

    export interface ChangePasswordParams {
      userKey: PrincipalKeyUser;
      password: string;
    }

    export type Principal = User | Role | Group;

    export interface User {
      readonly type: "user";
      readonly key: PrincipalKeyUser;
      readonly displayName: string;
      readonly modifiedTime: string;
      readonly disabled: boolean;
      readonly email: string;
      readonly login: string;
      readonly idProvider: string;
    }

    export interface UserWithProfile<Profile> extends User {
      readonly profile: Profile;
    }

    export interface Role {
      readonly type: "role";
      readonly key: PrincipalKeyRole;
      readonly displayName: string;
      readonly modifiedTime: string;
      readonly description?: string;
    }

    export interface Group {
      readonly type: "group";
      readonly key: PrincipalKeyGroup;
      readonly displayName: string;
      readonly modifiedTime: string;
      readonly description?: string;
    }

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
      key: PrincipalKeyUser;
      editor: (c: User) => User;
    }

    export interface GetProfileParams {
      key: PrincipalKeyUser;
      scope?: string;
    }

    export interface ModifyProfileParams<Profile> {
      /**
       * Principal key of the user.
       */
      key: PrincipalKeyUser;

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
      key: PrincipalKeyGroup;
      editor: (c: Group) => Group;
    }

    export interface ModifyRoleParams {
      key: PrincipalKeyRole;
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
  }

  const authLib: authLib.AuthLibrary;
  export = authLib;
}
