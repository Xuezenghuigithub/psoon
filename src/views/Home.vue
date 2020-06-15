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
            <v-autocomplete @change="selected" label="Please Select Tech" :items="techList1" item-text="name"
              item-value="_id"></v-autocomplete>
            <v-img alt="tech1" height="400" contain src="../assets/starry.jpg"></v-img>
          </v-card>
        </v-col>

        <v-col cols="2" align="center">
          <v-icon x-large color="blue">mdi-plus</v-icon>
        </v-col>

        <v-col cols="5">
          <v-card class="pa-3" color="rgba(198,208,222,.7)" elevation="10" hover light shaped>
            <v-autocomplete label="Please Select Tech" :items="techList2" item-text="name" item-value="_id">
            </v-autocomplete>
            <v-img alt="Tech2" :src="src"></v-img>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-10">
        <v-col align="center">
          <v-btn color="#222" elevation=24 width="180" height="70" class="compose-button" x-large><label>Magic</label>
          </v-btn>
        </v-col>
      </v-row>

  </v-parallax>

</template>

<script>
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { EventBus } from '@/utils/eventBus';

export default {
  name: "Home",
  components: {
    SignIn,
    SignUp
  },
  data: () => ({
    techList1: [],
    techList2: [],
    showSignIn: false,
    showSignUp: false,
    src: ""
  }),
  mounted() {
    this.getTechs();
    EventBus.$on('topBarLogin', param => {
      this.showSignIn = param;
    })
    this.src=`http://localhost:2000/images/zander.jpg`
  },
  methods: {
    async getTechs() {
      const { data } = await this.$request.fetch("/api/img/tech");
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
    selected(_id) {
      this.techList2 = this.techList2.filter(item => item._id !== _id);

      // const { data } = this.$request.fetch('/api/img/img', { _id }, 'post');
      // console.log(data);
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