<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-container>
      <v-card class="pa-4">
        <v-card-text>
          Vuetify-based UI for Online Learning App using Vue.js + Django
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WelcomeMessage",
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
