<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
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
          <v-autocomplete @change="selected" label="Please Select Tech" :items="techList1" item-text="name" item-value="_id"></v-autocomplete>
          <v-img alt="tech1" height="400" contain src="../assets/starry.jpg"></v-img>
        </v-card>
      </v-col>

      <v-col cols="2" align="center">
          <v-icon x-large color="blue">mdi-plus</v-icon>
      </v-col>

      <v-col cols="5">
        <v-card class="pa-3" color="rgba(198,208,222,.7)" elevation="10" hover light shaped>
          <v-autocomplete label="Please Select Tech" :items="techList2" item-text="name" item-value="_id"></v-autocomplete>
          <v-img alt="tech2" ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
      <v-col align="center">
        <v-btn color="#222" elevation=24 width="180" height="70" class="compose-button" x-large><label>Magic</label></v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    techList1: [],
    techList2: [],
    src1: "../assets/starry.jpg",
    src2: ""
  }),
  mounted() {
    this.getTechs();
  },
  methods: {
    async getTechs(){
      const { data } = await this.$request.fetch('/api/img/tech');
      if (data.status === 200) {
        this.techList1 = data.result;
        this.techList2 = data.result;
      } else {
        this.$snackbar().showError();
      }
    },
    selected(_id){
      this.techList2 = this.techList2.filter(item => item._id !== _id);

      // const { data } = this.$request.fetch('/api/img/img', { _id }, 'post');
      // console.log(data);
    }
  }
}
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
  text-transform: uppercase;
  font-size: 1.5rem !important;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff !important;
  label {
    z-index: 999;
    cursor: pointer;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 400%;
    width: 190%;
    background: #78c7d2;
    -webkit-transition: all .8s ease-in-out;
    transition: all .8s ease-in-out;
    -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
    transform: translateX(-98%) translateY(-25%) rotate(45deg);
  }
  &:hover:after {
    -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
    transform: translateX(-9%) translateY(-25%) rotate(45deg);
}
}
</style>