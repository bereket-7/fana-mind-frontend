<template>
  <div>
    <!-- Logout Button -->
    <BButton 
      variant="light"
      pill 
      class="logout-btn"
      @click="showModal = true"
    >
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="me-3 text-light" />
      <span class="text-light">Logout</span>
    </BButton>

    <!-- Confirmation Modal -->
    <BModal 
      v-model="showModal" 
      title="Confirm Logout" 
      title-class="h5"
      header-bg-variant="light"
      hide-footer
      centered
    >
      <p class="my-4">Are you sure you want to logout?</p>
      
      <div class="d-flex justify-content-end gap-3">
        <BButton 
          variant="secondary" 
          @click="showModal = false"
          class="px-4"
        >
          Cancel
        </BButton>
        <BButton 
          variant="danger" 
          @click="confirmLogout"
          class="px-4"
          :disabled="loading"
        >
          <template v-if="!loading">
            Logout
          </template>
          <template v-else>
            <BSpinner small type="grow" class="me-2" />
            Logging out...
          </template>
        </BButton>
      </div>
    </BModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  BButton, 
  BModal, 
  BSpinner 
} from 'bootstrap-vue-next';

const router = useRouter();
const loading = ref(false);
const showModal = ref(false);

const confirmLogout = async () => {
  loading.value = true;
  try {
    // await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    loading.value = false;
    showModal.value = false;
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
  transform: translate(-2px, -2px);
  box-shadow: 0 2px 6px rgba(220, 53, 69, 0.2);
}
</style>