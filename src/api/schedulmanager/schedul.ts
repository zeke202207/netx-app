import {
  SchedulParams,
  SchedulListGetResultModel,
  ScheduleItem,
  SchedulListItem,
} from './model/schedulModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  SchedulList = '/jobtask/getjoblist',
  GetSchedulById = '/jobtask/getjobbyid',
  AddSchedul = '/jobtask/addcronjob',
  UpdateSchedul = '/jobtask/pausejob',
  ResumeSchedul = '/jobtask/resumejob',
  RemoveSchedul = '/jobtask/removejob',
}

export const getSchedulList = (params?: SchedulParams) =>
  defHttp.post<SchedulListGetResultModel>({ url: Api.SchedulList, params });

export const GetSchedulById = (id: string) =>
  defHttp.post<SchedulListItem>({ url: Api.GetSchedulById, params: { id } });

export const addSchedul = (params?: ScheduleItem) =>
  defHttp.post<boolean>({ url: Api.AddSchedul, params });

export const updateSchedul = (params?: ScheduleItem) =>
  defHttp.post<boolean>({ url: Api.UpdateSchedul, params });

export const resumeSchedul = (id: string) =>
  defHttp.post<boolean>({ url: Api.ResumeSchedul, params: { id } });

export const removeSchedul = (id: string) =>
  defHttp.post<boolean>({ url: Api.RemoveSchedul, params: { id } });
