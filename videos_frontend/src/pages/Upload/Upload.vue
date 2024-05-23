<template>
  <div class="upload-page">
    <HeadLine
      :top_navigation_bar_login_background_color="'#ffffff'"
      top_navigation_bar_search_background_color="#ffffff !important"
      top_navigation_bar_shadow="0 2px 4px #00000014 !important"
    ></HeadLine>

    <ElForm
      ref="ruleFormRef"
      :rules="rules"
      :model="ruleForm"
      class="upload-form"
    >
      <ElFormItem prop="movieUrl" required class="form-select">
        <ElUpload
          ref="movieUpload"
          class="upload-movie"
          action="#"
          drag
          :auto-upload="false"
          :limit="1"
          :on-exceed="(files) => handleExceed(files, movieUpload)"
          :on-change="beforeMovieUpload"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">点击或拖拽上传视频（.mp4）</div>
        </ElUpload>
      </ElFormItem>

      <ElFormItem prop="imgUrl" required label-width="0px" class="form-select">
        <ElUpload
          ref="imgUpload"
          class="upload-movie"
          action="#"
          drag
          :auto-upload="false"
          :limit="1"
          :on-exceed="(files) => handleExceed(files, imgUpload)"
          :on-change="beforeImgUpload"
          list-type="picture"
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">点击或拖拽上传封面（.png/.jpg）</div>
        </ElUpload>
      </ElFormItem>

      <ElFormItem
        required
        prop="movieName"
        label="视频标题"
        class="form-select"
      >
        <ElInput
          type="text"
          placeholder="请输入"
          v-model="ruleForm.movieName"
          autocomplete="off"
        />
      </ElFormItem>

      <ElFormItem class="form-button">
        <el-button type="primary" size="large" @click="submitForm(ruleFormRef)"
          >确认上传</el-button
        >
      </ElFormItem>
    </ElForm>
    <!-- <input type="file" ref="fileInput" />

    <el-button type="success" @click="upload"> upload to server </el-button> -->
  </div>
</template>

<script setup lang="ts">
import { HeadLine } from "../../components";
import { FileUploaderClient } from "easy-file-uploader-client";
import { ref, Ref } from "vue";
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
} from "../../api/request.js";
import type {
  UploadInstance,
  UploadProps,
  UploadRawFile,
  FormInstance,
  FormRules,
} from "element-plus";

interface RuleForm {
  movieUrl: string;
  imgUrl: string;
  movieName: string;
}

enum UploadingFileType {
  "movie" = "movie",
  "img" = "img",
}

const ruleFormRef = ref<FormInstance>();

const ruleForm = ref<RuleForm>({
  movieUrl: "",
  imgUrl: "",
  movieName: "",
});

const rules = ref<FormRules<RuleForm>>({
  movieUrl: [{ required: true, message: "视频资源不能为空", trigger: "blur" }],
  imgUrl: [{ required: true, message: "视频封面不能为空", trigger: "blur" }],
  movieName: [{ required: true, message: "视频标题不能为空", trigger: "blur" }],
});

const movieUpload = ref<UploadInstance>();
const imgUpload = ref<UploadInstance>();
const uploadingFile = ref<File>();
const uploadingFileType = ref<UploadingFileType>();

let loading;

const fileInput = ref(null);
const HOST = "http://localhost:3007/";
let uploadId = "";

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

      switch (uploadingFileType.value) {
        case UploadingFileType.movie:
          ruleForm.value.movieUrl = `${HOST}${path}`;
          break
        case UploadingFileType.img:
          ruleForm.value.imgUrl = `${HOST}${path}`;
          break
      }

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

const beforeMovieUpload: UploadProps["onChange"] = async (uploadFile) => {
  //   console.log(uploadFile.raw.type);
  //   movieUpload.value.handleRemove(uploadFile);
  if (uploadFile.raw.type !== "video/mp4") {
    ElMessage.error("视频后缀需为 .mp4");
    movieUpload.value.handleRemove(uploadFile);
    return false;
  } else if (uploadFile.raw.size / 1024 / 1024 > 50) {
    ElMessage.error("视频大小不能超过 50M");
    movieUpload.value.handleRemove(uploadFile);
    return false;
  }
  loading = ElLoading.service({
    lock: true,
    text: "Loading",
    // background: "rgba(0, 0, 0, 0.7)",
  });
  uploadingFile.value = uploadFile.raw;
  uploadingFileType.value = UploadingFileType.movie;
  await fileUploaderClient.uploadFile(uploadFile.raw);
  //   movieUpload.value.handleStart(uploadFile.raw);
  //   return true;
};

const beforeImgUpload: UploadProps["onChange"] = async (uploadFile) => {
    console.log(uploadFile.raw.type);
  //   movieUpload.value.handleRemove(uploadFile);
  if (uploadFile.raw.type !== "image/png"  && uploadFile.raw.type !== "image/jpeg") {
    ElMessage.error("图片后缀需为 .png");
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
    // background: "rgba(0, 0, 0, 0.7)",
  });
  uploadingFile.value = uploadFile.raw;
  uploadingFileType.value = UploadingFileType.img;
  await fileUploaderClient.uploadFile(uploadFile.raw);
  //   movieUpload.value.handleStart(uploadFile.raw);
  //   return true;
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log("submit!", ruleForm.value);
      await confirmUpload(ruleForm.value);
      ElMessage({
        message: "保存成功",
        type: "success",
      });
      setTimeout(()=>{
        // location.reload();
      },1000)
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 上传按钮点击后触发的事件
const upload = () => {
  fileUploaderClient.uploadFile(fileInput.value.files[0]);
};
</script>

<style lang="less" scoped>
.upload-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.upload-form {
  width: 70%;
  margin-top: 100px;
  .upload-movie {
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
