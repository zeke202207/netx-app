import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export interface CachingTypes {
  CacheType: string;
  CacheTypeName: string;
}

export interface CachingValueModel {
  Value: string;
}

export interface CachingKeyListItem {
  CachingKey: string;
}

export type CachingKeyPageListResultModel = BasicFetchResult<CachingKeyListItem>;
