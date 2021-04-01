import {RunContext} from "./context";
import {XOR} from "./types";

export interface CronLibrary {
  /**
   * Schedule a task
   */
  schedule(params: ScheduleParams): void;

  /**
   * Rescheduling will stop a scheduled task by the name and rerun it
   */
  reschedule(params: ScheduleParams): void;

  /**
   * Unschedule a scheduled task:
   */
  unschedule(params: UnscheduleParams): void;

  /**
   * Get an instance of a particular task
   */
  get(params: GetParams): TaskMapper;

  /**
   * Fetch a list of all scheduled tasks
   */
  list(): ReadonlyArray<TaskMapper>;
}

export type ScheduleParams = XOR<ScheduleByCron, ScheduleByDelay>;

export interface ScheduleByCron {
  /**
   *  Unique task name.
   */
  readonly name: string;

  /**
   * Cron-pattern (https://en.wikipedia.org/wiki/Cron).
   */
  readonly cron: string;

  /**
   * Number of task runs. Leave it empty for infinite calls.
   */
  readonly times?: number;

  /**
   * Code of task which should be called.
   */
  readonly callback: () => void;

  /**
   * Context of the task run.
   */
  readonly context?: CronRunContext;
}

export interface ScheduleByDelay {
  /**
   *  Unique task name.
   */
  readonly name: string;

  /**
   * The delay between the termination of one execution and the commencement of the next.
   */
  readonly fixedDelay: number;

  /**
   * The time to delay first execution.
   */
  readonly delay: number;

  /**
   * Number of task runs. Leave it empty for infinite calls.
   */
  readonly times?: number;

  /**
   * Code of task which should be called.
   */
  readonly callback: () => void;

  /**
   * Context of the task run.
   */
  readonly context?: CronRunContext;
}

export interface UnscheduleParams {
  /**
   * Name of a scheduled task.
   */
  readonly name: string;
}

export interface GetParams {
  /**
   * Name of a scheduled task.
   */
  readonly name: string;
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

export type CronRunContext = Omit<RunContext, 'user'> & {
  readonly user?: {
    readonly login?: string;
    readonly userStore?: string;
  }
};
