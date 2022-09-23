import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
// import { setRoleStatus } from '/@/api/systemmanager/system';
// import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: 'test',
    dataIndex: 'test',
    width: 200,
  }
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'test',
    label: '测试',
    component: 'Input',
    colProps: { span: 8 },
  }
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
    field: 'test',
    label: 'test',
    required: true,
    component: 'Input',
  }
]