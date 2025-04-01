<template>
    <v-app-bar app :color="isDark ? 'blue-grey darken-4' : 'indigo accent-4'" dark>
  
      <!-- Desktop Links (Centered) -->
      <div class="nav-links d-none d-md-flex">
        <v-btn
          v-for="link in links"
          :key="link.text"
          text
          :to="link.route"
          class="nav-btn mx-2"
        >
          {{ link.text }}
        </v-btn>
      </div>
  
      <v-spacer></v-spacer>
  
      <!-- Dark Mode Toggle -->
      <v-btn icon class="mr-2" @click="toggleTheme">
        <v-icon>{{ isDark ? "mdi-weather-sunny" : "mdi-weather-night" }}</v-icon>
      </v-btn>
  
      <!-- Mobile Menu Button -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
    </v-app-bar>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useTheme } from "vuetify";
  
  const drawer = ref(false);
  const theme = useTheme();
  const isDark = ref(theme.global.name.value === "dark");
  
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    theme.global.name.value = isDark.value ? "dark" : "light";
  };
  
  const links = [
    { text: "Home", route: "/" },
    { text: "Courses", route: "/courses" },
    { text: "About", route: "/about" },
    { text: "Contact", route: "/contact" },
  ];
  </script>

  <style scoped>
  /* Center Navigation Links */
  .nav-links {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
  }
  
  /* Attractive Button Styles */
  .nav-btn {
    font-size: 16px;
    font-weight: bold;
    color: #249338;
    transition: 0.3s ease-in-out;
  }
  .nav-btn:hover {
    color: #3b45ff;
  }
  
  /* Ensure App Bar is Styled Properly */
  .v-app-bar {
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  </style>
  