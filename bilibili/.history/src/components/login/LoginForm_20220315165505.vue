<template>
  <el-form
    ref="ruleFormRef"
    :model="formLabelAlign"
    :rules="rules"
    label-width="12rem"
    class="demo-ruleForm"
    :size="formSize"
    :label-position="labelPosition"
    style="max-width: 460px"
  >
    <el-form-item label="Activity name" >
      <el-input v-model="ruleForm.name" />
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
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
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
