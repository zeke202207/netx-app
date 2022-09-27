import exp from 'constants';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type ApiParam = {};

export type ApiPageParams = BasicPageParams & ApiParam;

export type ApiItem = {
  id?: string;
  path: string;
  group: string;
  method: string;
  description?: string;
};

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface AccountItem {
  id: string;
  deptId: string;
  email: string;
  nickName: string;
  remark: string;
  roleId: string;
  userName: string;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptItem {
  deptName: string;
  parentId: string;
  orderNo: string;
  status: number;
  remark: string;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface MenuItem {
  id: string;
  parentid: string;
  path: string;
  name: string;
  component: string;
  redirect: string;
  meta: string;
  icon: string;
  type: string;
  permission: string;
  orderNo: string;
  status: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

export interface RoleItem {
  id: string;
  relename: string;
  status: string;
  remark: string;
  menu: string[];
}

export interface ApiListItem {}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

export type ApiPageListResultModel = BasicFetchResult<ApiListItem>;
