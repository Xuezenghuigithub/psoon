<template>
  <v-snackbar class="snackbar" top :color="color" right v-model="snackbar" :timeout="timeout">
    <v-icon dark class="mr-3" size="20">{{alertTip}}</v-icon>
    <div class="font-chinese">{{titleTip}}</div>
    <v-icon dark size="16" @click="close">mdi-close</v-icon>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      titleTip: "",
      alertTip: "",
      timeout: 3000,
      color: "success"
    };
  },
  methods: {
    close() {
      this.snackbar = false;
    },
    show(titleTip, alertTip = "mdi-alarm-light-outline", color) {
      this.snackbar = true;
      this.titleTip = titleTip;
      this.alertTip = alertTip;
      this.color = color;
    }
  }
};
</script>

<style lang="scss" scope>
.success {
  background-color: rgb(17, 134, 151);
}

.error {
  background-color: #FF3366;
}
</style>