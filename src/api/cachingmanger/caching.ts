import { defHttp } from '/@/utils/http/axios';
import { CachingTypes, CachingKeyListItem, CachingValueModel } from './model/cachingresponse';
import { CachingTypeParam, CachingKeyParam, CachingPreKeyParam } from './model/cachingrequest';

enum Api {
  getCachingTypesUrl = '/caching/getcachingtypes',
  getCachingKeysUrl = '/caching/getcachingkeys',
  getCachingValueUrl = '/caching/getcachingvalue',
  removeCachingValueUrl = '/caching/removecachingvalue',
}

export const getCachingTypes = () => defHttp.get<CachingTypes>({ url: Api.getCachingTypesUrl });

export const getCachingKeys = (params?: CachingTypeParam) =>
  defHttp.post<CachingKeyListItem>({ url: Api.getCachingKeysUrl, params });

export const getCachingValue = (params?: CachingKeyParam) =>
  defHttp.post<CachingValueModel>({ url: Api.getCachingValueUrl, params });

export const removeCachingValue = (params?: CachingPreKeyParam) =>
  defHttp.delete<boolean>({ url: Api.removeCachingValueUrl, params });
