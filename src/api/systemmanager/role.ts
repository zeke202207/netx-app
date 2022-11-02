import {
  RoleParams,
  RolePageParams,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  RoleItem,
} from './model/roleModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  RolePageList = '/role/getrolelistbypage',
  GetAllRoleList = '/role/getallrolelist',
  AddRole = '/role/addrole',
  UpdateRole = '/role/updaterole',
  RemoveRole = '/role/removerole',
  SetRoleStatus = '/role/setrolestatus',
  SetRoleApiCheckStatus = '/role/setapiauthstatus',
  GetApiAuth = '/role/getapiauth',
  SetApiAuth = '/role/setapiauth',
}

export const addRole = (params?: RoleItem) => defHttp.post<boolean>({ url: Api.AddRole, params });

export const updateRole = (params?: RoleItem) =>
  defHttp.post<boolean>({ url: Api.UpdateRole, params });

export const removeRole = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveRole, params: { id } });

export const setRoleStatus = (id: string, status: string) =>
  defHttp.post({ url: Api.SetRoleStatus, params: { id, status } });

export const setApiCheckStatus = (id: string, status: string) =>
  defHttp.post({ url: Api.SetRoleApiCheckStatus, params: { id, status } });

export const getApiAuth = (id: string) => defHttp.post({ url: Api.GetApiAuth, params: { id } });

export const setApiAuth = (id: string, apiids: string[]) =>
  defHttp.post({ url: Api.SetApiAuth, params: { id, apiids } });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });
