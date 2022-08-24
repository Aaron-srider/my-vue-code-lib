<template>
  <el-container>
    <el-upload
      id="upload"
      drag
      multiple
      action="#"
      :auto-upload="false"
      :on-change="addFileHook"
      :on-remove="removeFileHook"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击选取</em></div>
    </el-upload>
    <el-button @click="uploadFile">上传</el-button>
  </el-container>
</template>

<script>
import { uploadFiles } from "./api.js";
export default {
  data() {
    return {
      uploadFileData: {
        fileList2Update: [],
      },
    };
  },
  methods: {
    /**
     * 添加文件后的钩子。可以获取添加文件后的文件列表和添加的文件（对象的raw属性是文件对应的File对象）。
     * @param file 被添加的文件，包含一个raw属性，表示文件对应的File对象
     * @param fileList 添加文件之后的文件列表，如果修改fileList，那么界面文件列表也好对应变化。可以将该列表中的数据
     * 保存起来，自定义发送数据。
     */
    addFileHook(file, fileList) {
      console.log("file:", file, "fileList:", fileList);

      // 判断 > 10M
      if (file.size > 1024 * 1024 * 10) {
        fileList.pop();
        let msg_size = `您上传的${file.name}，该文件大于10M，请您重新上传。`;
        let type = "size";
        this.$notify({
          title: `${type === "size" ? "文件大小不合规" : "文件数量不合规"}`,
          message: msg_size,
          iconClass: "el-icon-s-opportunity",
          customClass: "notify_size",
          duration: 5000,
        });
        return false;
      }

      this.uploadFileData.fileList2Update = fileList;
      return true;
    },

    /**
     * 删除文件后的钩子。可以获取删除文件后的文件列表和被删除的文件（对象的raw属性是文件对应的File对象）。
     * @param file 被删除的文件，包含一个raw属性，表示文件对应的File对象
     * @param fileList 删除文件之后的文件列表，如果修改fileList，那么界面文件列表也好对应变化。可以将该列表中的数据
     * 保存起来，自定义发送数据。
     */
    removeFileHook(file, fileList) {
      console.log("file:", file, "fileList:", fileList);
      this.uploadFileData.fileList2Update = fileList;
    },

    /**
     * 调用api上传文件
     */
    uploadFile() {
      // 传输文件
      let attachment = new FormData();
      this.uploadFileData.fileList2Update.forEach((item, index) => {
        attachment.append("attachment", item.raw);
      });
      try {
        let pa = /^\d*$/;
        if (!pa.test(this.goodId)) {
          throw new Error("goodId必须为数字");
        }
        uploadFiles(parseInt(this.goodId), attachment).then((jsonResult) => {});
      } catch (e) {
        this.$message.error(e.message);
      }
    },
  },
};
</script>

<style></style>
