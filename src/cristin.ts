declare module "*/lib/cristin" {
  namespace cristinLib {
    type RepoConnection = import("/lib/xp/node").RepoConnection;
    type ListOfPersons = import("./generated").ListOfPersons;
    type Person = import("./generated").Person;
    type ListOfProjects = import("./generated").ListOfProjects;
    type Project = import("./generated").Project;
    type ListOfResults = import("./generated").ListOfResults;
    type Result = import("./generated").Result;
    type ListOfInstitutions = import("./generated").ListOfInstitutions;
    type Institution = import("./generated").Institution;
    type ListOfUnits = import("./generated").ListOfUnits;
    type Unit = import("./generated").Unit;

    type Unarray<T> = import("./types").Unarray<T>;
    type CristinPersonAffiliation = NonNullable<Unarray<Person["affiliations"]>>;
    type CristinProjectCoordinatingInstitution = Project["coordinating_institution"];
    type CristinProjectParticipant = Unarray<NonNullable<Project["participants"]>>;
    type CristinProjectParticipantRole = Unarray<CristinProjectParticipant["roles"]>;
    type CristinResultCategory = NonNullable<Result["category"]>;

    export interface CristinResultJournal {
      cristin_journal_id: string;
      name: string;
      international_standard_numbers: Array<{
        type: string;
        value: string;
      }>;
      nvi_level: string;
    }

    /**
     * This library lets the developer interact with Cristin
     */
    interface CristinLibrary {
      getCristinPersons(ids: Array<string>): Array<Person>;
      getCristinPerson(id: string, connection?: RepoConnection): Person | void;

      getCristinInstitutions(ids: Array<string>): Array<Institution>;
      getCristinInstitution(id: string, connection?: RepoConnection): Institution | void;

      getCristinProjects(ids: Array<string>): Array<Project>;
      getCristinProject(id: string, connection?: RepoConnection): Project | void;

      getCristinUnits(ids: Array<string>): Array<Unit>;
      getCristinUnit(id: string, connection?: RepoConnection): Unit | void;

      getCristinResults(ids: Array<string>): Array<Result>;
      getCristinResult(id: string, connection?: RepoConnection): Result | void;
    }
  }

  const cristinLib: cristinLib.CristinLibrary;
  export = cristinLib;
}

declare module "*/lib/cristin/constants" {
  namespace cristinConstantsLib {
    interface CristinConstantsLibrary {
      REPO_CRISTIN_INSTITUTIONS: "no.item.cristin.institutions";
      REPO_CRISTIN_PERSONS: "no.item.cristin.persons";
      REPO_CRISTIN_PROJECTS: "no.item.cristin.projects";
      REPO_CRISTIN_RESULTS: "no.item.cristin.results";
      REPO_CRISTIN_UNITS: "no.item.cristin.units";
      BRANCH_MASTER: "master";
      URL_CRISTIN: "https://api.cristin.no/v2";
      BINARY_REFERENCE_PICTURE: "picture";
      LANG_PARAMS_DEFAULT: "en,nb";
    }
  }

  const cristinConstantsLib: cristinConstantsLib.CristinConstantsLibrary;
  export = cristinConstantsLib;
}

declare module "*/lib/cristin/storage" {
  namespace cristinStorageLib {
    type Person = import("./generated").Person;
    type Project = import("./generated").Project;
    type Result = import("./generated").Result;
    type Institution = import("./generated").Institution;
    type Unit = import("./generated").Unit;

    interface CristinStorageLibrary {
      lookupPerson(ids: Array<string>): Array<Person>;
      lookupPerson(id: string): Person | undefined;

      lookupInstitution(ids: Array<string>): Array<Institution>;
      lookupInstitution(id: string): Institution | undefined;

      lookupProject(ids: Array<string>): Array<Project>;
      lookupProject(id: string): Project | undefined;

      lookupUnit(ids: Array<string>): Array<Unit>;
      lookupUnit(id: string): Unit | undefined;

      lookupResult(ids: Array<string>): Array<Result>;
      lookupResult(id: string): Result | undefined;
    }
  }

  const cristinStorageLib: cristinStorageLib.CristinStorageLibrary;
  export = cristinStorageLib;
}

declare module "*/lib/cristin/graphql" {
  namespace cristinGraphqlLib {
    type GraphQLType = import("/lib/graphql").GraphQLTime;
    type GraphQLObjectType = import("/lib/graphql").GraphQLObjectType;
    type Context<ExecuteContext = EmptyObject> = import("/lib/guillotine").Context<ExecuteContext>;
    type EmptyObject = import("/lib/guillotine").EmptyObject;
    interface ContextOptions<ExecuteContext = EmptyObject> {
      creationCallbacks: Record<
        string,
        (
          context: Context<ExecuteContext>,
          params: import("/lib/graphql").CreateObjectTypeParams<ExecuteContext>
        ) => void
      >;
    }

    interface CristinGraphqlLibrary {
      GRAPHQL_OBJECT_NAME_CRISTIN_UNIT: "no_item_cristin_Unit";
      GRAPHQL_OBJECT_NAME_CRISTIN_INSTITUTION: "no_item_cristin_Institution";
      GRAPHQL_OBJECT_NAME_CRISTIN_PERSON: "no_item_cristin_Person";
      GRAPHQL_OBJECT_NAME_CRISTIN_PROJECT: "no_item_cristin_Project";
      GRAPHQL_OBJECT_NAME_CRISTIN_RESULT: "no_item_cristin_Result";

