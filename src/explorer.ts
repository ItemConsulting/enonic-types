declare module "*/lib/explorer/model/2/constants" {
  namespace explorerModelConstantsLib {
    type IndexConfigEntry = import("/lib/xp/node").IndexConfigEntry;
    type PermissionsParams = import("/lib/xp/content").PermissionsParams;

    interface ExplorerModelConstantsLibrary {
      readonly APP_EXPLORER: string;
      readonly INTERFACES_FOLDER: string;
      readonly FOLDERS: Array<string>;
      readonly NT_API_KEY: string;
      readonly NT_COLLECTION: string;
      readonly NT_COLLECTOR: string;
      readonly NT_DOCUMENT: string;
      readonly NT_FIELD: string;
      readonly NT_FIELD_VALUE: string;
      readonly NT_FOLDER: string;
      readonly NT_INTERFACE: string;
      readonly NT_JOURNAL: string;
      readonly NT_KEYWORD: string;
      readonly NT_RESPONSE: string;
      readonly NT_STOP_WORDS: string;
      readonly NT_SYNONYM: string;
      readonly NT_TAG: string;
      readonly NT_THESAURUS: string;
      readonly INDEX_CONFIG_STOP_WORDS: { default: string };
      readonly PATH_API_KEYS: string;
      readonly PATH_COLLECTORS: string;
      readonly PATH_FIELDS: string;
      readonly PATH_INTERFACES: string;
      readonly DOCUMENT_METADATA: string;
      readonly FIELD_MODIFIED_TIME_INDEX_CONFIG: string;
      readonly FIELD_DOCUMENT_METADATA_LANGUAGE_INDEX_CONFIG: IndexConfigEntry;
      readonly FIELD_DOCUMENT_METADATA_STEMMING_LANGUAGE_INDEX_CONFIG: IndexConfigEntry;
      readonly REPO_ID_EXPLORER: string;
      readonly BRANCH_ID_EXPLORER: string;
      readonly REPO_JOURNALS: string;
      readonly COLLECTION_REPO_PREFIX: string;
      readonly RESPONSES_REPO_PREFIX: string;
      readonly ROLE_SYSTEM_ADMIN: string;
      readonly ROLE_EXPLORER_ADMIN: string;
      readonly ROLE_EXPLORER_READ: string;
      readonly ROLE_EXPLORER_WRITE: string;
      readonly PRINCIPAL_SYSTEM_ADMIN: string;
      readonly PRINCIPAL_EXPLORER_READ: string;
      readonly PRINCIPAL_EXPLORER_WRITE: string;
      readonly USER_EXPLORER_APP_NAME: string;
      readonly USER_EXPLORER_APP_ID_PROVIDER: string;
      readonly USER_EXPLORER_APP_KEY: string;
      readonly ROOT_PERMISSION_SYSTEM_ADMIN: PermissionsParams;
      readonly ROOT_PERMISSION_EXPLORER_WRITE: PermissionsParams;
      readonly ROOT_PERMISSION_EXPLORER_READ: PermissionsParams;
      readonly ROOT_PERMISSIONS_EXPLORER: Array<PermissionsParams>;
    }
  }

  const explorerModelConstantsLib: explorerModelConstantsLib.ExplorerModelConstantsLibrary;
  export = explorerModelConstantsLib;
}

declare module "*/lib/explorer/document" {
  namespace explorerDocumentLib {
    interface ExplorerDocumentLibrary {
      /**
       * Create documents
       */
      create<Data extends CreateData>(data: Data, options: CreateOptions): Data;

      /**
       * Update documents
       */
      update<Data extends UpdateData>(data: Data, options: UpdateOptions): Data;
    }

    interface CreateData {
      _name: string;
    }

    interface CreateOptions {
      boolRequireValid?: boolean;
      connection: import("/lib/xp/node").RepoConnection;
    }

    interface UpdateData {
      _name: string;
    }

    interface UpdateOptions {
      boolPartial?: boolean;
      boolRequireValid?: boolean;
      connection: import("/lib/xp/node").RepoConnection;
    }
  }

  const explorerDocumentLib: explorerDocumentLib.ExplorerDocumentLibrary;
  export = explorerDocumentLib;
}

declare module "*/lib/explorer/client" {
  namespace explorerClientLib {
    interface ExplorerClientLibrary {
      /**
       * Search for documents
       */
      search<Hit>(params: SearchParams): SearchResult<Hit>;
    }

    interface SearchParams {
      clearCache?: boolean;
      count: number;
      facets?: Record<string, Array<string>>;
      interface: string;
      locale?: string;
      name?: string;
      page?: number;
      searchString: string;
    }

    interface SearchResult<Hit> {
      readonly count: number;
      readonly expand: boolean;
      readonly facetCategories: Array<{
        readonly activeCount: number;
        readonly clearHref: string;
        readonly href: string;
        readonly inactiveCount: number;
        readonly name: string;
        readonly facets: Array<{
          readonly href: string;
          readonly name: string;
          readonly removeHref: string;
          readonly count: number;
        }>;
      }>;
      readonly hits: Array<Hit>;
      readonly pages: number;
      readonly pagination: Array<{
        readonly href?: string;
        readonly text: string;
      }>;
      readonly params: SearchParams;
      readonly removedStopWords: Array<string>;
      readonly synonymsObj: Record<
        string,
        Record<
          string,
          {
            readonly score: number;
            readonly to: Array<string>;
          }
        >
      >;
      readonly total: number;
    }
  }

  const explorerClientLib: explorerClientLib.ExplorerClientLibrary;
  export = explorerClientLib;
}

declare module "*/lib/explorer" {
  namespace explorerLib {
    type ExplorerLibrary = import("/lib/explorer/client").ExplorerClientLibrary &
      import("/lib/explorer/document").ExplorerDocumentLibrary;
  }

  const explorerLib: explorerLib.ExplorerLibrary;

  export = explorerLib;
}
