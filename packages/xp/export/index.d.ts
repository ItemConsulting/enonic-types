declare global {
  interface XpLibraries {
    "/lib/xp/export": typeof import("./index");
  }
}

/**
 * Import nodes from a nodes-export.
 * Could be used to import node-export from exports directory or from application resource files.
 * Optionally pre-transforms node XML node files with XSLT before import.
 */
export function importNodes(params: ImportNodesParams): ImportNodesResult;

/**
 * Export nodes to a nodes-export.
 * Export is created in exports directory.
 */
export function exportNodes(params: ExportNodesParams): ExportNodesResult;

interface ImportNodesParams {
  /**
   * Either name of nodes-export located in exports directory or application resource key.
   */
  source: string | import("../../libs/thymeleaf").ResourceKey;

  /**
   * Target path for imported nodes.
   */
  targetNodePath: string;

  /**
   * XSLT file name in exports directory or application resource key. Used for XSLT transformation.
   */
  xslt?: string | import("../../libs/thymeleaf").ResourceKey;

  /**
   * Parameters used in XSLT transformation.
   */
  xsltParams?: unknown;

  /**
   * Set to true to use node IDs from the import, false to generate new node IDs.
   */
  includeNodeIds?: boolean;

  /**
   * Set to true to use Node permissions from the import, false to use target node permissions.
   */
  includePermissions?: boolean;

  /**
   * A function to be called before import starts with number of nodes to import.
   */
  nodeResolved: (importSize: number) => void;

  /**
   * A function to be called during import with number of nodes imported since last call.
   */
  nodeImported: (importedCount: number) => void;
}

interface ExportNodesParams {
  /**
   * Source nodes path.
   */
  sourceNodePath: string;

  /**
   * Export name.
   */
  exportName: string;

  /**
   * Set to true to export node IDs.
   */
  includeNodeIds: boolean;

  /**
   * Set to true to export all node versions.
   */
  includeVersions: boolean;

  /**
   * A function to be called before export starts with number of nodes to export.
   */
  nodeExported: (exportSize: number) => void;

  /**
   * A function to be called during export with number of nodes exported since last call.
   */
  nodeResolved: (exportedCount: number) => void;
}

interface ImportNodesResult {
  /**
   * Paths to the nodes added
   */
  addedNodes: Array<string>;

  /**
   * Paths to the nodes updated
   */
  updatedNodes: Array<string>;

  /**
   * Paths to the binaries imported
   */
  importedBinaries: Array<string>;

  /**
   * Errors during import
   */
  importErrors: Array<{
    /**
     * Type of exception
     */
    exception: string;

    /**
     * Message of the exception
     */
    message: string;

    /**
     * The stack trace of the exception
     */
    stacktrace: Array<string>;
  }>;
}

interface ExportNodesResult {
  /**
   * Paths of the exported nodes
   */
  exportedNodes: Array<string>;

  /**
   * Paths of the exported binaries
   */
  exportedBinaries: Array<string>;

  /**
   * List of errors
   */
  exportErrors: Array<string>;
}
