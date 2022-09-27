import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/systemmanager/system';
// import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '接口地址',
    dataIndex: 'path',
    width: 200,
  },
  {
    title: '接口分组',
    dataIndex: 'group',
    width: 50,
  },
  {
    title: '接口方法',
    dataIndex: 'method',
    width: 50,
  },
  {
    title: '接口描述',
    dataIndex: 'description',
    width: 200,
  },
]

export const searchFormSchema: FormSchema[] = [
  /*
  {
    field: 'path',
    label: '接口地址',
    component: 'Input',
    colProps: { span: 8 },
  }
  */
]

export const formSchema: FormSchema[] =[
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
  }
]