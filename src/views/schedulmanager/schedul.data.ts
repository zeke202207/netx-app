import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '任务名称',
    dataIndex: 'Name',
    width: 120,
    align: 'left',
  },
  {
    title: '任务分组',
    dataIndex: 'Group',
    width: 50,
  },
  {
    title: '任务',
    dataIndex: 'JobType',
    width: 160,
  },
  {
    title: '是否允许并发',
    dataIndex: 'DisAllowConcurrentExecution',
    width: 80,
    customRender: ({ record }) => {
      const status = record.DisAllowConcurrentExecution;
      const enable = ~~status === 0;
      const color = enable ? 'red' : 'green';
      const text = enable ? '禁止' : '允许';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '任务参数',
    dataIndex: 'JobDataMap',
    width: 180,
    customRender: ({ record }) => {
      if (record.JobDataMap == null || record.JobDataMap == undefined) {
        return ' ';
      }
      return JSON.stringify(record.JobDataMap);
    },
  },
  {
    title: 'Cron表达式',
    dataIndex: 'Trigger',
    width: 180,
    customRender: ({ record }) => {
      const text = record.Trigger.CronExpression;
      return text;
    },
  },
  {
    title: '任务描述',
    dataIndex: 'Description',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    field: 'jobName',
    label: '任务名称:',
    component: 'Input',
    required: true,
    show: true,
  },
  {
    field: 'group',
    label: '任务分组:',
    component: 'Input',
    required: true,
    show: true,
  },
  {
    field: 'description',
    label: '任务描述:',
    component: 'Input',
    required: true,
    show: true,
  },
  {
    field: 'jobType',
    label: '任务类型:',
    component: 'Input',
    required: true,
    show: true,
    helpMessage: 'C# -> namespace.classname',
  },
  {
    field: 'jobDataMap',
    label: '任务参数:',
    component: 'InputTextArea',
    required: false,
    show: true,
    helpMessage: 'json格式数据',
  },
  {
    field: 'disAllowConcurrentExecution',
    label: '允许并发执行:',
    component: 'Switch',
    show: true,
  },
  //trigger
  {
    field: 'CronExpression',
    label: 'cron表达式:',
    component: 'Input',
    required: true,
    show: true,
    helpMessage: 'cron表达式',
  },
  {
    field: 'startAt',
    label: '有效期:',
    component: 'RangePicker',
    required: false,
    show: true,
  },
  {
    field: 'startNow',
    label: '是否立即执行:',
    component: 'Switch',
    show: true,
  },
  {
    field: 'priority',
    label: '优先级:',
    component: 'InputNumber',
    required: true,
    show: true,
    defaultValue: 1,
  },
];
