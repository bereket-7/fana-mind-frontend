<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <WelcomeMessage msg="Welcome to Fana-Mind Academy" /> -->
     <WelcomeMessage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WelcomeMessage from "@/components/WelcomeMessage.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    WelcomeMessage,
  },
});
</script>
