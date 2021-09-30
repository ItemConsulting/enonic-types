declare module "*/lib/xp/cluster" {
  namespace clusterLib {
    /**
     * This library contains cluster related functions.
     */
    interface ClusterLibrary {
      /**
       * Tests whether the current node is the master node in the cluster.
       * Cluster with multiple master nodes will only return true on the elected node.
       */
      isMaster(): boolean;
    }
  }

  const clusterLib: clusterLib.ClusterLibrary;
  export = clusterLib;
}
