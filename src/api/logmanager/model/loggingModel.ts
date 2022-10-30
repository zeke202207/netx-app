import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type LoggingParam = {};
export type AuditLoggingParam = {};
export type LoginLoggingParam = {};

export type LoggingPageParam = BasicPageParams & LoggingParam;
export type AuditLoggingPageParam = BasicPageParams & AuditLoggingParam;
export type LoginLoggingPageParam = BasicPageParams & LoginLoggingParam;

export interface LoggingListItem {}

export type LoggingPageListResultModel = BasicFetchResult<LoggingListItem>;
