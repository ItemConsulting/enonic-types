/**
 * Creates an sql handler, with a connection pool to the database.
 *
 * @param params Connection parameters
 */
export function connect(params: SqlConnectParams): SqlHandler;

/**
 * Disposes of all handlers, and closes their connection pools. This is also done automatically when the application
 * is stopped.
 */
export function dispose(): void;

export interface SqlConnectParams {
  /**
   * JDBC URL of the database, e.g. "jdbc:postgresql://localhost:5432/mydb"
   */
  url: string;

  /**
   * Class name of the JDBC driver, e.g. "org.postgresql.Driver". The driver must be included in the application.
   */
  driver: string;

  /**
   * Maximum number of connections in the pool. Defaults to 10.
   */
  maxPoolSize?: number;

  /**
   * Minimum number of idle connections in the pool. Defaults to 0.
   */
  minPoolSize?: number;

  /**
   * Name of the connection pool, used in logging and monitoring
   */
  poolName?: string;

  /**
   * User name for the database
   */
  user?: string;

  /**
   * Password for the database
   */
  password?: string;
}

/**
 * Note: None of the functions support parameter binding, so the SQL is executed as is. Never concatenate user input
 * into the SQL, since that allows SQL injection.
 */
export interface SqlHandler {
  /**
   * Returns an array of results based on a query. The keys in each row are the lowercase column names.
   *
   * @param sql The SQL query
   * @param limit Maximum number of rows to return. If not set (or 0), all rows are returned.
   */
  query<A = Record<string, unknown>>(
    sql: string,
    limit?: number,
  ): SQLQueryResult<A>;

  /**
   * Returns the first result from a query. The keys in the row are the lowercase column names.
   *
   * Note: Throws an error if the query returns no rows.
   *
   * @param sql The SQL query
   */
  queryFirst<A = Record<string, unknown>>(sql: string): A;

  /**
   * Execute a simple insert statement
   *
   * @param sql The SQL insert statement
   * @returns The number of rows inserted
   */
  insert(sql: string): number;

  /**
   * Execute a simple update statement
   *
   * @param sql The SQL update statement
   * @returns The number of rows updated
   */
  update(sql: string): number;

  /**
   * Execute some SQL with no return value
   *
   * @param sql The SQL statement
   */
  execute(sql: string): void;
}

export interface SQLQueryResult<A> {
  /**
   * The number of results
   */
  readonly count: number;

  /**
   * An array of results
   */
  readonly result: Array<A>;
}
