import {XOR} from "./types";

export interface TurboStreamsLibrary {
  /**
   * Default group that all websocket connections in the "turbo-stream" service is registered to
   */
  DEFAULT_GROUP_ID: "turbo-streams";

  /**
   * Append some markup to a target id in the dom
   */
  append(params: TurboStreamsParams): void;

  /**
   * Prepend some markup to a target id in the dom
   */
  prepend(params: TurboStreamsParams): void;

  /**
   * Replace some markup at a target id in the dom
   */
  replace(params: TurboStreamsParams): void;

  /**
   * Remove an element with a target id from the dom
   */
  remove(params: TurboStreamsParamsWithoutContent): void;

  /**
   * Returns a page contribution that initializes the turbo stream frontend connecting it to the "turbo-streams" service,
   * or another service specified by the developer.
   */
  getTurboStreamPageContribution(params?: GetTurboStreamPageContributionParams): Array<string>;
}

/**
 * Send message trough a socket specified by a socket id
 */
interface BySocketId {
  /**
   * The web socket id to send to.
   * Default value is socket id stored on user session by websocket service
   */
  readonly socketId: string;
}

/**
 * Send message trough a group of sockets specified by the group id
 */
interface ByGroupId {
  /**
   * A group of web socket connections to send content to
   */
  readonly groupId?: string;
}

/**
 * Parameters for "append", "prepend" and "replace". It takes either "socketId" or "groupId".
 *
 * If neither is specified it falls back to the default group. The default group has a name based on the session
 * key from the request. If the "turbo-streams"-service was used this is the group registered with the web socket.
 */
export type TurboStreamsParams = {
  /**
   * Dom ID to update
   */
  readonly target: string;

  /**
   * The new content to insert into the dom
   */
  readonly content: string;
} & XOR<BySocketId, ByGroupId>;

/**
 * Parameters for the "remove" action. It is the same as for the other actions, but without the "content" property.
 */
export type TurboStreamsParamsWithoutContent = Omit<TurboStreamsParams, "content">;

/**
 * Params for configuring page contributions
 */
export interface GetTurboStreamPageContributionParams {
  readonly service: string;
}
