/**
 * Create documents
 */
export function create<Data extends CreateData>(data: Data, options: CreateOptions): Data;

/**
 * Update documents
 */
export function update<Data extends UpdateData>(data: Data, options: UpdateOptions): Data;

interface CreateData {
  _name: string;
}

interface CreateOptions {
  boolRequireValid?: boolean;
  connection: import("../../xp/node").RepoConnection;
}

interface UpdateData {
  _name: string;
}

interface UpdateOptions {
  boolPartial?: boolean;
  boolRequireValid?: boolean;
  connection: import("../../xp/node").RepoConnection;
}
