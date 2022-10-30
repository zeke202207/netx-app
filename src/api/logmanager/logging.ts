import {
  LoggingPageParam,
  LoggingListItem,
  AuditLoggingPageParam,
  LoginLoggingPageParam,
} from './model/loggingModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  loggingPageList = '/logging/getloglist',
  auditLoggingPageList = '/logging/getauditloglist',
  loginLoggingPageList = '/logging/getloginlogList',
}

/** sysLogging */
export const getLoggingList = (params?: LoggingPageParam) =>
  defHttp.post<LoggingListItem>({ url: Api.loggingPageList, params });

/** auditlogging */
export const getAuditLoggingList = (params?: AuditLoggingPageParam) =>
  defHttp.post<LoggingListItem>({ url: Api.auditLoggingPageList, params });

/** loginlogging */
export const getLoginLoggingList = (params?: LoginLoggingPageParam) =>
  defHttp.post<LoggingListItem>({ url: Api.loginLoggingPageList, params });
