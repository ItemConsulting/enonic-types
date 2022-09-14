declare global {
  interface XpLibraries {
    "/lib/xp/cluster": typeof import("./index");
  }
}

/**
 * Tests whether the current node is the master node in the cluster.
 * Cluster with multiple master nodes will only return true on the elected node.
 */
export function isMaster(): boolean;
