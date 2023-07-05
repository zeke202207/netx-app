import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '用户',
    dataIndex: 'NickName',
    width: 80,
    align: 'left',
  },
  {
    title: '客户端地址',
    dataIndex: 'ClientIpAddress',
    width: 80,
    align: 'left',
  },
  {
    title: '浏览器信息',
    dataIndex: 'BrowserInfo',
    width: 200,
    align: 'left',
  },
  {
    title: '执行时间',
    dataIndex: 'ExecutionTime',
    width: 130,
  },
  {
    title: '耗时',
    dataIndex: 'ExecutionDuration',
    width: 50,
    customRender: ({ record }) => {
      const duration = record.ExecutionDuration;
      const color = duration > 1000 ? 'red' : 'green';
      return h(Tag, { color: color }, () => duration);
    },
  },
  {
    title: '服务',
    dataIndex: 'ServiceName',
    width: 150,
    align: 'left',
  },
  {
    title: '接口',
    dataIndex: 'MethodName',
    width: 100,
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'NickName',
    label: '用户',
    component: 'Input',
    colProps: { span: 8 },
  },
];
