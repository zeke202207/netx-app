import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type MenuParams = BasicPageParams & {
  menuname?: string;
  status?: string;
};

export interface MenuListItem {
  id: string;
  orderno: string;
  createtime: string;
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

/**
 * @description: Request list return value
 */
export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

