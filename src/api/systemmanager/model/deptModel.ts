import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type DeptParams = BasicPageParams & {
  deptname?: string;
  status?: string;
};

export interface DeptListItem {
  id: string;
  orderno: string;
  createtime: string;
  remark: string;
  status: number;
}

export interface DeptItem {
  deptname: string;
  parentid: string;
  orderno: string;
  status: number;
  remark: string;
}

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;