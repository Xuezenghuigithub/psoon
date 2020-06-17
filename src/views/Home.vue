<template>
  <v-parallax height="2000" class="py-10" src="../assets/starry.jpg">

      <!-- 登录组件 -->
      <v-overlay opacity=".7" light v-show="showSignIn">
        <sign-in v-on:emitSignIn="emitSignIn" />
      </v-overlay>

      <!-- 注册组件 -->
      <v-overlay opacity=".7" light v-show="showSignUp">
        <sign-up v-on:emitSignUp="emitSignUp" />
      </v-overlay>

      <v-row class="text-center">
        <v-col cols="12">
          <v-img :src="require('../assets/logo.svg')" class="my-10" contain height="200" />
        </v-col>

        <v-col class="mb-4">
          <div class="display-2 font-weight-bold mb-3">
            Welcome to
            <span class="brand">Psoon</span>
          </div>

          <p class="subheading font-weight-regular font-chinese">
            快速合成你需要的技术架构图
          </p>
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="5">
          <v-card class="pa-3" color="rgba(198,208,222,.7)" elevation="10" hover light shaped>
            <v-autocomplete @change="selected1" label="Please Select Tech" :items="techList1" item-text="name"
              item-value="_id"></v-autocomplete>
            <v-img v-if="showImg1" alt="Tech1" height="400" contain :src="imgPath1"></v-img>
          </v-card>
        </v-col>
        

        <v-col cols="1" align="center">
          <v-menu offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon large :color="color">mdi-palette</v-icon>
              </v-btn>
            </template>
            <v-color-picker elevation=24 show-swatches v-model="color" @change="getColor">
            </v-color-picker>
          </v-menu>

        </v-col>

        <v-col cols="5">
          <v-card class="pa-3" color="rgba(198,208,222,.7)" elevation="10" hover light shaped>
            <v-autocomplete @change="selected2" label="Please Select Tech" :items="techList2" item-text="name" item-value="_id">
            </v-autocomplete>
            <v-img v-if="showImg2" alt="Tech2" height="400" :src="imgPath2"></v-img>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-10">
        <v-col align="center">
          <v-btn @click="ps" color="#222" elevation=24 width="180" height="70" class="compose-button" x-large><label>Magic</label>
          </v-btn>
        </v-col>
      </v-row>

      <v-row justify="center" v-show="showResult" class="mt-10">
        <v-col align="center">
            <canvas ref="canvas"></canvas>
        </v-col>
      </v-row>

  </v-parallax>

</template>

<script>
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { EventBus } from '@/utils/eventBus';
import Ps from '@/utils/ps';

export default {
  name: "Home",
  components: {
    SignIn,
    SignUp
  },
  data: () => ({
    staticPath: "http://localhost:2000/",
    techList1: [],
    techList2: [],
    showSignIn: false,
    showSignUp: false,
    imgPath1: "",
    imgPath2: "",
    showImg1: false,
    showImg2: false,
    showResult: false,
    color: '#fff', // canvas 背景颜色
  }),
  mounted() {
    this.getTechs();
    EventBus.$on('topBarLogin', param => {
      this.showSignIn = param;
    })
  },
  methods: {
    async getTechs() {
      const { data } = await this.$request.fetch("/api/tech/tech");
      if (data.status === 200) {
        this.techList1 = data.result;
        this.techList2 = data.result;
      } else {
        this.$snackbar().showError();
      }
    },
    
    // 登录 dialog 控制
    emitSignIn(data) {
      if (data.function === "close") {
        this.showSignIn = false;
        EventBus.$emit('loginBtn', false);
      } else if (data.function === "signUp") {
        this.showSignIn = false;
        this.showSignUp = !this.showSignIn;
      }
    },
    emitSignUp(data) {
      if (data.function === "close") {
        this.showSignUp = false;
      } else if (data.function === "signIn") {
        this.showSignUp = false;
        this.showSignIn = !this.showSignUp;
      }
    },
    selected1(_id) {
      this.showImg1 = true;
      this.techList2 = this.techList1;
      this.techList2 = this.techList2.filter(item => item._id !== _id);
      this.techList1.forEach(item => {
        if (item._id === _id) {
          this.imgPath1 = `${this.staticPath}${item.path}`
        }
      })
    },
    selected2(_id) {
      this.showImg2 = true;
      this.techList2.forEach(item => {
        if (item._id === _id) {
          this.imgPath2 = `${this.staticPath}${item.path}`
        }
      })
    },
    getColor(){

    },
    // 合成图片
    async ps(){
      const options = {
        width: 1000,
        height: 600,
        background: this.color,
        padding: 20
      }
      Ps.compose(this.$refs.canvas, this.imgPath1, this.imgPath2, options);
      this.showResult = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.brand {
  margin-left: 1rem;
  font-family: "Trande Winds";
  font-size: 5rem;
}
.compose-button {
  font-family: "Rye";
  font-weight: 700;
  font-size: 1.5rem !important;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff !important;
}
</style>