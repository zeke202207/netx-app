import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户',
    dataIndex: 'username',
    width: 50,
    align: 'left',
  },
  {
    title: '登录ip',
    dataIndex: 'loginip',
    width: 50,
    align: 'left',
  },
  {
    title: '登录地址',
    dataIndex: 'loginaddress',
    width: 50,
    align: 'left',
  },
  {
    title: '登录时间',
    dataIndex: 'createtime',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户',
    component: 'Input',
    colProps: { span: 8 },
  },
];
