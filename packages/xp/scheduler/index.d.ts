import type { PrincipalKeyUser } from "@item-enonic-types/lib-auth";
import type {
  CreateScheduledJobParams as OriginalCreateScheduledJobParams,
  ModifyScheduledJobParams as OriginalModifyScheduledJobParams,
  ScheduleJob as OriginalScheduleJob,
  EditorFn,
  GetScheduledJobParams,
} from "@enonic-types/lib-scheduler";
import { delete as _delete, ScheduleJob } from "@enonic-types/lib-scheduler";
export { _delete as delete };

export type ScheduleTypeCron = {
  type: "CRON";
  value: string;
  timeZone: string;
};

export type ScheduleTypeOneTime = {
  type: "ONE_TIME";
  value: string;
};

export type ScheduledJob<Config = never> = Omit<
  OriginalScheduleJob,
  "config" | "schedule" | "user" | "creator" | "modifier"
> & {
  config: Config;
  schedule: ScheduleTypeCron | ScheduleTypeOneTime;
  user: PrincipalKeyUser;
  creator: PrincipalKeyUser;
  modifier: PrincipalKeyUser;
};

export type CreateScheduledJobParams<Config = never> = Omit<OriginalCreateScheduledJobParams, "config"> & {
  config?: Config;
};

/**
 * Creates a job to be scheduled.
 *
 * @example-ref examples/scheduler/create.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.name unique job name.
 * @param {string} params.description job description.
 * @param {string} params.descriptor descriptor of the task to be scheduled.
 * @param {object} params.config config of the task to be scheduled.
 * @param {object} params.schedule task time run config.
 * @param {string} params.schedule.value schedule value according to it's type.
 * @param {string} params.schedule.type schedule type (CRON | ONE_TIME).
 * @param {string} params.schedule.timezone time zone of cron scheduling.
 * @param {string} params.user key of the user that submitted the task.
 * @param {boolean} params.enabled job is active or not.
 */
export function create<Config = never>(params: CreateScheduledJobParams<Config>): ScheduledJob<Config>;

type ModifyScheduledJobParams<Config = never> = Omit<OriginalModifyScheduledJobParams, "editor"> & {
  editor: EditorFn<ScheduledJob<Config>>;
};

/**
 * Modifies scheduled job.
 *
 * @example-ref examples/scheduler/modify.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.name unique job name.
 * @param {function} params.editor editor callback function, has editable existing job as a param.
 */
export function modify<Config = never>(params: ModifyScheduledJobParams<Config>): ScheduledJob<Config>;

/**
 * Fetches scheduled job.
 *
 * @example-ref examples/scheduler/get.js
 *
 * @param {object} params JSON with the parameters.
 * @param {string} params.name job to be deleted name.
 */
export function get<Config = never>(params: GetScheduledJobParams): ScheduledJob<Config> | null;

/**
 * Lists scheduled jobs.
 *
 * @example-ref examples/scheduler/list.js
 *
 */
export function list<Config = never>(): ScheduledJob<Config>[];
