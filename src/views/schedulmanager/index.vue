<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增任务 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:number-list-line',
                tooltip: '任务参数',
                onClick: handleParamDetail.bind(null, record),
              },
              {
                icon: 'clarity:pause-line',
                tooltip: '暂停',
                onClick: handlePause.bind(null, record),
                disabled: !record.Operable ? true : record.State != 1 || !record.Enabled,
              },
              {
                icon: 'clarity:play-line',
                tooltip: '恢复',
                onClick: handleResume.bind(null, record),
                disabled: !record.Operable ? true : record.State == 1 || !record.Enabled,
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <SchedulDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getSchedulList,
    removeSchedul,
    resumeJob,
    pauseJob,
  } from '/@/api/schedulmanager/schedul';

  import { useDrawer } from '/@/components/Drawer';
  import SchedulDrawer from './schedulDrawer.vue';

  import { columns, searchFormSchema } from './schedul.data';
  import { JsonPreview } from '/@/components/CodeEditor';
  import { Modal } from 'ant-design-vue';

  export default defineComponent({
    name: 'Dept',
    components: { BasicTable, SchedulDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '任务列表',
        api: getSchedulList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      async function handleDelete(record: Recordable) {
        await removeSchedul(record.Id).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      async function handlePause(record: Recordable) {
        await pauseJob(record.Id).then(() => {
          reload();
        });
      }

      async function handleResume(record: Recordable) {
        await resumeJob(record.Id).then(() => {
          reload();
        });
      }

      function handleParamDetail(record: Recordable) {
        Modal.info({
          title: '任务执行参数',
          content: h(JsonPreview, { data: record.JobDataMap ?? '{}' }),
          okText: '关闭',
          icon: '',
        });
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleDelete,
        handleSuccess,
        handlePause,
        handleResume,
        handleParamDetail,
      };
    },
  });
</script>
