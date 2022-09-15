import type { PrincipalKeyUser } from "@item-enonic-types/lib-xp-auth";

declare global {
  interface XpLibraries {
    "/lib/xp/auditlog": typeof import("./index");
  }
}

/**
 * This library provides functions for audit log management.
 * @since 7.2.0
 */
/**
 * This function creates a single audit log entry.
 */
export function log<Data>(params: LogParams): LogEntry<Data>;

/**
 * This function fetches an audit log entry.
 */
export function get<Data = DefaultData>(params: GetParams): LogEntry<Data>;

/**
 * This function searches for entries in the audit log.
 */
export function find<Data = DefaultData>(params: FindParams): Array<LogEntry<Data>>;

export interface DefaultData {
  params: Record<string, unknown>;
  result: Record<string, unknown>;
}

export interface LogEntry<Data = DefaultData> {
  /**
   * Log entry id
   */
  _id: string;

  /**
   * Type of log entry.
   */
  type: string;

  /**
   * Log entry timestamp.
   */
  time: string;

  /**
   * Log entry source.
   */
  source: string;

  /**
   *Log entry user.
   */
  user: PrincipalKeyUser;

  /**
   * URIs to objects that relate to this log entry.
   */
  objects: Array<string>;

  /**
   * Custom extra data for the this log entry.
   */
  data: Data;
}

export interface LogParams<Data = unknown> {
  /**
   * Type of log entry.
   */
  type: string;

  /**
   * Log entry timestamp. Defaults to now.
   */
  time?: string;

  /**
   * Log entry source. Defaults to the application ID.
   */
  source?: string;

  /**
   *Log entry user. Defaults to the user of current context.
   */
  user?: string;

  /**
   * URIs to objects that relate to this log entry. Defaults to empty array.
   */
  objects?: Array<string>;

  /**
   * Custom extra data for the this log entry. Defaults to empty object.
   */
  data?: Data;
}

export interface GetParams {
  /**
   * Id of the audit log entry.
   */
  id: string;
}

export interface FindParams {
  /**
   * Start index (used for paging)
   */
  start?: number;

  /**
   * Number of entries to fetch
   */
  count?: number;

  /**
   * Filter by entry ids
   */
  ids?: Array<string>;

  /**
   * Filter by entries earlier than from
   */
  from?: string;

  /**
   * Filter by entries later than to
   */
  to?: string;

  /**
   * Filter by type
   */
  type?: string;

  /**
   * Filter by source
   */
  source?: string;

  /**
   * Filter by user keys
   */
  users?: Array<string>;

  /**
   * Filter by object URIs
   */
  objects?: Array<string>;
}
