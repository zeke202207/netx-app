<template>
  <BasicModal v-bind="$attrs" title="修改密码" @register="register" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './changePwd.data';
  import { chanegPassword } from '/@/api/systemmanager/account';

  export default defineComponent({
    name: 'ChangePwdModal',
    components: { BasicModal, BasicForm },
    setup(_, { emit }) {
      const [register, { closeModal, setModalProps }] = useModalInner();
      const [registerForm, { validate, resetFields }] = useForm({
        baseColProps: { span: 24 },
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;
          chanegPassword({ oldpwd: passwordOld, newpwd: passwordNew }).then((r) => {
            closeModal();
            emit('success');
          });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      return { registerForm, register, resetFields, handleSubmit };
    },
  });
</script>
