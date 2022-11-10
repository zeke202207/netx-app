<template>
  <CollapseContainer title="安全设置" :canExpan="false">
    <BasicForm @register="registerForm" />
    <a-button @click="resetFields"> 重置 </a-button>
    <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
  </CollapseContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicForm, useForm } from '/@/components/Form';
  import { chanegPassword } from '/@/api/systemmanager/account';
  import { formSchema } from './data';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { CollapseContainer, BasicForm },
    setup() {
      const userStore = useUserStore();
      const [registerForm, { validate, resetFields }] = useForm({
        baseColProps: { span: 24 },
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;
          chanegPassword({ oldpwd: passwordOld, newpwd: passwordNew }).then((r) => {
            userStore.logout(true);
          });
        } finally {
          // setProps({ confirmLoading: false });
        }
      }

      return {
        registerForm,
        resetFields,
        handleSubmit,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
