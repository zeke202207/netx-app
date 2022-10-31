import {
  ApiPageParams,
  ApiPageListResultModel,
  ApiItem,
  ApiListItem,
  ApiParam,
} from './model/appinterfaceModel';
import { defHttp } from '/@/utils/http/axios';

enum Api { 
  ApiPageList = '/api/getapipagelist',
  ApiList = '/api/getapilist',
  AddApi = '/api/addapi',
  UpdateApi = '/api/updateapi',
  RemoveApi = '/api/removeapi',
}

export const getApiList = (params?: ApiParam) =>
  defHttp.post<ApiListItem>({ url: Api.ApiList, params });

export const getApiListByPage = (params?: ApiPageParams) =>
  defHttp.post<ApiPageListResultModel>({ url: Api.ApiPageList, params });

export const addApi = (params?: ApiItem) => defHttp.post<boolean>({ url: Api.AddApi, params });

export const updateApi = (params?: ApiItem) =>
  defHttp.post<boolean>({ url: Api.UpdateApi, params });
  
export const removeApi = (id?: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveApi, params: { id } });