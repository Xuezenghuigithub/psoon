<template>
  <v-app>
    <top-bar></top-bar>

    <router-view class="container-index"></router-view>

    <bottom-bar></bottom-bar>
  </v-app>
</template>

<script>
import TopBar from "./views/layout/TopBar";
import BottomBar from "./views/layout/BottomBar";

export default {
  name: "App",
  components: {
    TopBar,
    BottomBar
  },
  data: () => ({}),
  mounted() {
    this.setUsername();
  },
  methods: {
    setUsername() {
      const username = localStorage.getItem("username");
      if (username) {
        this.username = username;
        this.loginFlag = false;
      }
    },
    login() {
      this.showSignIn = true;
    }
  }
};
</script>
<style lang="scss">
@import "../src/assets/css/font.css";
@import "@/assets/css/common.scss";

html {
  a {
    text-decoration: none;
  }
  font-size: 16px;
  height: 100%;
  overflow: hidden;
}
.container-index {
  margin-top: 4rem;
}
</style>