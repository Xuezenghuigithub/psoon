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
          <v-text-field :rules="nameRules" label="Username" v-model="username" class="input">
          </v-text-field>
        </v-row>

        <v-row class="input-row">
          <v-col>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
          </v-col>
          <v-text-field :rules="passwordRules" label="Password" v-model="password" type="password" class="input">
          </v-text-field>
        </v-row>

        <v-row class="input-row">
          <v-col>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path
                d="M17.051,3.302H2.949c-0.866,0-1.567,0.702-1.567,1.567v10.184c0,0.865,0.701,1.568,1.567,1.568h14.102c0.865,0,1.566-0.703,1.566-1.568V4.869C18.617,4.003,17.916,3.302,17.051,3.302z M17.834,15.053c0,0.434-0.35,0.783-0.783,0.783H2.949c-0.433,0-0.784-0.35-0.784-0.783V4.869c0-0.433,0.351-0.784,0.784-0.784h14.102c0.434,0,0.783,0.351,0.783,0.784V15.053zM15.877,5.362L10,9.179L4.123,5.362C3.941,5.245,3.699,5.296,3.581,5.477C3.463,5.659,3.515,5.901,3.696,6.019L9.61,9.86C9.732,9.939,9.879,9.935,10,9.874c0.121,0.062,0.268,0.065,0.39-0.014l5.915-3.841c0.18-0.118,0.232-0.36,0.115-0.542C16.301,5.296,16.059,5.245,15.877,5.362z" />
              <!-- <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" /> -->
            </svg>
          </v-col>
          <v-text-field validate-on-blur label="Email" :rules="emailRules" v-model="email" class="input">
          </v-text-field>
        </v-row>

        <v-row class="input-row">
          <v-btn width="100" :loading="sendCodeButtonLoading" :disabled="sendCodeButtonStep" large color="cyan darken-2"
            @click="sendCode" class="mt-1 ml-2">{{ sendCodeButtonText }}</v-btn>
          <v-text-field :rules="codeRules" validate-on-blur label="Code" v-model="code" class="input"></v-text-field>
        </v-row>

        <div>
          <v-btn :disabled="!valid" bottom class="submit" @click="submit" align="center" justify="center" width=300 rounded x-large
            color="#FF3366">
            Sign up
          </v-btn>
        </div>
      </v-form>
      <div class="sign-up-text">
        <span>Already have an account?</span>
        <a @click="signIn">Sign in</a>
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
      username: "",
      password: "",
      sendCodeButtonText: "发送验证码",
      sendCodeButtonStep: false,
      sendCodeButtonLoading: false,
      code: "", // 验证码
      nameRules: [v => !!v || "必填", v => v.length <= 10 || "长度需小于10"],
      passwordRules: [
        v => !!v || "必填",
        v => v.length <= 16 || "长度需小于16",
        v => v.length >= 6 || "长度需大于6"
      ],
      emailRules: [
        v => !!v || "必填",
        v =>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "格式有误"
      ],
      codeRules: [
        v => !!v || "必填",
        v => v.length == 6 || "格式有误"
      ],
      valid: true,
    };
  },
  methods: {
    close() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.code = "";

      this.$refs.form.resetValidation();
      this.$emit("emitSignUp", { function: "close" });
    },
    signIn() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.code = "";

      this.$refs.form.resetValidation();
      this.$emit("emitSignUp", { function: "signIn" });
    },
    // 发送验证码按钮事件
    async sendCode() {
      this.sendCodeButtonLoading = true;
      const { data } = await this.$request.fetch("/api/authCode", {
        email: this.email
      });
      if (data.status !== 200) {
        this.sendCodeButtonLoading = false;
        return this.$snackbar().showError("邮件发送失败，请刷新重试");
      }
      this.$snackbar().showOk("邮件发送成功");
      this.sendCodeButtonLoading = false;

      this.sendCodeButtonText = 60;
      this.sendCodeButtonStep = true;
      const timer = setInterval(() => {
        this.sendCodeButtonText--;
        if (this.sendCodeButtonText <= 0) {
          this.sendCodeButtonStep = false;
          this.sendCodeButtonText = "发送验证码";
          clearInterval(timer);
        }
      }, 1000);
    },
    // 注册按钮事件
    async submit() {
      const password = md5(this.password);
      const param = { email: this.email, username: this.username, password, code: this.code };
      const { data } = await this.$request.fetch("/api/user", param, "post");
      if (data.status === 200) {
        this.$snackbar().showOk("注册成功，登录吧狗子");
        this.signIn();
      } else if(data.status === 5022){
        this.$snackbar().showError("验证码已过期");
      } else if(data.status === 5023){
        this.$snackbar().showError("验证码错误");
      } else if(data.status === 5024){
        this.$snackbar().showError("用户已存在");
      } else {
        this.$snackbar().showError("注册失败，找 Zander 去吧");
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
  top: 30%;
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
  margin-bottom: -5rem;
  left: 50%;
  transform: translate(-63%, 0);
}
.v-btn {
  text-transform: none;
}
.sign-up-text {
  position: absolute;
  width: 100%;
  margin-left: 50%;
  top: 93%;
  transform: translate(-25%, 0);
  span {
    color: #aba8ae;
  }
  a {
    margin-left: 0.5rem;
    color: #fff;
  }
}
</style>