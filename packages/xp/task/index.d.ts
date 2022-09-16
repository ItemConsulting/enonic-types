import type {
  SubmitNamedTaskParams as OriginalSubmitNamedTaskParams,
  SubmitTaskParams as OriginalSubmitTaskParams,
} from "@enonic-types/lib-task";
export { submit, executeFunction, list, get, sleep, progress, isRunning } from "@enonic-types/lib-task";

export type SubmitNamedTaskParams<Config extends object = never> = Omit<OriginalSubmitNamedTaskParams, "config"> & {
  config?: Config;
};

/**
 * @deprecated Please use {@link submitTask}.
 *
 * Submits a named task to be executed in the background and returns an id representing the task.
 *
 * This function returns immediately. The callback function will be executed asynchronously.
 *
 * @example-ref examples/task/submitNamed.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.name Name of the task to execute.
 * @param {object} [params.config] Configuration parameters to pass to the task to be executed.
 * The object must be valid according to the schema defined in the form of the task descriptor XML.
 * @returns {string} Id of the task that will be executed.
 */
export function submitNamed<Config extends object = never>(params: SubmitNamedTaskParams<Config>): string;

export type SubmitTaskParams<Config extends object = never> = Omit<OriginalSubmitTaskParams, "config"> & {
  config?: Config;
};

/**
 * Submits a task to be executed in the background and returns an id representing the task.
 *
 * This function returns immediately. The callback function will be executed asynchronously.
 *
 * @example-ref examples/task/submitTask.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.descriptor Descriptor of the task to execute.
 * @param {object} [params.config] Configuration parameters to pass to the task to be executed.
 * The object must be valid according to the schema defined in the form of the task descriptor XML.
 * @returns {string} Id of the task that will be executed.
 */
export function submitTask<Config extends object = never>(params: SubmitTaskParams<Config>): string;
