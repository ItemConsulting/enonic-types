/**
 * Search for documents
 */
export function search<Hit>(params: SearchParams): SearchResult<Hit>;

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
