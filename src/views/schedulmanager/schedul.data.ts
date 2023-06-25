import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag, Switch } from 'ant-design-vue';
import { getAllSupportJobType, enabledJob } from '/@/api/schedulmanager/schedul';
import { useMessage } from '/@/hooks/web/useMessage';

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
    width: 100,
  },
  {
    title: '任务',
    dataIndex: 'JobType',
    width: 160,
  },
  {
    title: '允许并发',
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
  /*
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
  */
  {
    title: 'Cron',
    dataIndex: 'Trigger',
    width: 180,
    customRender: ({ record }) => {
      const text = record.Trigger.CronExpression;
      return text;
    },
  },
  {
    title: '是否启用',
    dataIndex: 'enabled',
    width: 80,
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.Enabled,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked;
          const { createMessage } = useMessage();
          enabledJob(record.Id, newStatus)
            .then(() => {
              record.Enabled = newStatus;
              record.State = 2;
              createMessage.success(`修改启用状态成功`);
            })
            .catch(() => {
              createMessage.error('修改启用状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '任务状态',
    dataIndex: 'State',
    width: 160,
    customRender: ({ record }) => {
      // 0->None 1->Started 2->Paused 3->Resumed 4->Deleted 5->Interrupted
      const state = record.State;
      switch (state) {
        case 1:
          return '运行中';
        case 2:
          return '暂停';
        case 3:
          return '恢复';
        case 4:
          return '删除';
        case 5:
          return '中断';
        default:
          return '已停止';
      }
    },
  },
  {
    title: '任务描述',
    dataIndex: 'Description',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobName',
    label: '任务名称:',
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
    component: 'ApiSelect',
    required: true,
    show: true,
    componentProps: ({ formActionType }) => {
      return {
        api: getAllSupportJobType,
        showArrow: true,
        showSearch: false,
        labelField: 'TypeName',
        valueField: 'TypeName',
        getPopupContainer: () => document.body,
        onOptionsChange: (options) => {
          formActionType.setFieldsValue({ jobType: options[0].value });
        },
      };
    },
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
    label: '并发执行:',
    component: 'Switch',
    show: true,
  },
  {
    field: 'enabled',
    label: '是否启用:',
    component: 'Switch',
    show: true,
  },
  //trigger
  {
    field: 'CronExpression',
    label: 'Cron:',
    component: 'Input',
    required: true,
    show: true,
    helpMessage: 'Cron表达式',
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
    label: '立即执行:',
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
