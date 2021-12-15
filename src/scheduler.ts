declare module "*/lib/xp/scheduler" {
  namespace schedulerLib {
    type PrincipalKeyUser = import("/lib/xp/auth").PrincipalKeyUser;
    /**
     * @since 7.7.0
     */
    interface SchedulerLibrary {
      /**
       * Returns scheduled job with the specified name.
       */
      get<Config = never>(params: GetScheduledJobParams): ScheduledJob<Config> | null;

      /**
       * Returns the list of scheduled jobs.
       */
      list<Config = never>(): Array<ScheduledJob<Config>>;

      /**
       * Creates a scheduled job .
       */
      create<Config = never>(params: CreateScheduledJobParams<Config>): ScheduledJob<Config>;

      /**
       * Modifies a job. The previous task will be rescheduled, lastRun and lastTaskId properties will be cleaned.
       */
      modify<Config = never>(params: ModifyScheduledJobParams<Config>): ScheduledJob<Config>;

      /**
       * Deletes a scheduled job.
       */
      delete(params: DeleteScheduledJobParams): boolean;
    }

    export interface GetScheduledJobParams {
      /**
       * Name of job to get
       */
      name: string;
    }

    export type ScheduleTypeCron = {
      /**
       * Schedule value according to it's type.
       */
      value: string;

      /**
       * Schedule type
       */
      type: "CRON";

      /**
       * Time zone of cron scheduling.
       */
      timeZone: string;
    };

    export type ScheduleTypeOneTime = {
      /**
       * Schedule value according to it's type.
       */
      value: string;

      /**
       * Schedule type
       */
      type: "ONE_TIME";
    };

    export interface CreateScheduledJobParams<Config = never> {
      /**
       * Unique job name.
       */
      name: string;

      /**
       * Job description.
       */
      description?: string;

      /**
       * Descriptor of the task to be scheduled.
       */
      descriptor: string;

      /**
       * Config of the task to be scheduled.
       */
      config?: Config;

      /**
       * Task time run config
       */
      schedule: import("./types").XOR<ScheduleTypeCron, ScheduleTypeOneTime>;

      /**
       * Key of the user that submitted the task.
       */
      user?: PrincipalKeyUser;

      /**
       * Job is active or not.
       */
      enabled: boolean;
    }

    export interface ModifyScheduledJobParams<Config = never> {
      /**
       * Unique job name.
       */
      name: string;

      /**
       * Editor callback function, has editable existing job as a param.
       */
      editor(scheduledJob: ScheduledJob<Config>): ScheduledJob<Config>;
    }

    export interface DeleteScheduledJobParams {
      /**
       * Job to be deleted name.
       */
      name: string;
    }

    export interface ScheduledJob<Config = never> {
      /**
       * Job name
       */
      name: string;

      /**
       * Job description
       */
      description?: string;

      /**
       * Descriptor of the task to be scheduled
       */
      descriptor: string;

      /**
       * Config of the task to be scheduled
       */
      config: Config;

      /**
       * Task time run config
       */
      schedule: import("./types").XOR<ScheduleTypeCron, ScheduleTypeOneTime>;

      /**
       * Principal key of the user that submitted the task
       */
      user: PrincipalKeyUser;

      /**
       * Job is active or not
       */
      enabled: boolean;

      /**
       * Principal key of user that created the task
       */
      creator: PrincipalKeyUser;

      /**
       * Principal key of the last user that modified the task
       */
      modifier: PrincipalKeyUser;

      /**
       * Time of the task creation
       */
      createdTime: string;

      /**
       * Time of the last task modification
       */
      modifiedTime: string;

      /**
       * Time of the last job run
       */
      lastRun: string;

      /**
       * Task id of the last job run
       */
      lastTaskId: string;
    }
  }

  const schedulerLib: schedulerLib.SchedulerLibrary;
  export = schedulerLib;
}
