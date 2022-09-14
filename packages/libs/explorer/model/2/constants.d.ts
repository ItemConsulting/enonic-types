type IndexConfigEntry = import("../../../../xp/node").IndexConfigEntry;
type PermissionsParams = import("@item-enonic-types/content").PermissionsParams;

export const APP_EXPLORER: string;
export const INTERFACES_FOLDER: string;
export const FOLDERS: Array<string>;
export const NT_API_KEY: string;
export const NT_COLLECTION: string;
export const NT_COLLECTOR: string;
export const NT_DOCUMENT: string;
export const NT_FIELD: string;
export const NT_FIELD_VALUE: string;
export const NT_FOLDER: string;
export const NT_INTERFACE: string;
export const NT_JOURNAL: string;
export const NT_KEYWORD: string;
export const NT_RESPONSE: string;
export const NT_STOP_WORDS: string;
export const NT_SYNONYM: string;
export const NT_TAG: string;
export const NT_THESAURUS: string;
export const INDEX_CONFIG_STOP_WORDS: { default: string };
export const PATH_API_KEYS: string;
export const PATH_COLLECTORS: string;
export const PATH_FIELDS: string;
export const PATH_INTERFACES: string;
export const DOCUMENT_METADATA: string;
export const FIELD_MODIFIED_TIME_INDEX_CONFIG: string;
export const FIELD_DOCUMENT_METADATA_LANGUAGE_INDEX_CONFIG: IndexConfigEntry;
export const FIELD_DOCUMENT_METADATA_STEMMING_LANGUAGE_INDEX_CONFIG: IndexConfigEntry;
export const REPO_ID_EXPLORER: string;
export const BRANCH_ID_EXPLORER: string;
export const REPO_JOURNALS: string;
export const COLLECTION_REPO_PREFIX: string;
export const RESPONSES_REPO_PREFIX: string;
export const ROLE_SYSTEM_ADMIN: string;
export const ROLE_EXPLORER_ADMIN: string;
export const ROLE_EXPLORER_READ: string;
export const ROLE_EXPLORER_WRITE: string;
export const PRINCIPAL_SYSTEM_ADMIN: string;
export const PRINCIPAL_EXPLORER_READ: string;
export const PRINCIPAL_EXPLORER_WRITE: string;
export const USER_EXPLORER_APP_NAME: string;
export const USER_EXPLORER_APP_ID_PROVIDER: string;
export const USER_EXPLORER_APP_KEY: string;
export const ROOT_PERMISSION_SYSTEM_ADMIN: PermissionsParams;
export const ROOT_PERMISSION_EXPLORER_WRITE: PermissionsParams;
export const ROOT_PERMISSION_EXPLORER_READ: PermissionsParams;
export const ROOT_PERMISSIONS_EXPLORER: Array<PermissionsParams>;
