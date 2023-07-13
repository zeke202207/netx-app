<template>
  <BasicModal
    destroyOnClose
    @register="register"
    title="关联账号"
    :maskClosable="false"
    :footer="null"
  >
    这里设置账号关联第三方信息
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicModal },
    setup() {
      const [register, { setModalProps, redoModalHeight }] = useModalInner(async (data) => {});
      return { register };
    },
  });
</script>
<style></style>
