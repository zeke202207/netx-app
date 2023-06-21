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
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    getSchedulList,
    GetSchedulById,
    addSchedul,
    resumeSchedul,
    removeSchedul,
  } from '/@/api/schedulmanager/schedul';

  import { useDrawer } from '/@/components/Drawer';
  import SchedulDrawer from './schedulDrawer.vue';

  import { columns, searchFormSchema } from './schedul.data';

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
          width: 80,
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

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
