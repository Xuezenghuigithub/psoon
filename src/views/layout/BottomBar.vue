<template>
  <v-bottom-navigation dark hide-on-scroll horizontal>
    <v-btn :disabled="ownCount >=10 ? true :false" @click="like" value="recent" block>
      <span>Like {{likeCount}}</span>
      <v-icon>{{ ownCount >= 10 ? "mdi-thumb-up" : "mdi-thumb-up-outline" }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      likeCount: 0, // 总点赞数
      ownCount: 0 // 用户的点赞数，最大为10
    };
  },
  mounted() {
    localStorage.setItem('ownCount', 0);
    this.ownCount = parseInt(localStorage.getItem('ownCount'));
    this.getCount();
  },
  methods: {
    async getCount(){
      const { data } = await this.$request.fetch('/api/other/like');
      if (data.status === 200) {
        this.likeCount = data.result.count;
      } else {
        this.$snackbar().showError();
      }
    },
    async like(){
      const ownCount = parseInt(localStorage.getItem('ownCount'))
      if (ownCount >= 10) return;

      const { data } = await this.$request.fetch('/api/other/like', {}, 'post');
      if (data.status === 200) {
        this.likeCount = data.result.count + 1;
        const newCount = ownCount + 1; // 用户新的 count
        localStorage.setItem('ownCount', newCount);
        this.ownCount = newCount;
      } else {
        this.$snackbar().showError('点赞失败，请刷新重试');
      }
    }
  },
};
</script>

<style lang="" scoped>
</style>
