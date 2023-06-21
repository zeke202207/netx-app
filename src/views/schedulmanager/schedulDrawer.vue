<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { formSchema } from './schedul.data';
  import {
    getSchedulList,
    GetSchedulById,
    addSchedul,
    resumeSchedul,
    removeSchedul,
    updateSchedul,
  } from '/@/api/schedulmanager/schedul';
  import {
    ScheduleItem,
    SchedulTriggerItem,
    SchedulJobItem,
  } from '/@/api/schedulmanager/model/schedulModel';

  export default defineComponent({
    name: 'SchedulDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { span: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增任务' : '编辑任务'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (!unref(isUpdate)) {
            let sItem = GetSchedulItemData(values);
            await addSchedul(sItem);
          } else {
            await updateSchedul(values);
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      function GetSchedulItemData(values: any): ScheduleItem {
        let startAt = null;
        let endAt = null;
        if (values.startAt != null && values.startAt != undefined) {
          startAt = values.startAt[0];
          if (values.startAt.length == 2) {
            endAt = values.startAt[1];
          }
        }
        let jobItem: SchedulJobItem = {
          name: values.jobName,
          group: values.group,
          jobType: values.jobType,
          jobDataMap: values.jobDataMap,
          description: values.description,
          disAllowConcurrentExecution: values.disAllowConcurrentExecution,
          enabled: values.enabled,
          state: 0,
        };
        let triggerItem: SchedulTriggerItem = {
          name: values.jobName + 'trigger',
          description: 'trigger descrption',
          cronExpression: values.CronExpression,
          startAt: startAt,
          endAt: endAt,
          startNow: values.startNow,
          priority: values.priority,
        };
        let sItem: ScheduleItem = {
          id: '',
          job: jobItem,
          trigger: triggerItem,
        };
        return sItem;
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
