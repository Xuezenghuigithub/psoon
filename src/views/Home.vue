<template>
  <v-container class="home">
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
          <v-autocomplete label="Please Select Tech" chips :items="techList1" item-text="name" item-value="_id"></v-autocomplete>
            <v-img></v-img>
        </v-card>
      </v-col>
      <v-col cols="2" align="center">
          <v-icon x-large color="blue">mdi-plus</v-icon>
      </v-col>
      <v-col cols="5">
        <v-card class="pa-3" color="rgba(198,208,222,.7)" elevation="10" hover light shaped>
          <v-autocomplete label="Please Select Tech" chips :items="techList1" item-text="name" item-value="_id"></v-autocomplete>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  data: () => ({
    techList1: [
      {
        _id: "32131231",
        name: "Node.js"
      },
    ]
  })
}
</script>
<style lang="scss" scoped>
.brand {
  margin-left: 1rem;
  font-family: "Trande Winds";
  font-size: 5rem;
}
</style>