<template>
  <div class="mine-page">
    <div class="form-item-button">
      <el-button type="primary" size="large" @click="toggleReadOnly(true)"
        >取消</el-button
      >
      <el-button type="primary" size="large" @click="submitForm(ruleFormRef)"
        >确认修改</el-button
      >
    </div>
    <ElForm
      ref="ruleFormRef"
      :rules="rules"
      :model="ruleFormCopy"
      class="mine-form"
    >
      <ElFormItem
        required
        prop="phoneNumber"
        label="手机号："
        label-width="100px"
        class="form-select"
      >
        <ElInput
          type="text"
          disabled
          v-model="ruleFormCopy.phoneNumber"
          autocomplete="off"
        />
      </ElFormItem>
      <ElFormItem
        required
        prop="userName"
        label-width="100px"
        label="用户昵称："
        class="form-select"
      >
        <ElInput
          type="text"
          placeholder="请输入"
          v-model="ruleFormCopy.userName"
          autocomplete="off"
        />
      </ElFormItem>

      <ElFormItem
        prop="description"
        label-width="100px"
        label="简介："
        class="form-select"
      >
        <ElInput
          type="text"
          placeholder="请输入"
          v-model="ruleFormCopy.description"
          autocomplete="off"
        />
      </ElFormItem>


      <ElFormItem
        prop="userAge"
        label-width="100px"
        label="年龄："
        class="form-select"
      >
        <ElInput
          type="text"
          placeholder="请输入"
          v-model="ruleFormCopy.userAge"
          autocomplete="off"
        />
      </ElFormItem>

      <ElFormItem prop="userImgUrl" label-width="0px" class="form-select">
        <ElUpload
          v-model:file-list="imgFileList"
          ref="imgUpload"
          class="mine-movie"
          action="#"
          drag
          :auto-upload="false"
          :limit="1"
          :on-exceed="(files) => handleExceed(files, imgUpload)"
          :on-change="beforeImgUpload"
          list-type="picture"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">点击或拖拽上传头像(.png/.jpg)</div>

        </ElUpload>
      </ElFormItem>
    </ElForm>
    <!-- <input type="file" ref="fileInput" />
  
      <el-button type="success" @click="upload"> upload to server </el-button> -->
  </div>
</template>

<script setup lang="ts">
import { FileUploaderClient } from "easy-file-uploader-client";
import { ref, defineProps, PropType, watch, onMounted } from "vue";
import {
  ElUpload,
  genFileId,
  ElMessage,
  ElForm,
  ElFormItem,
  ElLoading,
  ElInput,
} from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import {
  InitUpload,
  UploadPart,
  FinishUpload,
  confirmUpload,
} from "../../../api/request.js";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  FormInstance,
  FormRules,
} from "element-plus";
import type { RuleForm } from "../enum.ts";

enum UploadingFileType {
  "img" = "img",
}

const ruleFormRef = ref<FormInstance>();

const ruleFormCopy = ref<RuleForm>({
  userName: "",
  userImgUrl: "",
  userAge: "",
  phoneNumber: "",
  description: "",
});

const props = defineProps({
  ruleForm: Object as PropType<RuleForm>,
  toggleReadOnly: Function as PropType<(status: boolean) => void>,
  userInfoChange: Function as PropType<(ruleForm: RuleForm) => void>,
});

const imgFileList = ref<UploadProps["fileList"]>([]);

const rules = ref<FormRules<RuleForm>>({
  userName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
});

const imgUpload = ref<UploadInstance>();
const uploadingFile = ref<File>();
const uploadingFileType = ref<UploadingFileType>();

let loading;

const HOST = "http://localhost:3007/";
let uploadId = "";

watch(
  () => props.ruleForm,
  (cur, pre) => {
    // console.log(cur, pre);
    ruleFormCopy.value = cur;
    imgFileList.value = [
      {
        name: "头像",
        url: cur.userImgUrl,
      },
    ];
  }
);

onMounted(()=>{
  // console.log(props.ruleForm)
  ruleFormCopy.value = props.ruleForm;
    imgFileList.value = [
      {
        name: "头像",
        url: props.ruleForm.userImgUrl,
      },
    ];
})

// 实例化模块对象
const fileUploaderClient = new FileUploaderClient({
  // 传入的分片大小
  chunkSize: 2 * 1024 * 1024,
  requestOptions: {
    // 上传失败重新上传的次数
    retryTimes: 2,
    // 初始化上传目录的函数
    initFilePartUploadFunc: async () => {
      const fileName = uploadingFile.value.name;
      const data = await InitUpload({
        name: fileName,
      });
      //   const { data } = await axios.post(`${HOST}api/initUpload`, {
      //     name: fileName,
      //   });
      uploadId = data.uploadId;
      console.log("初始化上传完成");
    },
    // 上传分片的函数
    uploadPartFileFunc: async (chunk, index) => {
      const formData = new FormData();
      formData.append("uploadId", uploadId);
      formData.append("partIndex", index.toString());
      formData.append("partFile", chunk);
      console.log("formData", formData);
      await UploadPart(formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      //   await axios.post(`${HOST}api/uploadPart`, formData, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   });
      console.log(`上传分片 ${index}完成`);
    },
    // 上传完分片后的合并文件函数
    finishFilePartUploadFunc: async (md5) => {
      const fileName = uploadingFile.value.name;

      const { path } = await FinishUpload({
        name: fileName,
        uploadId,
        md5,
        uploadingFileType: uploadingFileType.value,
      });
      console.log(`上传完成，存储地址为：${HOST}${path}`);

      ruleFormCopy.value.userImgUrl = `${HOST}${path}`;

      //   const { data } = await axios.post(`${HOST}api/FinishUpload`, {
      //     name: fileName,
      //     uploadId,
      //     md5,
      //   });

      loading.close();
      ElMessage({
        message: "上传成功",
        type: "success",
      });
    },
  },
});

const handleExceed = (files: File[], uploadRef: UploadInstance) => {
  uploadRef!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef!.handleStart(file);
};

const beforeImgUpload: UploadProps["onChange"] = async (uploadFile) => {
  //   console.log(uploadFile.raw.type);
  //   movieUpload.value.handleRemove(uploadFile);
  if (uploadFile.raw.type !== "image/png" && uploadFile.raw.type !== "image/jpeg") {
    ElMessage.error("图片后缀需为 .png/.jpg");
    imgUpload.value.handleRemove(uploadFile);
    return false;
  } else if (uploadFile.raw.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过 2M");
    imgUpload.value.handleRemove(uploadFile);
    return false;
  }
  loading = ElLoading.service({
    lock: true,
    text: "Loading",
  });
  uploadingFile.value = uploadFile.raw;
  uploadingFileType.value = UploadingFileType.img;
  await fileUploaderClient.uploadFile(uploadFile.raw);
  //   movieUpload.value.handleStart(uploadFile.raw);
  //   return true;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!", ruleFormCopy.value);
      props?.userInfoChange(ruleFormCopy.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="less" scoped>
.mine-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}
.form-item-button {
  position: absolute;
  top: -75px;
  right: 70px;
}
.mine-form {
  width: 70%;
  .mine-movie {
    width: 100%;
  }
}

.form-button {
  display: flex;
  justify-content: center;
  ::v-deep .el-form-item__content {
    justify-content: center;
  }
}
</style>