      GraphQLCristinPerson: GraphQLType;
      GraphQLCristinInstitution: GraphQLType;
      GraphQLCristinProject: GraphQLType;
      GraphQLCristinResult: GraphQLType;
      GraphQLCristinUnit: GraphQLType;

      createObjectTypeCristinPerson(context: Context, options?: ContextOptions): GraphQLObjectType;
      createObjectTypeCristinInstitution(context: Context, options?: ContextOptions): GraphQLObjectType;
      createObjectTypeCristinProject(context: Context, options?: ContextOptions): GraphQLObjectType;
      createObjectTypeCristinResult(context: Context, options?: ContextOptions): GraphQLObjectType;
      createObjectTypeCristinResultCategory(context: Context, options?: ContextOptions): GraphQLObjectType;
      createObjectTypeCristinUnit(context: Context, options?: ContextOptions): GraphQLObjectType;
    }
  }

  const cristinGraphqlLib: cristinGraphqlLib.CristinGraphqlLibrary;
  export = cristinGraphqlLib;
}

declare module "*/lib/cristin/service" {
  namespace cristinServiceLib {
    type ListOfPersons = import("./generated").ListOfPersons;
    type Person = import("./generated").Person;
    type ListOfProjects = import("./generated").ListOfProjects;
    type Project = import("./generated").Project;
    type ListOfResults = import("./generated").ListOfResults;
    type Result = import("./generated").Result;
    type CristinResultCategory = NonNullable<Result["category"]>;
    type ListOfInstitutions = import("./generated").ListOfInstitutions;
    type Institution = import("./generated").Institution;
    type ListOfUnits = import("./generated").ListOfUnits;
    type Unit = import("./generated").Unit;

    export interface FetchResponse<Data> {
      count: number;
      total: number;
      data: Data;
    }

    interface CristinServiceLibrary {
      fetchPersons(params: GetPersonsParams): FetchResponse<ListOfPersons>;
      fetchPerson(params: GetSingleParams): Person;

      fetchProjects(params: GetProjectsParams): FetchResponse<ListOfProjects>;
      fetchProject(params: GetSingleParams): Project;

      fetchResults(params: GetResultsParams): FetchResponse<ListOfResults>;
      fetchResult(params: GetSingleParams): Result;
      fetchResultCategories(params?: { lang?: string }): FetchResponse<Array<CristinResultCategory>>;

      fetchInstitutions(params: GetInstitutionsParams): FetchResponse<ListOfInstitutions>;
      fetchInstitution(params: GetSingleParams): Institution;

      fetchUnits(params: GetUnitsParams): FetchResponse<ListOfUnits>;
      fetchUnit(params: GetSingleParams): Unit;
    }

    interface GetSingleParams {
      id: string | number;
      lang?: string;
    }

    interface GetPersonsParams {
      id?: string;
      national_id?: string;
      name?: string;
      institution?: string;
      parent_unit_id?: string;
      levels?: string;
      user?: string;
      page?: string;
      per_page?: string;
    }

    interface GetProjectsParams {
      id?: string;
      title?: string;
      institution?: string;
      user?: string;
      biobank?: string;
      project_manager?: string;
      participant?: string;
      approval_reference_id?: string;
      approved_by?: string;
      modified_since?: string;
      keyword?: string;
      unit?: string;
      parent_unit_id?: string;
      levels?: string;
      status?: string;
      project_code?: string;
      funding_source?: string;
      funding?: string;
      lang?: string;
      page?: string;
      per_page?: string;
      sort?: string;
    }

    interface GetResultsParams {
      id?: string;
      doi?: string;
      title?: string;
      contributor?: string;
      issn?: string;
      unit?: string;
      institution?: string;
      user?: string;
      category?: string;
      published_since?: string;
      published_before?: string;
      created_since?: string;
      created_before?: string;
      modified_since?: string;
      modified_before?: string;
      year_reported?: string;
      project_code?: string;
      funding_source?: string;
      funding?: string;
      lang?: string;
      page?: string;
      per_page?: string;
      sort?: string;
      fields?: "all";
    }

    interface GetInstitutionsParams {
      id?: string;
      name?: string;
      country?: string;
      cristin_institution?: "true" | "false";
      lang?: string;
      page?: string;
      per_page?: string;
    }

    interface GetUnitsParams {
      id?: string;
      name?: string;
      institution?: string;
      parent_unit_id?: string;
      levels?: string;
      lang?: string;
      page?: string;
      per_page?: string;
    }
  }

  const cristinServiceLib: cristinServiceLib.CristinServiceLibrary;
  export = cristinServiceLib;
}

declare module "*/lib/cristin/utils/repos" {
  namespace cristinUtilsReposLib {
    type RepoConnection = import("/lib/xp/node").RepoConnection;

    interface CristinNode<Data> {
      _name: string;
      data: Data;
      topics?: Array<string>;
      hidden?: boolean;
    }

    interface SaveToRepoParams<NodeData> {
      id: string;
      connection: RepoConnection;
      data?: NodeData;
    }

    interface CristinUtilReposLibrary {
      ensureRepoExist(repoName: string): boolean;
      getNodeByDataId(
        connection: RepoConnection,
        ids: string | Array<string>
      ): Array<import("/lib/xp/node").NodeQueryHit>;
      getEntriesByName<NodeData>(
        repoId: string,
        name: Array<string>
      ): Array<NodeData & import("/lib/xp/node").RepoNode>;
      saveToRepo<NodeData>({ data, id, connection }: SaveToRepoParams<NodeData>): NodeData | void;
    }
  }

  const cristinUtilsReposLib: cristinUtilsReposLib.CristinUtilReposLibrary;
  export = cristinUtilsReposLib;
}
