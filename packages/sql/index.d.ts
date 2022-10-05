/**
 * Creates an sql handler
 */
export function connect(params: SqlConnectParams): SqlHandler;

/**
 * Disposes of all handlers
 */
export function dispose(): void;

interface SqlConnectParams {
  url: string;
  driver: string;
  maxPoolSize?: number;
  minPoolSize?: number;
  poolName?: string;
  user?: string;
  password?: string;
}

interface SqlHandler {
  /**
   * Returns an array of results based on a query
   */
  query<A>(sql: string, limit?: number): SQLQueryResult<A>;

  /**
   * Returns the first result from a query
   */
  queryFirst<A>(sql: string): A;

  /**
   * Execute a simple insert statement
   * @return {number} the number of rows inserted
   */
  insert(sql: string): number;

  /**
   * Execute a simple update statement
   * @return {number} the number of updated inserted
   */
  update(sql: string): number;

  /**
   * Execute some SQL with no return value
   */
  execute(sql: string): void;
}

interface SQLQueryResult<A> {
  /**
   * The number of results
   */
  readonly count: number;

  /**
   * An array of results
   */
  readonly result: Array<A>;
}
