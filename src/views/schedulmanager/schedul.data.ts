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
          return h(Tag, { color: 'green' }, () => '运行中');
        case 2:
          return h(Tag, { color: 'red' }, () => '暂停');
        case 3:
          return h(Tag, { color: 'red' }, () => '恢复');
        case 4:
          return h(Tag, { color: 'red' }, () => '删除');
        case 5:
          return h(Tag, { color: 'red' }, () => '中断');
        default:
          return h(Tag, { color: 'red' }, () => '停止');
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
    //required: true,
    show: true,
    componentProps: ({ formActionType }) => {
      return {
        api: getAllSupportJobType,
        labelField: 'TypeName',
        valueField: 'Id',
        showArrow: true,
        immediate: true,
        showSearch: false,
        allowClear: false,
        defaultActiveFirstOption: true,
        mode: 'combobox',
        placeholder: '请选择任务类型',
        getPopupContainer: () => document.body,
        onOptionsChange: (options) => {
          formActionType.setFieldsValue({ jobType: options[0].value });
        },
        //onChange: (e, option) => {
        //  const x = e;
        //  console.log(x);
        //},
      };
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (value == undefined) {
              if (values.TypeName === undefined) {
                return Promise.reject('任务类型不能为空');
              } else {
                return Promise.resolve();
              }
            }
            if (!value) {
              return Promise.reject('任务类型不能为空');
            }
            return Promise.resolve();
          },
        },
      ];
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
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            const regexpLastWord =
              '^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?)*))$';
            if (!value.match(regexpLastWord)) {
              return Promise.reject('cron表达式错误');
            }
            return Promise.resolve();
          },
        },
      ];
    },
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
