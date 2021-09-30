declare module "*/lib/xp/task" {
  namespace taskLib {
    /**
     * Functions for execution of asynchronous tasks.
     */
    interface TaskLibrary {
      /**
       * Returns the current state and progress details for the specified task.
       */
      get(taskId: string): TaskInfo;

      /**
       * Checks if any task with the given name or id is currently running.
       */
      isRunning(task: string): boolean;

      /**
       * Returns the list of running tasks with their current state and progress details.
       */
      list(params?: ListParams): ReadonlyArray<TaskInfo>;

      /**
       * Reports progress information from an executing task.
       * This function may only be called within the context of a task function,
       * otherwise it will fail and throw an exception.
       */
      progress(params: Partial<ProgressParams>): void;

      /**
       * Causes the current execution thread to sleep (temporarily cease execution)
       * for the specified number of milliseconds.
       */
      sleep(timeMillis: number): void;

      /**
       * Submits an inlined task (function) to be executed in the background. Returns an id representing the task.
       * This function returns immediately. The callback function will be executed asynchronously.
       * @deprecated Please use {@link executeFunction}.
       */
      submit(params: SubmitParams): string;

      /**
       * Runs a task function in the background and returns an id representing the task.
       * This function returns immediately. The callback function will be executed asynchronously.
       * @since 7.7.0
       */
      executeFunction(params: ExecuteFunctionParams): string;

      /**
       * Submits a named task to be executed in the background and returns an id representing the task.
       * This function returns immediately. The callback function will be executed asynchronously.
       * @deprecated Please use {@link submitTask}.
       */
      submitNamed<Config extends object = never>(params: SubmitNamedParams<Config>): string;

      /**
       * Submits a task to be executed in the background and returns an id representing the task.
       * This function returns immediately. The callback function will be executed asynchronously.
       */
      submitTask<Config extends object = never>(params: SubmitTaskParams<Config>): string;
    }

    export type TaskState = "WAITING" | "RUNNING" | "FINISHED" | "FAILED";

    export interface TaskInfo {
      /**
       * Task Id
       */
      readonly id: string;

      /**
       * Task name
       */
      readonly name: string;

      /**
       * Task description
       */
      readonly description: string;

      /**
       * Task state
       */
      readonly state: TaskState;

      /**
       * Application containing the callback function to run
       */
      readonly application: string;

      /**
       * Key of the user that submitted the task
       */
      readonly user: string;

      /**
       * Time when the task was submitted (in ISO-8601 format)
       */
      readonly startTime: string;

      /**
       * Progress information provided by the running task
       */
      readonly progress: ProgressParams;
    }

    export interface ListParams {
      /**
       * Filter by name
       */
      name?: string;

      /**
       * Filter by task state
       */
      state?: TaskState;
    }

    export interface ProgressParams {
      /**
       * Integer value representing the number of items that have been processed in the task
       */
      current: number;

      /**
       * Integer value representing the total number of items to process in the task
       */
      total: number;

      /**
       * Text describing the current progress for the task
       */
      info: string;
    }

    /**
     * @deprecated
     */
    export interface SubmitParams {
      /**
       * Text describing the task to be executed
       */
      description: string;

      /**
       * Callback function to be executed asynchronously
       */
      task: () => void;
    }

    /**
     * @since 7.7.0
     */
    export interface ExecuteFunctionParams {
      /**
       * Text describing the task to be executed
       */
      description: string;

      /**
       * Callback function to be executed asynchronously.
       */
      func: () => void;
    }

    /**
     * @deprecated
     */
    export interface SubmitNamedParams<Config extends object = never> {
      /**
       * Name of the task to execute.
       * Name can be relative to the current application, or a fully qualified task name (<appname>:<taskname>)
       */
      name: string;

      /**
       * Configuration parameters to pass to the task to be executed.
       * The object must be valid according to the schema defined in the form of the task descriptor XML.
       */
      config?: Config;
    }

    /**
     * @since 7.7.0
     */
    export interface SubmitTaskParams<Config extends object = never> {
      /**
       * Name of the task to execute.
       * Name can be relative to the current application, or a fully qualified task name (<appname>:<taskname>)
       */
      descriptor: string;

      /**
       * Configuration parameters to pass to the task to be executed.
       * The object must be valid according to the schema defined in the form of the task descriptor XML.
       */
      config?: Config;
    }
  }

  const taskLib: taskLib.TaskLibrary;
  export = taskLib;
}
