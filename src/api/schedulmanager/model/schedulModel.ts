import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type SchedulParams = BasicPageParams & {
  schedulname?: string;
};

export interface SchedulListItem {
  id: string;
  name: string;
  group: string;
  description: string;
  disAllowConcurrentExecution: number;
}

export interface ScheduleItem {
  id: string;
  job: SchedulJobItem;
  trigger: SchedulTriggerItem;
}

export interface SchedulJobItem {
  name: string;
  group: string;
  jobType: string;
  jobDataMap: string;
  description: string;
  disAllowConcurrentExecution: boolean;
}

export interface SchedulTriggerItem {
  name: string;
  description: string;
  cronExpression: string;
  startAt: Date | null;
  endAt: Date | null;
  startNow: boolean;
  priority: number;
}

export type SchedulListGetResultModel = BasicFetchResult<SchedulListItem>;
