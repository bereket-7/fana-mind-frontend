<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <font-awesome-icon :icon="['fas', 'graduation-cap']" class="me-2" />
          Fana Mind
        </router-link>
        
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">About</router-link>
        </div>
      </div>
    </nav>

    <main class="container-fluid py-4">
      <router-view />
    </main>

    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container text-center">
        <p>&copy; 2024 Fana Mind. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Simple setup for now - we'll add components gradually
</script>

<style>
#app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.navbar-brand {
  font-weight: 600;
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #fff !important;
}
</style>
