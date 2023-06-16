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
    title: '控制器',
    dataIndex: 'controller',
    width: 50,
    align: 'left',
  },
  {
    title: '方法',
    dataIndex: 'action1',
    width: 50,
    align: 'left',
  },
  /*
  {
    title: '远程地址',
    dataIndex: 'remoteipv4',
    width: 200,
  },
  {
    title: '详情',
    dataIndex: 'detail',
    width: 200,
  },
  */
  {
    title: '创建时间',
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
