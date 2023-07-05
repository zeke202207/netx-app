import { getAllRoleList } from '/@/api/systemmanager/role';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'rolename',
    width: 200,
    customRender: ({ record }) => {
      const status = record.rolestatus;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? '' : ' (已禁用) ';
      return h(Tag, { color: color }, () => record.rolename + text);
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'left',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    dynamicDisabled: ({ values }) => values.id != undefined && values.id != null && values.id != '',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    field: 'pwd',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '角色',
    field: 'roleid',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'rolename',
      valueField: 'id',
      alwaysLoad: 'false',
      immediate: 'false',
    },
    required: false,
  },
  {
    field: 'deptid',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptname',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: false,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: false,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
