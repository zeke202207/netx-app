<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { columns, searchFormSchema } from './loginlogging.data';
  import { getLoginLoggingList } from '/@/api/logmanager/logging';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'Loginlog',
    components: { BasicTable, PageWrapper },
    setup() {
      const [registerTable] = useTable({
        title: '菜单列表',
        api: getLoginLoggingList,
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
      return {
        registerTable,
      };
    },
  });
</script>
