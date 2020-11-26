/**
 * This library contains cluster related functions.
 */
export interface ClusterLibrary {
  /**
   * Tests whether the current node is the master node in the cluster.
   * Cluster with multiple master nodes will only return true on the elected node.
   */
  isMaster(): boolean;
}
