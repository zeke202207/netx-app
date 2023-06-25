import {
  SchedulParams,
  SchedulListGetResultModel,
  ScheduleItem,
  SchedulListItem,
  SupportJobTypeList,
} from './model/schedulModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SchedulList = '/jobtask/getjoblist',
  GetSchedulById = '/jobtask/getjobbyid',
  AddSchedul = '/jobtask/addcronjob',
  RemoveSchedul = '/jobtask/removejob',
  SupportJobType = '/jobtask/getjobtasktype',
  ResumeJob = '/jobtask/resumejob',
  PauseJob = '/jobtask/pausejob',
  EnabledJob = '/jobtask/enabledjob',
}

export const getSchedulList = (params?: SchedulParams) =>
  defHttp.post<SchedulListGetResultModel>({ url: Api.SchedulList, params });

export const GetSchedulById = (id: string) =>
  defHttp.post<SchedulListItem>({ url: Api.GetSchedulById, params: { id } });

export const addSchedul = (params?: ScheduleItem) =>
  defHttp.post<boolean>({ url: Api.AddSchedul, params });

export const removeSchedul = (id: string) =>
  defHttp.post<boolean>({ url: Api.RemoveSchedul, params: { id } });

export const getAllSupportJobType = () =>
  defHttp.post<SupportJobTypeList>({ url: Api.SupportJobType });

export const resumeJob = (id: string) =>
  defHttp.post<SchedulListItem>({ url: Api.ResumeJob, params: { id } });

export const pauseJob = (id: string) =>
  defHttp.post<SchedulListItem>({ url: Api.PauseJob, params: { id } });

export const enabledJob = (id: string, enabled: boolean) =>
  defHttp.post({ url: Api.EnabledJob, params: { id, enabled } });
