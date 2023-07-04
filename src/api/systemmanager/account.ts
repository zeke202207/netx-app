import {
  AccountParams,
  AccountItem,
  AccountListGetResultModel,
  AccountPasswordItem,
  AvatarItem,
} from './model/accountModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/account/getaccountlist',
  IsAccountExist = '/account/isaccountexist',
  AddAccount = '/account/addaccount',
  UpdateAccount = '/account/updateaccount',
  RemoveAccount = '/account/removeaccount',
  ChangePwd = '/account/changepassword',
  ChangeAvatar = '/account/changeavatar',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const isAccountExist = (account: string) =>
  defHttp.get<boolean>(
    { url: Api.IsAccountExist, params: { account } },
    { errorMessageMode: 'none' },
  );

export const addAccount = (params?: AccountItem) =>
  defHttp.post<boolean>({ url: Api.AddAccount, params });

export const updateAccount = (params?: AccountItem) =>
  defHttp.post<boolean>({ url: Api.UpdateAccount, params });

export const removeAccount = (id: string) =>
  defHttp.delete<boolean>({ url: Api.RemoveAccount, params: { id } });

export const chanegPassword = (params: AccountPasswordItem) =>
  defHttp.post<boolean>({ url: Api.ChangePwd, params });

export const changeAvatar = (params: AvatarItem) =>
  defHttp.post<boolean>({ url: Api.ChangeAvatar, params });
