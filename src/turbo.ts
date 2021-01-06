import {XOR} from "./types";

export interface TurboStreamsLibrary {
  /**
   * Append some markup to a target id in the dom
   */
  append(params: TurboStreamsUpdateParams): void;

  /**
   * Prepend some markup to a target id in the dom
   */
  prepend(params: TurboStreamsUpdateParams): void;

  /**
   * Replace some markup at a target id in the dom
   */
  replace(params: TurboStreamsUpdateParams): void;

  /**
   * Remove an element with a target id from the dom
   */
  remove(params: TurboStreamsRemoveParams): void;

  /**
   * Returns a page contribution that initializes the turbo stream frontend connecting it to the "turbo-streams" service,
   * or another service specified by the developer.
   */
  getTurboStreamPageContribution(params?: GetTurboStreamPageContributionParams): Array<string>;
}

interface BySocketId {
  /**
   * The web socket id to send to.
   * Default value is socket id stored on user session by websocket service
   */
  socketId: string;
}

interface ByGroupId {
  /**
   * A group of web socket connections to send content to
   */
  groupId?: string;
}

type Id = XOR<BySocketId, ByGroupId>;

export type TurboStreamsUpdateParams = {
  /**
   * Dom ID to update
   */
  target: string;

  /**
   * The new content to insert into the dom
   */
  content: string;
} & Id

export type TurboStreamsRemoveParams = {
  /**
   * Dom ID to update
   */
  target: string;
} & Id

export interface GetTurboStreamPageContributionParams {
  readonly service: string;
}
