import type { PrincipalKey } from "@item-enonic-types/lib-xp-auth";
import type { Context, ContextParams } from "@enonic-types/lib-context";

export type RunContext = Omit<ContextParams, "principals"> & {
  principals?: ReadonlyArray<PrincipalKey>;
};

/**
 * Runs a function within a specified context.
 *
 * @example-ref examples/context/run.js
 *
 * @param {object} context JSON parameters.
 * @param {string} [context.repository] Repository to execute the callback in. Default is the current repository set in portal.
 * @param {string} [context.branch] Name of the branch to execute the callback in. Default is the current branch set in portal.
 * @param {object} [context.user] User to execute the callback with. Default is the current user.
 * @param {string} context.user.login Login of the user.
 * @param {string} [context.user.idProvider] Id provider containing the user. By default, all the id providers will be used.
 * @param {array} [context.principals] Additional principals to execute the callback with.
 * @param {object} [context.attributes] Additional Context attributes.
 * @param {function} callback Function to execute.
 * @returns {object} Result of the function execution.
 */
export function run<Result>(context: RunContext, callback: () => Result): Result;

/**
 * Returns the current context.
 *
 * @example-ref examples/context/get.js
 *
 * @returns {object} Return the current context as JSON object.
 */
export function get(): Context;
