<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Lesson Preview</h3>
        <button class="close-btn" @click="closeModal">
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>
      
      <div class="modal-body">
        <div class="lesson-info">
          <div class="lesson-type-badge" :class="lesson.type">
            <font-awesome-icon :icon="getLessonIcon(lesson.type)" />
            {{ formatLessonType(lesson.type) }}
          </div>
          <h4>{{ lesson.title }}</h4>
          <p v-if="lesson.description">{{ lesson.description }}</p>
        </div>
        
        <div class="lesson-content">
          <div v-if="lesson.type === 'video'" class="video-preview">
            <div class="video-placeholder">
              <font-awesome-icon :icon="['fas', 'play-circle']" />
              <p>Video preview would be shown here</p>
              <small>Duration: {{ formatDuration(lesson.duration) }}</small>
            </div>
          </div>
          
          <div v-else-if="lesson.type === 'quiz'" class="quiz-preview">
            <div class="quiz-placeholder">
              <font-awesome-icon :icon="['fas', 'question-circle']" />
              <p>Interactive quiz preview</p>
              <small>Estimated time: {{ formatDuration(lesson.duration) }}</small>
            </div>
          </div>
          
          <div v-else-if="lesson.type === 'assignment'" class="assignment-preview">
            <div class="assignment-placeholder">
              <font-awesome-icon :icon="['fas', 'file-alt']" />
              <p>Assignment instructions and requirements</p>
              <small>Estimated time: {{ formatDuration(lesson.duration) }}</small>
            </div>
          </div>
          
          <div v-else class="reading-preview">
            <div class="reading-placeholder">
              <font-awesome-icon :icon="['fas', 'book-open']" />
              <p>Reading material preview</p>
              <small>Estimated time: {{ formatDuration(lesson.duration) }}</small>
            </div>
          </div>
        </div>
        
        <div v-if="lesson.resources && lesson.resources.length > 0" class="lesson-resources">
          <h5>Resources</h5>
          <div class="resources-list">
            <div v-for="resource in lesson.resources" :key="resource.id" class="resource-item">
              <font-awesome-icon :icon="getResourceIcon(resource.type)" />
              <span class="resource-title">{{ resource.title }}</span>
              <span class="resource-size">{{ resource.size }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn-secondary-modern" @click="closeModal">
          Close Preview
        </button>
        <button v-if="!lesson.isLocked" class="btn-primary-modern" @click="startLesson">
          <font-awesome-icon :icon="['fas', 'play']" />
          Start Lesson
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/course';

interface Props {
  lesson: Lesson;
}

interface Emits {
  (e: 'close'): void;
  (e: 'start-lesson', lessonId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatLessonType = (type: string): string => {
  const types: Record<string, string> = {
    video: 'Video Lesson',
    quiz: 'Quiz',
    assignment: 'Assignment',
    reading: 'Reading Material',
    exercise: 'Exercise'
  };
  return types[type] || 'Lesson';
};

const getLessonIcon = (type: string): string[] => {
  const icons: Record<string, string[]> = {
    video: ['fas', 'play-circle'],
    quiz: ['fas', 'question-circle'],
    assignment: ['fas', 'file-alt'],
    reading: ['fas', 'book-open'],
    exercise: ['fas', 'code']
  };
  return icons[type] || ['fas', 'book-open'];
};

const getResourceIcon = (type: string): string[] => {
  const icons: Record<string, string[]> = {
    pdf: ['fas', 'file-pdf'],
    document: ['fas', 'file-alt'],
    zip: ['fas', 'file-archive'],
    video: ['fas', 'file-video'],
    audio: ['fas', 'file-audio'],
    image: ['fas', 'file-image'],
    code: ['fas', 'file-code']
  };
  return icons[type] || ['fas', 'file'];
};

const formatDuration = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours.toFixed(1)}h`;
};

const closeModal = () => {
  emit('close');
};

const startLesson = () => {
  emit('start-lesson', props.lesson.id);
  closeModal();
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
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: var(--fana-shadow-2xl);
  display: flex;
  flex-direction: column;
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
  flex: 1;
  overflow-y: auto;
}

.lesson-info {
  margin-bottom: var(--fana-space-6);
}

.lesson-type-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  margin-bottom: var(--fana-space-3);
}

.lesson-type-badge.video {
  background: rgba(59, 130, 246, 0.1);
  color: var(--fana-accent-blue);
}

.lesson-type-badge.quiz {
  background: rgba(245, 158, 11, 0.1);
  color: var(--fana-accent-orange);
}

.lesson-type-badge.assignment {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.lesson-type-badge.reading {
  background: rgba(16, 185, 129, 0.1);
  color: var(--fana-accent-green);
}

.lesson-info h4 {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.lesson-info p {
  color: var(--fana-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.lesson-content {
  margin-bottom: var(--fana-space-6);
}

.video-preview,
.quiz-preview,
.assignment-preview,
.reading-preview {
  border-radius: var(--fana-radius-lg);
  overflow: hidden;
}

.video-placeholder,
.quiz-placeholder,
.assignment-placeholder,
.reading-placeholder {
  height: 200px;
  background: var(--fana-bg-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--fana-text-muted);
}

.video-placeholder svg,
.quiz-placeholder svg,
.assignment-placeholder svg,
.reading-placeholder svg {
  font-size: 3rem;
  margin-bottom: var(--fana-space-3);
}

.video-placeholder svg {
  color: var(--fana-accent-blue);
}

.quiz-placeholder svg {
  color: var(--fana-accent-orange);
}

.assignment-placeholder svg {
  color: #8b5cf6;
}

.reading-placeholder svg {
  color: var(--fana-accent-green);
}

.lesson-resources {
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-4);
}

.lesson-resources h5 {
  font-size: var(--fana-text-base);
  font-weight: 600;
  margin-bottom: var(--fana-space-3);
  color: var(--fana-text-primary);
}

.resources-list {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
}

.resource-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-2);
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-md);
}

.resource-item svg {
  color: var(--fana-primary);
  width: 16px;
}

.resource-title {
  flex: 1;
  font-size: var(--fana-text-sm);
  color: var(--fana-text-primary);
}

.resource-size {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  gap: var(--fana-space-3);
  padding: var(--fana-space-6);
  border-top: 1px solid var(--fana-border-color);
}

.btn-primary-modern,
.btn-secondary-modern {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-6);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  border: none;
}

.btn-primary-modern {
  background: var(--fana-gradient-primary);
  color: white;
}

.btn-primary-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

.btn-secondary-modern {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
}

.btn-secondary-modern:hover {
  background: var(--fana-bg-tertiary);
  border-color: var(--fana-primary);
  color: var(--fana-primary);
}

@media (max-width: 768px) {
  .modal-content {
    margin: var(--fana-space-4);
  }
  
  .modal-footer {
    flex-direction: column;
  }
}
</style>