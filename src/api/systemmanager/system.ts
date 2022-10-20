import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  DeptItem,
  MenuItem,
  AccountItem,
  RoleItem,
  ApiPageParams,
  ApiPageListResultModel,
  ApiItem,
  ApiListItem,
  ApiParam,
  LoggingPageParam,
  LoggingListItem,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/account/getAccountList',
  RolePageList = '/role/getRoleListByPage',
  GetAllRoleList = '/role/getAllRoleList',

  IsAccountExist = '/account/isAccountExist',
  AddAccount = '/account/AddAccount',
  UpdateAccount = '/account/UpdateAccount',
  RemoveAccount = '/account/RemoveAccount',

  DeptList = '/dept/getDeptList',
  AddDept = '/dept/addDept',
  UpdateDept = '/dept/updateDept',
  RemoveDept = '/dept/RemoveDept',

  MenuList = '/menu/getMenuList',
  AddMenu = '/menu/addMenu',
  UpdateMenu = '/menu/updateMenu',
  RemoveMenu = '/menu/removeMenu',

  AddRole = '/role/addRole',
  UpdateRole = '/role/updateRole',
  RemoveRole = '/role/removeRole',
  SetRoleStatus = '/role/setRoleStatus',
  SetRoleApiCheckStatus = '/role/setapiauthstatus',
  GetApiAuth = '/role/getapiauth',
  SetApiAuth = '/role/setapiauth',

  ApiPageList = '/api/getApiPageList',
  ApiList = '/api/getApiList',
  AddApi = '/api/addapi',
  UpdateApi = '/api/updateapi',
  RemoveApi = '/api/removeapi',

  loggingPageList = '/logging/getloglist',
}

/** dept***/
export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });
export const addDept = (params?: DeptItem) => defHttp.post<boolean>({ url: Api.AddDept, params });
export const updateDept = (params?: DeptItem) =>
  defHttp.post<boolean>({ url: Api.UpdateDept, params });
export const removeDept = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveDept, params: { id } });

/** menu */
export const getMenuList = (params?: MenuParams) =>
  defHttp.post<MenuListGetResultModel>({ url: Api.MenuList, params });
export const addMenu = (params?: MenuItem) => defHttp.post<boolean>({ url: Api.AddMenu, params });
export const updateMenu = (params?: MenuItem) =>
  defHttp.post<boolean>({ url: Api.UpdateMenu, params });
export const removeMenu = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveMenu, params: { id } });

/** account */
export const isAccountExist = (account: string) =>
  defHttp.get({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
export const addAccount = (params?: AccountItem) =>
  defHttp.post<boolean>({ url: Api.AddAccount, params });
export const updateAccount = (params?: AccountItem) =>
  defHttp.post<boolean>({ url: Api.UpdateAccount, params });
export const removeAccount = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveAccount, params: { id } });

/** role */
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

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

/** API */
export const getApiList = (params?: ApiParam) =>
  defHttp.post<ApiListItem>({ url: Api.ApiList, params });
export const getApiListByPage = (params?: ApiPageParams) =>
  defHttp.post<ApiPageListResultModel>({ url: Api.ApiPageList, params });
export const addApi = (params?: ApiItem) => defHttp.post<boolean>({ url: Api.AddApi, params });
export const updateApi = (params?: ApiItem) =>
  defHttp.post<boolean>({ url: Api.UpdateApi, params });
export const removeApi = (id?: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveApi, params: { id } });