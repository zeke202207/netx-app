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

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.post<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });
