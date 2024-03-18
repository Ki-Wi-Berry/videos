<template>
  <div class="form-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="35rem"
    >
      <el-form-item prop="phoneNumber" class="form-select">
        <el-input
          type="text"
          placeholder="请输入手机号"
          v-model="ruleForm.phoneNumber"
        />
      </el-form-item>

      <el-form-item prop="userName" class="form-select">
        <el-input
          type="text"
          placeholder="请输入用户名"
          v-model="ruleForm.userName"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="password" class="form-select">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="ruleForm.password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item prop="confirmPassword" class="form-select">
        <el-input
          type="password"
          placeholder="再次输入密码"
          v-model="ruleForm.confirmPassword"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item class="form-button">
        <el-button type="primary" @click="goToLogin">去登录</el-button>
        <el-button @click="submitForm(ruleFormRef)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { RegUser } from "../../api/request";
import { useRouter } from "vue-router";
import { useStore } from "../../store";
import CryptoJS from "crypto-js";

interface RuleForm {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

const router = useRouter();
const store = useStore();

const ruleFormRef = ref();
const ruleForm = ref<RuleForm>({
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  userName: "",
});

const checkPhoneNumber = (rule: any, value: string, callback: any): void => {
  if (!value) {
    callback(new Error("密码不能为空"));
  }
  let re = /^[0-9]*$/;
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
    return callback(new Error("输入格式有误"));
  } else {
    return callback();
  }
};

const checkConfirmPassword = (
  rule: any,
  value: string,
  callback: any
): void => {
  if (!value) {
    return callback(new Error("请再次输入密码"));
  }
  let re = /^[0-9a-zA-Z]*$/;

  if (!re.test(value)) {
    return callback(new Error("输入格式有误"));
  } else if (value !== ruleForm.value.password) {
    return callback(new Error("两次输入密码不一致"));
  } else {
    return callback();
  }
};

const rules = ref({
  phoneNumber: [
    { required: true, validator: checkPhoneNumber, trigger: "blur" },
  ],
  password: [{ required: true, validator: checkPassword, trigger: "blur" }],
  confirmPassword: [
    { required: true, validator: checkConfirmPassword, trigger: "blur" },
  ],
});

const submitForm = async (formEl: any): Promise<void> => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { phoneNumber, password, userName } = ruleForm.value;
      const hashPassword = CryptoJS.SHA256(password).toString();
      let dataObject = {
        phoneNumber,
        password: hashPassword,
        userName,
      };
      RegUser(dataObject)?.then(function (res) {
        // console.log(res.data.token);
        if (res.data.status == 0) {
          store.loginIn();
          localStorage.setItem("token", res.data.token);
          ElMessage({
            message: "注册成功",
            type: "success",
          });
          setTimeout(() => {
            router.go(-1);
          }, 1000);
        } else if (res.data.status == 403) {
          ElMessage({ message: res.data.message, offset: 200, type: "error" });
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<style lang="less" scoped>
.form-box {
  width: 30%;
}
.form-select {
  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
    width: 35rem;
    height: 5.5rem;
    input {
      height: 4rem;
    }
  }
}

.form-button {
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
