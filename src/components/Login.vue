<template>
  <v-container class="container">
    <v-card class="card">
      <v-btn depressed icon large right absolute text @click="close" class="mt-3">
        <v-icon large>mdi-close</v-icon>
      </v-btn>
      <v-form class="form" ref="form" v-model="valid">
        <v-row class="input-row">
          <v-col>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
            </svg>
          </v-col>
          <v-text-field :rules="emailRules" label="Email" v-model="email" class="input"></v-text-field>
        </v-row>

        <v-row class="input-row">
          <v-col>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
          </v-col>
          <v-text-field :rules="passwordRules" label="Password" v-model="password" type="password" class="input"></v-text-field>
        </v-row>

        <div>
          <v-btn @click="submit" :disabled="!valid" absolute bottom class="submit" align="center" justify="center" width=300 rounded x-large
            color="#FF3366">
            Sign in</v-btn>
        </div>
      </v-form>
      <div class="sign-up-text">
        <span class="">Don't have an account?</span>
        <a @click="signUp">Sign up</a>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import md5 from "js-md5";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        v => !!v || "必填",
        v =>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "格式有误"
      ],
      passwordRules: [
        v => !!v || "必填",
        v => v.length <= 16 || "长度需小于16",
        v => v.length >= 6 || "长度需大于6"
      ],
      valid: true,

    };
  },
  methods: {
    close() {
      this.username = "";
      this.password = "";
      this.$refs.form.resetValidation();

      this.$emit("emitLogin", { function: "close" });
    },
    signUp() {
      this.username = "";
      this.password = "";
      this.$refs.form.resetValidation();

      this.$emit("emitLogin", { function: "signUp" });
    },
    async submit() {
      const password = md5(this.password);

      const { data } = await this.$request.fetch('/api/login', { email: this.email, password }, 'post');
      if (data.status === 200) {
        this.$snackbar().showOk('登录成功');
        localStorage.setItem('username', data.result.username);
        localStorage.setItem('isAdmin', data.result.is_admin);
        this.close();
      } else if(data.status === 5021){
        this.$snackbar().showError('用户不存在');
      } else if(data.status === 5022){
        this.$snackbar().showError('密码错误');
      } else {
        this.$snackbar().showError();
      }
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
  top: 50%;
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
  margin-bottom: 4rem;
  left: 50%;
  transform: translate(-50%, 0);
}
.v-btn {
  text-transform: none;
}
.sign-up-text {
  position: absolute;
  top: 93%;
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
