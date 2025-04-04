<template>
  <FanaNavbar />
  <SignUp />
  <AddCourse />
  <FanaFooter />
   <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/about">Contact</router-link>
  </nav> -->
  <router-view />
</template>

<script setup>
import AddCourse from './components/UI/AddCourse.vue';
import FanaFooter from './components/UI/FanaFooter.vue';
import FanaLogin from './components/UI/FanaLogin.vue';
import FanaNavbar from './components/UI/FanaNavbar.vue';
import SignUp from './components/UI/SignUp.vue';

</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
