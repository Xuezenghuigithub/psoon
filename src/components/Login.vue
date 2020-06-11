<template>
  <v-container class="container">
    <v-card class="card">
      <v-btn depressed icon large right absolute text @click="close" class="mt-3">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
      <div class="form">
        <v-row class="input-row">
          <v-col>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
            </svg>
          </v-col>
          <v-text-field label="Email" :value="email" class="input"></v-text-field>
        </v-row>

        <v-row class="input-row">
          <v-col>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
          </v-col>
          <v-text-field label="Password" :value="password" type="password" class="input"></v-text-field>
        </v-row>
      </div>

      <div>
        <v-btn absolute bottom class="submit" align="center" justify="center" width=300 rounded x-large color="#FF3366">
          Sign in</v-btn>
      </div>

      <div class="sign-up-text">
        <span class="">Don't have an account?</span>
        <a>Sign up</a>
      </div>
    </v-card>
  </v-container>
</template>

<script>
// import md5 from "js-md5";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    close() {
      this.$emit("closeLogin", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 30rem;
  height: 43rem;
  overflow: hidden;
}
.svg-icon {
  cursor: pointer;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  overflow: visible;

  path {
    stroke: rgba(255, 255, 255, 0.9);
    fill: none;
    stroke-width: 1;
  }
}
.card {
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(146, 135, 187, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
}
.form {
  position: absolute;
  top: 45%;
  left: 0;
  width: 100%;
  height: 50%;
  padding: 0 2.5rem;
  text-align: center;
  .input-row {
    height: 5rem;
    padding-top: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    .input {
      display: inline-block;
      height: 100%;
      padding-left: 1.5rem;
      font-size: 1.5rem;
      color: #fdfcfd;
    }
  }
}
.submit {
  margin-bottom: 6rem;
  left: 50%;
  transform: translate(-50%, 0);
}
.v-btn {
  text-transform: none;
}
.sign-up-text {
  position: absolute;
  top: 87%;
  left: 50%;
  transform: translate(-50%, 0);
  span {
    color: #aba8ae;
  }
  a {
    margin-left: 0.5rem;
    color: #fff;
  }
}
</style>
