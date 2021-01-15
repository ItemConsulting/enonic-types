export interface EventLibrary {
  listener<EventData extends object = EnonicEventData>(params: ListenerParams<EventData>): null;
  send(params: SendParams): null;
}

export interface ListenerParams<EventData extends object = EnonicEventData> {
  readonly type?: EnonicEventTypes | string;
  readonly callback: (event: EnonicEvent<EventData>) => void;
  readonly localOnly?: boolean;
}

export interface SendParams {
  readonly type?: EnonicEventTypes | string;
  readonly distributed?: boolean;
  readonly data?: object;
}

export interface EnonicEvent<EventData extends object = EnonicEventData> {
  readonly type: EnonicEventTypes | string;
  readonly timestamp: number;
  readonly localOrigin: boolean;
  readonly distributed: boolean;
  readonly data: EventData;
}

export interface EnonicEventData {
  readonly nodes: ReadonlyArray<{
    readonly id: string;
    readonly path: string;
    readonly branch: string;
    readonly repo: string;
    readonly newPath?: string; // for type="node.moved", type="node.renamed"
  }>;
  readonly state?: string; // for type="node.stateUpdated"
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
  | "node.permissionsUpdated"
