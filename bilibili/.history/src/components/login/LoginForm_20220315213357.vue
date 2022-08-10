<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="35rem"
    :size="formSize"
  >
    <el-form-item prop="phone_number" class="phone_number">
      <el-input
        placeholder="你的手机号/邮箱"
        v-model="ruleForm.phone_number"
      />
    </el-form-item>

    <el-form-item prop="password" class="password">
      <el-input
        placeholder="密码"
        v-model="ruleForm.password"
      />
    </el-form-item>

    <el-form-item class="login_in_button">
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
    phone_number:"",
  password: "",

});

const rules = reactive({
  phone_number: [
    {
      required: true,
      message: "请输入注册时用的邮箱或者手机号呀",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入注册时用的邮箱或者手机号呀",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(fields);
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>


<style lang="less" scoped>
.phone_number {
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    width: 35rem;
    height: 6rem;
  }
}

.login_in_button{
    ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    width: 35rem;
    height: 6rem;
    display: flex;
    justify-content: space-between;
  }
}

</style>