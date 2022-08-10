<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="12rem"
    class="demo-ruleForm"
    :size="formSize"
  >
    <el-form-item prop="phone_number">
      <el-input  placeholder="你的手机号/邮箱" class="" v-model="ruleForm.name" />
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: 'Hello',
})

const rules = reactive({
  phone_number: [
    { required: true, message: '请输入注册时用的邮箱或者手机号呀', trigger: 'blur' },
  ],
  
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(fields)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>


<style lang="less" scoped>
::v-deep .el-form-item__content{
    // margin-left: 0!important;
}
</style>