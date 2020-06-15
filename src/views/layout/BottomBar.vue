<template>
  <v-bottom-navigation dark hide-on-scroll horizontal>
    <v-btn :disabled="likeCount >=10 ? true :false" @click="like" value="recent" block>
      <span>Like</span>
      <v-icon>mdi-thumb-up-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      likeCount: 0
    };
  },
  mounted() {
    localStorage.setItem('likeCount', 0);
    this.getCount();
  },
  methods: {
    getCount(){
      const { data } = this.$request.fetch('/api/other/like');
      console.log(data);
    },
    async like(){
      const count = localStorage.getItem('likeCount');
      if (count >= 10) return;

      const { data } = await this.$request.fetch('/api/other/like', {}, 'post');
      if (data.status === 200) {
        const newCount = 1 + parseInt(count);
        localStorage.setItem('likeCount', newCount);
        this.likeCount = newCount;
      } else {
        this.$snackbar().showError('点赞失败，请刷新重试');
      }
    }
  },
};
</script>

<style lang="" scoped>
</style>
