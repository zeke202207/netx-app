<template>
  <BasicDrawer
    v-if="true"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="接口授权"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable } from '/@/components/Table';
  import {  getApiAuth, setApiAuth } from '/@/api/systemmanager/role';
  import { getApiList } from '/@/api/systemmanager/appinterface';
  import { BasicColumn } from '/@/components/Table';
  export default defineComponent({
    name: 'ApiAuthDrawer',
    components: { BasicDrawer, BasicTable },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const roleId = ref('');

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        roleId.value = data.record.id;
        await getApiAuth(roleId.value).then((rep) => {
          // console.log(rep);
          setSelectedRowKeys(rep);
        });
      });

      const columns: BasicColumn[] = [
        {
          title: '接口地址',
          dataIndex: 'path',
          width: 180,
        },
        {
          title: '接口描述',
          dataIndex: 'description',
          width: 200,
        },
      ];

      const [registerTable, { getSelectRowKeys, setSelectedRowKeys }] = useTable({
        title: '',
        api: getApiList,
        columns,
        formConfig: {
          labelWidth: 120,
        },
        striped: true,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        pagination: false,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
      });

      async function handleSubmit() {
        try {
          // console.log(getSelectRowKeys());
          await setApiAuth(roleId.value, getSelectRowKeys());
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerTable,
        registerDrawer,
        handleSubmit,
      };
    },
  });
</script>
