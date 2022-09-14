declare global {
  interface XpLibraries {
    "/lib/xp/websocket": typeof import("./index");
  }
}

/**
 * Add an id to a socket group.
 */
export function addToGroup(group: string, id: string): void;

/**
 * Remove an id from a socket group.
 */
export function removeFromGroup(group: string, id: string): void;

/**
 * Send message directly to a socket id.
 */
export function send(id: string, message: string): void;

/**
 * Send message to all sockets in group.
 */
export function sendToGroup(group: string, message: string): void;

/**
 * Get number of all sockets in group.
 * @since 7.6.0
 */
export function getGroupSize(group: string): number;
