import {
  AccountParams,
  AccountItem,
  AccountListGetResultModel,
} from './model/accountModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/account/getaccountlist',
  IsAccountExist = '/account/isaccountexist',
  AddAccount = '/account/addaccount',
  UpdateAccount = '/account/updateaccount',
  RemoveAccount = '/account/removeaccount',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const isAccountExist = (account: string) =>
  defHttp.get<boolean>({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });

export const addAccount = (params?: AccountItem) =>
  defHttp.post<boolean>({ url: Api.AddAccount, params });

export const updateAccount = (params?: AccountItem) =>
  defHttp.post<boolean>({ url: Api.UpdateAccount, params });
  
export const removeAccount = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveAccount, params: { id } });