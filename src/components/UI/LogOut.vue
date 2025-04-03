<template>
    <BButton 
      variant="outline-danger" 
      pill 
      class="logout-btn"
      @click="handleLogout"
      :disabled="loading"
    >
      <template v-if="!loading">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="me-2 text-danger" />
        
      </template>
      <template v-else>
        <BSpinner small type="grow" class="me-2" />
        Logging out...
      </template>
    </BButton>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  //import { useAuthStore } from '@/stores/auth'; // Assuming using Pinia for auth
  
  const router = useRouter();
  //const authStore = useAuthStore();
  const loading = ref(false);
  
  const handleLogout = async () => {
    loading.value = true;
    try {
     // await authStore.logout(); 
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .logout-btn {
    transition: all 0.3s ease;
    border-width: 3px;
    padding: 0.5rem;
  }
  
  .logout-btn:hover {
    background-color: rgb(255, 251, 251);
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
  }
  </style>