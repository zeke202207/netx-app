/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  id: string;
  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // 用户id
  id: string;
  // 用户名
  username: string;
  // 真实名字
  nickname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
