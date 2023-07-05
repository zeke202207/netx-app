import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '分组',
    dataIndex: 'group',
    width: 80,
  },
  {
    title: '方法',
    dataIndex: 'method',
    width: 80,
    customRender: ({ record }) => {
      const method = record.method.toUpperCase();
      let color = 'gray';
      switch (method) {
        case 'POST':
          color = 'green';
          break;
        case 'GET':
          color = 'blue';
          break;
        case 'DELETE':
          color = 'red';
          break;
        default:
        case 'PUT':
          color = 'gray';
          break;
      }
      return h(Tag, { color: color }, () => method);
    },
  },
  {
    title: '地址',
    dataIndex: 'path',
    width: 200,
    align: 'left',
  },
  {
    title: '描述',
    dataIndex: 'description',
    align: 'left',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'group',
    label: '分组',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'path',
    label: '接口地址',
    required: true,
    component: 'Input',
  },
  {
    field: 'group',
    label: '接口分组',
    required: true,
    component: 'Input',
  },
  {
    field: 'method',
    label: '接口方法',
    required: true,
    component: 'Select',
    defaultValue: 'POST',
    componentProps: {
      options: [
        {
          label: 'POST',
          value: 'POST',
          key: 'POST',
        },
        {
          label: 'GET',
          value: 'GET',
          key: 'GET',
        },
        {
          label: 'DELETE',
          value: 'DELETE',
          key: 'DELETE',
        },
        {
          label: 'PUT',
          value: 'PUT',
          key: 'PUT',
        },
      ],
    },
  },
  {
    field: 'description',
    label: '接口描述',
    required: false,
    component: 'InputTextArea',
  },
];
