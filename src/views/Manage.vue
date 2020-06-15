<template>
  <v-card flat tile height="100%">

    <!-- 上传图片 -->
    <v-dialog v-model="upload" max-width="700">
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
                  <v-file-input v-model="file" :rules="imgRules" prepend-icon="mdi-camera" accept="image/png, image/jpeg" show-size label="Image"></v-file-input>
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

    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Techs</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-autocomplete></v-autocomplete>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click.stop="upload = true">
        <v-icon>mdi-upload</v-icon>
      </v-btn>
      
    </v-toolbar>

    <v-container fluid>

      <v-row>
        <!-- <v-spacer></v-spacer> -->
        <v-col v-for="tech in techList" :key="tech._id" cols="12" sm="6" md="4">
          <v-card>
            <v-toolbar floating dark dense>
              <v-toolbar-title>{{ tech.name }}</v-toolbar-title>
            </v-toolbar>
            
            <v-tooltip bottom nudge-right=135> 
              <template v-slot:activator="{ on }">
                <v-img v-on="on" class="img" :src="`http://localhost:2000/${tech.path}`" height="300px">
                <!-- 图片文字 -->
                  <!-- <span class="headline white--text pl-4 pt-4" v-text="tech.by"></span> -->
                </v-img>
              </template>
              <span>Upload Time: {{ tech.upload_time}}</span>
            </v-tooltip>

            <v-card-actions class="white justify-center">
              <v-btn v-for="(operation, i) in operations" :key="i" :color="operation.color" class="white--text" fab icon small>
                <v-icon>{{ operation.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    techList: [],
    form: true,
    name: "", // 上传的 Tech 名
    file: null,
    upload: false, // 控制上传弹框
    nameRules: [
      v => !!v || '必填',
      v => v.length <= 10 || "长度需小于10",
    ], 
    imgRules: [
      v => !!v || '必填',
      v => !v || v.size < 5 * 1024 *1024 || '图片大小需小于 5 MB',
    ],
    uploadImg: null,
    operations: [
      {
        icon: "mdi-flower",
        color: "yellow"
      },
      {
        icon: "mdi-download",
        color: "cyan darken-1"
      },
      {
        icon: "mdi-delete",
        color: "red lighten-3"
      }
    ]
  }),
  mounted() {
    this.getTechList();
  },
  methods: {
    async getTechList(){
      const { data } = await this.$request.fetch("/api/img/tech");
      if (data.status === 200) {
        data.result.map(item => {
          item.upload_time = new Date(item.upload_time).toLocaleString();
        })
        this.techList = data.result;
      } else {
        this.$snackbar().showError();
      }
    },
    close (){
      this.upload = false;
      this.$refs.form.resetValidation();
      this.name = "";
      this.file = null;
    },
    async submit(){
      if(!this.form || this.file === null) return;
      this.upload = false;

      const file = new FormData();
      file.append('file', this.file);

      const options = {
        method: "POST",
        url: "/api/img/tech",
        data: file,
        formData: {
          name: this.name
        },
        headers: { "Content-Type": "multipart/form-data" }
      }
      const { data } = await this.$request.fetch(options);
      if (data.status === 200) {
        this.$snackbar().showOk('新增成功');
        this.getTechList();
      } else {
        this.$snackbar().showError('新增失败，请刷新重试');
      }
      this.$refs.form.resetValidation();
      this.name = "";
      this.file = null;
    }
  }
};
</script>
<style lang="scss" scope>
  .img {
    cursor: pointer;
  }
</style>