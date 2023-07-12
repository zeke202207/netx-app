<template>
  <BasicModal
    destroyOnClose
    @register="register"
    title="Modal Title"
    :maskClosable="false"
    :footer="null"
  >
    <!--存在问题,不允许嵌套-->
    <iframe :src="frameSrc" ref="frameRef" target="_self"></iframe>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { oAuthUrl, OAuthLogin } from '/@/api/sys/user';
  import { AuthModel, AuthLoginModel } from '/@/api/sys/model/oauthModel';

  export default defineComponent({
    components: { BasicModal },
    setup() {
      const frameSrc = ref('');
      const [register, { setModalProps, redoModalHeight }] = useModalInner(async (data) => {
        let params: AuthModel = {
          OAuthPlatform: 0,
          State: 'code',
        };
        await oAuthUrl(params).then((res) => {
          //window.open(res, '_self');
          frameSrc.value = res;
          console.log(frameSrc.value);
        });
      });

      return { register, frameSrc };
    },
  });
</script>
<style scoped>
  .empty-tips {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
