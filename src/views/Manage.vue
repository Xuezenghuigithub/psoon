<template>
  <v-card flat tile height="100%" class="card">

    <!-- 上传图片 -->
    <v-dialog persistent dark v-model="upload" max-width="700">
      <v-card>
        <v-card-title>
          <span class="headline">Upload Tech</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="form" ref="form">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field :rules="nameRules" v-model="name" label="Name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-file-input v-model="file" :rules="imgRules" prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg, image/svg+xml" show-size label="Image"></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 删除确认 -->
    <v-dialog overlay-color="red" persistent dark v-model="deleteDialog" max-width="700">
      <v-card>
        <v-card-title>
          <span class="headline">Are you sure to delete that tech?</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="deleteDialog = false">No</v-btn>
          <v-btn color="blue darken-1" text @click="deleteTech">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar color="#009efd" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Techs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-autocomplete v-model="tech" class="mt-5" height="50" :items="searchList" item-text="name" item-value="_id" width=400>
      </v-autocomplete>
      <v-btn icon @click="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click.stop="upload = true">
        <v-icon>mdi-upload</v-icon>
      </v-btn>

    </v-toolbar>

    <v-container fluid>

      <v-row>
        <v-col v-for="tech in techList" :key="tech._id" cols="12" sm="6" md="4">
          <v-card>
            <v-toolbar floating dark dense>
              <v-toolbar-title>{{ tech.name }}</v-toolbar-title>
            </v-toolbar>

            <v-tooltip bottom nudge-right=135>
              <template v-slot:activator="{ on }">
                <v-img v-on="on" class="img" :src="`${staticPath}${tech.path}`" height="300px">
                  <!-- 图片文字 -->
                  <!-- <span class="headline white--text pl-4 pt-4" v-text="tech.by"></span> -->
                </v-img>
              </template>
              <span>Upload Time: {{ tech.upload_time}}</span>
            </v-tooltip>

            <v-card-actions class="white justify-center">
              <v-btn color="yellow" class="white--text" fab icon small>
                <v-icon>mdi-flower</v-icon>
              </v-btn>
              <v-btn @click="download(tech)" color="cyan darken-1" class="white--text" fab icon small>
                <v-icon>mdi-download</v-icon>
              </v-btn>
              <v-btn @click="handleDelete(tech)" color="red lighten-3" class="white--text" fab icon small>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Ps from '@/utils/ps';
export default {
  data: () => ({
    staticPath: "http://localhost:2000/",
    techList: [],
    searchList: [],
    form: true,
    name: "", // 上传的 Tech 名
    file: null,
    tech: "",
    upload: false, // 控制上传弹框
    nameRules: [v => !!v || "必填", v => v.length <= 10 || "长度需小于10"],
    imgRules: [
      v => !!v || "必填",
      v => !v || v.size < 5 * 1024 * 1024 || "图片大小需小于 5 MB"
    ],
    uploadImg: null,
    downloadUrl: "",
    deleteDialog: false,
    deleteId: ""
  }),
  mounted() {
    this.getTechList();
  },
  methods: {
    async getTechList() {
      const { data } = await this.$request.fetch("/api/tech/tech");
      if (data.status === 200) {
        this.techList = [];
        this.searchList = [];
        data.result.map(item => {
          item.upload_time = new Date(item.upload_time).toLocaleString();
          this.techList.push(item);
          this.searchList.push(item);
        });
      } else {
        this.$snackbar().showError();
      }
    },
    close() {
      this.upload = false;
      this.$refs.form.resetValidation();
      this.name = "";
      this.file = null;
    },
    async submit() {
      if (!this.form || this.file === null) return;
      this.upload = false;

      // 处理图片大小
      const reader = new FileReader(); // 实例化对象
      reader.readAsDataURL(this.file); // 开始异步读取文件

      const newFile = await new Promise((resolve, reject) => {
          reader.onload = async function (e) { // 读取完文件后触发的函数
          const img = new Image();
          img.src = e.target.result;
          resolve(await Ps.changeSize(img, 500));
        }
      })
      const file = new FormData();
      file.append("file", newFile);
      file.append("name", this.name);
      const options = {
        method: "POST",
        url: "/api/tech/tech",
        data: file,
        headers: { "Content-Type": "multipart/form-data" }
      };
      const { data } = await this.$request.fetch(options);
      if (data.status === 200) {
        this.$snackbar().showOk("新增成功");
        this.getTechList();
      } else {
        this.$snackbar().showError("新增失败，请刷新重试");
      }
      this.$refs.form.resetValidation();
      this.name = "";
      this.file = null;
    },

    download(tech){
      const src = `${this.staticPath}${tech.path}`;
      this.downloadIamge(src, tech.name);
    },

    downloadIamge(imgsrc, name) {
      // 下载图片地址和图片名
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute('crossOrigin', 'anonymous');
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL('image/png'); // 得到图片的base64编码数据
        const a = document.createElement('a'); // 生成一个a元素
        a.download = name || 'photo'; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.click();
      };
      image.src = imgsrc;
    },

    handleDelete(tech){
      this.deleteId = tech._id;
      this.deleteDialog = true;
    },

    async deleteTech(){
      const { data } = await this.$request.fetch('/api/tech/tech', { _id: this.deleteId }, 'delete');
      if (data.status === 200) {
        this.$snackbar().showOk("删除成功");
        this.getTechList();
      } else {
        this.$snackbar().showError("删除失败，请刷新重试");
      }
      this.deleteDialog = false;
    },

    async search(){
      if (!this.tech) {
        return await this.getTechList();
      };
      await this.getTechList();
      this.techList = this.techList.filter(item => item._id === this.tech);
    }
  }
};
</script>
<style lang="scss" scope>
.card {
  background-image: linear-gradient(180deg,  #009efd 0%, #2af598 100%,);
}
.img {
  cursor: pointer;
}
</style>