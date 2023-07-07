import { BasicColumn } from '/@/components/Table';
import { DescItem } from '/@/components/Description/index';

export const columns: BasicColumn[] = [
  {
    title: '缓存方式',
    dataIndex: 'CacheTypeName',
    width: 80,
    align: 'center',
  },
  {
    title: '缓存KEY',
    dataIndex: 'CacheTypKey',
    width: 10,
    align: 'left',
    ifShow: false,
  },
];

export const preKeyColumns: BasicColumn[] = [
  {
    title: '缓存模块',
    dataIndex: 'CachingPrefixKey',
    align: 'center',
  },
  //{ title: '描述', dataIndex: 'CacheingPreDes', align: 'center' },
  { title: '操作', dataIndex: 'action', align: 'center', width: 50 },
];

export function getKeyColumns(): BasicColumn[] {
  return [
    {
      title: '缓存KEY',
      dataIndex: 'Key',
      align: 'center',
    },
  ];
}
