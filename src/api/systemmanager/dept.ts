import { DeptParams, DeptListGetResultModel, DeptItem } from './model/deptModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  DeptList = '/dept/getdeptlist',
  AddDept = '/dept/adddept',
  UpdateDept = '/dept/updatedept',
  RemoveDept = '/dept/removedept',
}

export const getDeptList = (params?: DeptParams) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const addDept = (params?: DeptItem) => defHttp.post<boolean>({ url: Api.AddDept, params });

export const updateDept = (params?: DeptItem) =>
  defHttp.post<boolean>({ url: Api.UpdateDept, params });

export const removeDept = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveDept, params: { id } });
