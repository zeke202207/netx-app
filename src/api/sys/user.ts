import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { AuthModel, AuthLoginModel } from './model/oauthModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/account/login',
  Logout = '/account/logout',
  GetUserInfo = '/account/getuserinfo',
  GetPermCode = '/account/getpermcode',
  GetOAuthUrl = '/account/getoauthurl',
  OAuthLogin = '/account/oauthlogin',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function oAuthUrl(params: AuthModel) {
  return defHttp.post({ url: Api.GetOAuthUrl, params });
}

export function oAuthLogin(params: AuthLoginModel) {
  return defHttp.post({ url: Api.OAuthLogin, params });
}
