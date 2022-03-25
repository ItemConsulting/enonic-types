declare module "*/lib/xp/event" {
  namespace eventLib {
    interface EventLibrary {
      /**
       * Adds an event listener to the system
       */
      listener<EventData extends object = EnonicEventData>(params: ListenerParams<EventData>): null;

      /**
       * Sends a custom event. All custom events are prefixed with "custom.".
       */
      send(params: SendParams): null;
    }

    export interface ListenerParams<EventData extends object = EnonicEventData> {
      /**
       * Event type pattern
       */
      type?: EnonicEventTypes | string;

      /**
       * Callback event listener
       */
      callback: (event: EnonicEvent<EventData>) => void;

      /**
       * Local events only (default to false)
       */
      localOnly?: boolean;
    }

    export interface SendParams {
      /**
       * Event type
       */
      type?: EnonicEventTypes | string;

      /**
       * `true` if it should be distributed in cluster
       */
      distributed?: boolean;

      /**
       * Additional data for event.
       */
      data?: object;
    }

    export interface EnonicEvent<EventData extends object = EnonicEventData> {
      readonly type: EnonicEventTypes | string;
      readonly timestamp: number;
      readonly localOrigin: boolean;
      readonly distributed: boolean;
      readonly data: EventData;
    }

    export interface EnonicEventData {
      readonly nodes: ReadonlyArray<EnonicEventDataNode>;
      readonly state?: string; // for type="node.stateUpdated"
    }

    export interface EnonicEventDataNode {
      readonly id: string;
      readonly path: string;
      readonly branch: string;
      readonly repo: string;
      readonly newPath?: string; // for type="node.moved", type="node.renamed"
    }

    export type EnonicEventTypes =
      | "node.created"
      | "node.deleted"
      | "node.pushed"
      | "node.duplicated"
      | "node.updated"
      | "node.moved"
      | "node.renamed"
      | "node.sorted"
      | "node.stateUpdated"
      | "node.permissionsUpdated";
  }

  const eventLib: eventLib.EventLibrary;
  export = eventLib;
}
