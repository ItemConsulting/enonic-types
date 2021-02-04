export interface WebsocketLibrary {
  /**
   * Add an id to a socket group.
   */
  addToGroup(group: string, id: string): void;

  /**
   * Remove an id from a socket group.
   */
  removeFromGroup(group: string, id: string): void;

  /**
   * Send message directly to a socket id.
   */
  send(id: string, message: string): void;

  /**
   * Send message to all sockets in group.
   */
  sendToGroup(group: string, message: string): void;

  /**
   * Get number of all sockets in group.
   * @since 7.6.0
   */
  getGroupSize(group: string): number;
}
