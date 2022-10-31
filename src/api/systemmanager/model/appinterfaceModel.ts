import internal from 'stream';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type ApiParam = {};

export type ApiPageParams = BasicPageParams & ApiParam;

export type ApiItem = {
  id?: string;
  path: string;
  group: string;
  method: string;
  description?: string;
};


export interface ApiListItem {
  level: internal;
}

/**
 * @description: Request list return value
 */
export type ApiPageListResultModel = BasicFetchResult<ApiListItem>;

