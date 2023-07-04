import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export interface AccountItem {
  id: string;
  deptid: string;
  email: string;
  nickname: string;
  remark: string;
  roleid: string;
  username: string;
}

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

export interface AccountPasswordItem {
  oldpwd: string;
  newpwd: string;
}

export interface AvatarItem {
  Id: string;
  Url: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;
