import {XOR} from "./types";
import {Request} from "./controller";

export interface TurboStreamsLibrary {
  /**
   * Default group that all websocket connections in the "turbo-stream" service is registered to
   */
  DEFAULT_GROUP_ID: "turbo-streams";

  /**
   * Mime type to use when returning Turbo Streams over HTTP
   */
  MIME_TYPE_TURBO_STREAMS: "text/vnd.turbo-stream.html";

  /**
   * Append some markup to a target id in the dom over web socket
   */
  append(params: TurboStreamsParams): void;

  /**
   * Prepend some markup to a target id in the dom over web socket
   */
  prepend(params: TurboStreamsParams): void;

  /**
   * Replace some markup at a target id in the dom over web socket
   */
  replace(params: TurboStreamsParams): void;

  /**
   * Updates some markup inside a target with the id in the dom over web socket
   */
  update(params: TurboStreamsParams): void;

  /**
   * Remove an element with a target id from the dom over web socket
   */
  remove(params: TurboStreamsRemoveParams): void;

  /**
   * Returns a url to a service, but using the web socket protocols
   */
  getWebSocketUrl(params?: GetWebSocketUrlParams): string;

  /**
   * Returns a websocket group name specific for the user, based on the user session number
   */
  getUsersPersonalGroupName(): string;

  /**
   * Guard that verifies that an object is of type TurboStreamAction
   */
  isTurboStreamAction(v: unknown): v is TurboStreamAction;

  /**
   * Serializes actions to frames that can be sent over the wire
   */
  serialize(action: TurboStreamAction): string;
  serialize(actions: Array<TurboStreamAction>): string;
  serialize(actions: TurboStreamAction | Array<TurboStreamAction>): string;

  /**
   * Checks the request header if the response can be of mime type "text/vnd.turbo-stream.html"
   */
  acceptTurboStreams(req: Request): boolean;
}

/**
 * Action of type "append", "prepend" or "replace" that can be serialized into a turbo stream action frame
 */
export interface TurboStreamChangeAction {
  /**
   * Action to perform
   */
  action: "append" | "prepend" | "replace" | "update";

  /**
   * Dom ID to update
   */
  target: string;

  /**
   * The new content to insert into the dom
   */
  content: string;
}

/**
 * Action of type "remove" that can be serialized into a turbo stream action frame
 */
export interface TurboStreamRemoveAction {
  /**
   * Action to perform
   */
  action: "remove";

  /**
   * Dom ID to update
   */
  target: string;
}

/**
 * Type that can be serialized into a turbo stream action frame
 */
export type TurboStreamAction = TurboStreamChangeAction | TurboStreamRemoveAction;

/**
 * Parameters for "append", "prepend" and "replace". It takes either "socketId" or "groupId".
 *
 * If neither is specified it falls back to the default group. The default group has a name based on the session
 * key from the request. If the "turbo-streams"-service was used this is the group registered with the web socket.
 */
export type TurboStreamsParams = Omit<TurboStreamChangeAction, "action"> & SendByWebSocketTarget;

/**
 * Parameters for "remove". It takes either "socketId" or "groupId".
 *
 * If neither is specified it falls back to the default group. The default group has a name based on the session
 * key from the request. If the "turbo-streams"-service was used this is the group registered with the web socket.
 */
export type TurboStreamsRemoveParams = Omit<TurboStreamRemoveAction, "action"> & SendByWebSocketTarget;

/**
 * Send message trough a socket specified by a socket id
 */
interface BySocketId {
  /**
   * The web socket id to send to.
   * Default value is socket id stored on user session by websocket service
   */
  socketId: string;
}

/**
 * Send message trough a group of sockets specified by the group id
 */
interface ByGroupId {
  /**
   * A group of web socket connections to send content to
   */
  groupId?: string;
}

/**
 * Object with either "socketId" or "groupId" parameter
 */
type SendByWebSocketTarget = XOR<BySocketId, ByGroupId>;

/**
 * Params for configuring web socket urls
 */
export interface GetWebSocketUrlParams {
  service: string;
}
