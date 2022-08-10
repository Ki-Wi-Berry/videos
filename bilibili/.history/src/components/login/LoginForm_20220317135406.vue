<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="35rem"
  >
    <el-form-item prop="phone_number" class="phone_number">
      <el-input
        type="text"
        placeholder="你的手机号/邮箱"
        v-model="ruleForm.phone_number"
      />
    </el-form-item>

    <el-form-item prop="password" class="password">
      <el-input
        type="password"
        placeholder="密码"
        v-model="ruleForm.password"
        autocomplete="off"
      />
    </el-form-item>

    <el-form-item class="login_in_button">
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
      <el-button>注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import {LoginInPost} from "../../api/LoginIn";

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  phone_number: "",
  password: "",
});

const checkPhonenumber = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error("请输入注册时用的邮箱或者手机号呀"));
  }
  let re = /^[0-9]*$/;
  console.log(value.length);
  // ||value.length != 11
  if (!re.test(value)) {
    // console.log(re.test(value));
    callback(new Error("输入格式有误哟"));
  } else {
    callback();
  }
};

const checkPassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码呀"));
  }
  let re = /^[0-9a-zA-Z]*$/;

  if (!re.test(value)) {
    // console.log(re.test(value));
    return callback(new Error("输入格式有误哟"));
  } else {
    return callback();
  }
};

const rules = reactive({
  phone_number: [{ validator: checkPhonenumber, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let url = "http://localhost:3007/api/user_register";
      let dataObject = {
        phoneNumber: ruleForm.phone_number,
        password: ruleForm.password,
      };
      try {
        // axios.post(url, dataObject).then(function (res) {
        //   console.log(res.data);
        // });
        LoginInPost(dataObject).then(function (res) {
          console.log(res.data);
        });
      } catch(error) {
        console.log(error);
      }

      //   console.log(1);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>


<style lang="less" scoped>
.phone_number {
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    width: 35rem;
    height: 5.5rem;
    input {
      height: 4rem;
    }
  }
}

.password {
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    width: 35rem;
    height: 5.5rem;
    input {
      height: 4rem;
    }
  }
}

.login_in_button {
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    width: 35rem;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    button {
      width: 15rem;
    }
  }
}
</style>