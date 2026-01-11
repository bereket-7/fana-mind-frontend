<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Course Preview</h3>
        <button class="close-btn" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      
      <div class="modal-body">
        <div class="video-container">
          <video 
            v-if="course.trailer"
            :src="course.trailer" 
            controls 
            autoplay
            class="preview-video"
          >
            Your browser does not support the video tag.
          </video>
          <div v-else class="no-preview">
            <font-awesome-icon :icon="['fas', 'video']" />
            <p>No preview available for this course</p>
          </div>
        </div>
        
        <div class="preview-info">
          <h4>{{ course.title }}</h4>
          <p>{{ course.subtitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '@/types/course';

interface Props {
  course: Course;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const closeModal = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--fana-z-modal);
  padding: var(--fana-space-4);
}

.modal-content {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: var(--fana-shadow-2xl);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-6);
  border-bottom: 1px solid var(--fana-border-color);
}

.modal-header h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin: 0;
}

.close-btn {
  width: 40px;
  height: 40px;
  background: var(--fana-bg-secondary);
  border: none;
  border-radius: var(--fana-radius-full);
  color: var(--fana-text-secondary);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--fana-accent-red);
  color: white;
}

.modal-body {
  padding: var(--fana-space-6);
}

.video-container {
  margin-bottom: var(--fana-space-6);
}

.preview-video {
  width: 100%;
  height: 400px;
  border-radius: var(--fana-radius-lg);
}

.no-preview {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  color: var(--fana-text-muted);
}

.no-preview svg {
  font-size: 3rem;
  margin-bottom: var(--fana-space-4);
}

.preview-info h4 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.preview-info p {
  color: var(--fana-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .modal-content {
    margin: var(--fana-space-4);
  }
  
  .preview-video {
    height: 250px;
  }
  
  .no-preview {
    height: 250px;
  }
}
</style>