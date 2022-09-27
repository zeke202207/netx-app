<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="[
            {
              disabled: record.apicheck === '0',
              icon: 'ant-design:api-outlined',
              onClick: handleSetApi.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
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
          ]" />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
import { defineComponent ,ref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getRoleListByPage, removeRole } from '/@/api/systemmanager/system';
import { useDrawer } from '/@/components/Drawer';
import RoleDrawer from './RoleDrawer.vue';
import ApiCheckDrawer from './ApiCheckDrawer.vue'
import { columns, searchFormSchema } from './role.data';

export default defineComponent({
  name: 'RoleManagement',
  components: { BasicTable, RoleDrawer, TableAction, ApiCheckDrawer },
  setup() {
    const isCheckApi = ref(false);
    const [registerDrawer, { openDrawer }] = useDrawer();
    const [registerTable, { reload }] = useTable({
      title: '角色列表',
      api: getRoleListByPage,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        // slots: { customRender: 'action' },
        fixed: undefined,
      },
    });

    function handleCreate() {
      isCheckApi.value = false;
      openDrawer(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      isCheckApi.value = false;
      openDrawer(true, {
        record,
        isUpdate: true,
      });
    }

    function handleSetApi(record: Recordable) {
      console.log(record);
      isCheckApi.value = true;
      /*
      openDrawer(true, {
        record,
        isUpdate: true,
      });
      */
    }

    async function handleDelete(record: Recordable) {
      await removeRole(record.id).then(() => {
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
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSetApi,
      isCheckApi
    };
  },
});
</script>
