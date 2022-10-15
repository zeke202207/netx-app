<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="日志详情"
    width="50%"
    @ok="handleSubmit"
  >
  <CodeEditor v-model:value="jsonData" :mode="modeValue" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent, ref, h } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { CodeEditor, JsonPreview, MODE } from '/@/components/CodeEditor';

  export default defineComponent({
    name: 'LoggingDrawer',
    components: { BasicDrawer, CodeEditor },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const modeValue = ref<MODE>(MODE.JSON);
      const jsonData = ref('[]');
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        debugger
        let message = data.record.message;
        jsonData.value =JSON.parse(message);
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
      });

      return { registerDrawer, jsonData, modeValue };
    },
  });
</script>
