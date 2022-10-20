import {
  LoggingPageParam,
  LoggingListItem,
  AuditLoggingPageParam
} from './model/loggingModel';

import { defHttp } from '/@/utils/http/axios';

enum Api {
  loggingPageList = '/logging/getloglist',
  auditLoggingPageList = '/logging/getauditloglist',
}

/** sysLogging */
export const getLoggingList = (params?: LoggingPageParam) =>
  defHttp.post<LoggingListItem>({ url: Api.loggingPageList, params });

  /** auditlogging */
export const getAuditLoggingList = (params?: AuditLoggingPageParam) =>
  defHttp.post<LoggingListItem>({ url: Api.auditLoggingPageList, params });