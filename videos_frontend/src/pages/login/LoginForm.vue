<template>
  <div class="form-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="35rem"
    >
      <el-form-item prop="phoneNumber" class="phoneNumber">
        <el-input
          type="text"
          placeholder="你的手机号"
          v-model="ruleForm.phoneNumber"
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
        <el-button @click="goToRegister">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import CryptoJS from "crypto-js";
import { LoginInPost } from "../../api/request";
import { useRouter } from "vue-router";
import { useStore } from "../../store";

const router = useRouter();
const store = useStore();

const formSize = ref("default");
const ruleFormRef = ref();
const ruleForm = ref({
  phoneNumber: "",
  password: "",
});

const checkPhoneNumber = (rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error("请输入注册时用的邮箱或者手机号"));
  }
  let re = /^[0-9]*$/;
  // console.log(value.length);
  // ||value.length != 11
  if (!re.test(value)) {
    // console.log(re.test(value));
    callback(new Error("输入格式有误"));
  } else {
    callback();
  }
};

const checkPassword = (rule: any, value: string, callback: any): void => {
  if (!value) {
    return callback(new Error("请输入密码"));
  }
  let re = /^[0-9a-zA-Z]*$/;

  if (!re.test(value)) {
    // console.log(re.test(value));
    return callback(new Error("输入格式有误"));
  } else {
    return callback();
  }
};

const rules = reactive({
  phoneNumber: [{ validator: checkPhoneNumber, trigger: "blur" }],
  password: [{ validator: checkPassword, trigger: "blur" }],
});

const submitForm = async (formEl: any): Promise<void> => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { phoneNumber, password } = ruleForm.value;
      const hashPassword = CryptoJS.SHA256(password).toString();
      let dataObject = {
        phoneNumber,
        password: hashPassword,
      };
      try {
        LoginInPost(dataObject)?.then(function (res) {
          // console.log(res.data.token);
          store.loginIn();
          localStorage.setItem("token", res.token);
          router.go(-1);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const goToRegister = () => {
  router.push("/register");
};
</script>

<style lang="less" scoped>
.form-box {
  width: 30%;
}

.phoneNumber {
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
