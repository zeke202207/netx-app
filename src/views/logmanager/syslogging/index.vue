<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:more-outlined',
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <LoggingDrawer @register="registerDrawer" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import LoggingDrawer from './sysloggingdrawer.vue';
  import { columns, searchFormSchema } from './syslogging.data';
  import { getLoggingList } from '/@/api/logmanager/logging';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'Syslog',
    components: { BasicTable, TableAction, PageWrapper, LoggingDrawer },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable] = useTable({
        title: '菜单列表',
        api: getLoggingList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        actionColumn: {
          width: 80,
          title: '详情',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleDetail(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      return {
        registerTable,
        registerDrawer,
        handleDetail,
      };
    },
  });
</script>
