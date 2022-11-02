import { MenuParams, MenuListGetResultModel, MenuItem } from './model/menuModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  MenuList = '/menu/getmenulist',
  AddMenu = '/menu/addmenu',
  UpdateMenu = '/menu/updatemenu',
  RemoveMenu = '/menu/removemenu',
}

export const getMenuList = (params?: MenuParams) =>
  defHttp.post<MenuListGetResultModel>({ url: Api.MenuList, params });

export const addMenu = (params?: MenuItem) => defHttp.post<boolean>({ url: Api.AddMenu, params });

export const updateMenu = (params?: MenuItem) =>
  defHttp.post<boolean>({ url: Api.UpdateMenu, params });

export const removeMenu = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveMenu, params: { id } });
