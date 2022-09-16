import type { XOR } from "@item-enonic-types/utils";
import type { RunContext } from "@item-enonic-types/lib-context";

/**
 * Since 7.7.0 you can use {@link SchedulerLibrary} to be safe for custers
 * https://discuss.enonic.com/t/scheduler-task-and-cron-what-to-use-where/2539/6
 */
/**
 * Schedule a task
 */
export function schedule(params: ScheduleParams): void;

/**
 * Rescheduling will stop a scheduled task by the name and rerun it
 */
export function reschedule(params: ScheduleParams): void;

/**
 * Unschedule a scheduled task:
 */
export function unschedule(params: UnscheduleParams): void;

/**
 * Get an instance of a particular task
 */
export function get(params: GetParams): TaskMapper;

/**
 * Fetch a list of all scheduled tasks
 */
export function list(): ReadonlyArray<TaskMapper>;

export type ScheduleParams = XOR<ScheduleByCron, ScheduleByDelay>;

export interface ScheduleByCron {
  /**
   *  Unique task name.
   */
  name: string;

  /**
   * Cron-pattern (https://en.wikipedia.org/wiki/Cron).
   */
  cron: string;

  /**
   * Number of task runs. Leave it empty for infinite calls.
   */
  times?: number;

  /**
   * Code of task which should be called.
   */
  callback: () => void;

  /**
   * Context of the task run.
   */
  context?: CronRunContext;
}

export interface ScheduleByDelay {
  /**
   *  Unique task name.
   */
  name: string;

  /**
   * The delay between the termination of one execution and the commencement of the next.
   */
  fixedDelay: number;

  /**
   * The time to delay first execution.
   */
  delay: number;

  /**
   * Number of task runs. Leave it empty for infinite calls.
   */
  times?: number;

  /**
   * Code of task which should be called.
   */
  callback: () => void;

  /**
   * Context of the task run.
   */
  context?: CronRunContext;
}

export interface UnscheduleParams {
  /**
   * Name of a scheduled task.
   */
  name: string;
}

export interface GetParams {
  /**
   * Name of a scheduled task.
   */
  name: string;
}

export interface TaskMapper {
  /**
   * Name of a scheduled task.
   */
  readonly name: string;

  /**
   * Cron-pattern.
   */
  readonly cron: string;

  /**
   * Human readable description of UINX cron pattern.
   */
  readonly cronDescription: string;

  /**
   * The delay between the termination of one execution and the commencement of the next.
   */
  readonly fixedDelay: number;

  /**
   * The time to delay first execution.
   */
  readonly delay: number;

  /**
   * Key of application has run the task.
   */
  readonly applicationKey: string;

  /**
   * Contains information about task context(repo, branch, authInfo).
   */
  readonly context: CronRunContext;

  /**
   * Provides nearest time for next execution in ISO 8601 format.
   */
  readonly nextExecTime: string;
}

export type CronRunContext = Omit<RunContext, "user"> & {
  user?: {
    login?: string;
    userStore?: string;
  };
};
