import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type RoleParams = {
  rolename?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export interface RoleListItem {
  id: string;
  rolename: string;
  rolevalue: string;
  status: number;
  orderno: string;
  createtime: string;
}

export interface RoleItem {
  id: string;
  relename: string;
  status: string;
  remark: string;
  menu: string[];
}

/**
 * @description: Request list return value
 */

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

