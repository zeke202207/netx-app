<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #bodyCell="{ column, record }">
        <!--
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:bars-outlined',
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
        -->
      </template>
    </BasicTable>
    <LoggingDrawer @register="registerDrawer" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import LoggingDrawer from './auditloggingdrawer.vue';
  import { columns, searchFormSchema } from './auditlogging.data';
  import { getAuditLoggingList } from '/@/api/logmanager/logging';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'Auditlog',
    components: { BasicTable, TableAction, PageWrapper, LoggingDrawer },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable] = useTable({
        title: '菜单列表',
        api: getAuditLoggingList,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
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
