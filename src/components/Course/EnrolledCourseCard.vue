<template>
  <div class="enrolled-course-card">
    <div class="course-image-container">
      <img :src="course.thumbnail" :alt="course.title" class="course-image" />
      <div class="progress-overlay">
        <div class="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="8"/>
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="white" 
              stroke-width="8" 
              stroke-linecap="round" 
              :stroke-dasharray="283" 
              :stroke-dashoffset="283 - (283 * course.progress / 100)"
              class="progress-bar"
            />
          </svg>
          <div class="progress-text">{{ course.progress }}%</div>
        </div>
      </div>
    </div>

    <div class="course-content">
      <div class="course-header">
        <h3 class="course-title">{{ course.title }}</h3>
        <div class="course-status" :class="course.status">
          {{ formatStatus(course.status) }}
        </div>
      </div>

      <p class="course-instructor">by {{ course.instructor }}</p>

      <div class="course-progress-info">
        <div class="progress-stats">
          <span>{{ course.completedLessons }}/{{ course.totalLessons }} lessons</span>
          <span>{{ course.timeSpent }}h spent</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-bg">
            <div 
              class="progress-bar-fill" 
              :style="{ width: `${course.progress}%` }"
            ></div>
          </div>
        </div>
      </div>

      <div v-if="course.nextLesson" class="next-lesson">
        <h4>Next Lesson:</h4>
        <p>{{ course.nextLesson }}</p>
      </div>

      <div class="course-actions">
        <button 
          v-if="course.status === 'completed'"
          class="btn-secondary-modern"
          @click="viewCertificate"
        >
          <font-awesome-icon :icon="['fas', 'certificate']" />
          View Certificate
        </button>
        <button 
          v-else
          class="btn-primary-modern"
          @click="continueCourse"
        >
          <font-awesome-icon :icon="['fas', 'play']" />
          {{ course.progress === 0 ? 'Start Course' : 'Continue Learning' }}
        </button>
      </div>

      <div class="course-meta">
        <span class="last-accessed">
          Last accessed: {{ formatDate(course.lastAccessed) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: string;
  status: 'not-started' | 'in-progress' | 'completed';
  timeSpent: number;
  nextLesson?: string;
}

interface Props {
  course: EnrolledCourse;
}

interface Emits {
  (e: 'continue', courseId: string): void;
  (e: 'view-certificate', courseId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatStatus = (status: string): string => {
  switch (status) {
    case 'not-started': return 'Not Started';
    case 'in-progress': return 'In Progress';
    case 'completed': return 'Completed';
    default: return status;
  }
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const continueCourse = () => {
  emit('continue', props.course.id);
};

const viewCertificate = () => {
  emit('view-certificate', props.course.id);
};
</script>

<style scoped>
.enrolled-course-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
  transition: all var(--fana-transition-base);
  border: 1px solid var(--fana-border-color);
}

.enrolled-course-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--fana-shadow-lg);
}

.course-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.progress-overlay {
  position: absolute;
  top: var(--fana-space-4);
  right: var(--fana-space-4);
}

.progress-circle {
  position: relative;
  width: 60px;
  height: 60px;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bar {
  transition: stroke-dashoffset 1s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--fana-text-sm);
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.course-content {
  padding: var(--fana-space-6);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--fana-space-3);
}

.course-title {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin: 0;
  flex: 1;
  margin-right: var(--fana-space-3);
}

.course-status {
  padding: var(--fana-space-1) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.course-status.not-started {
  background: rgba(156, 163, 175, 0.1);
  color: var(--fana-text-muted);
}

.course-status.in-progress {
  background: rgba(59, 130, 246, 0.1);
  color: var(--fana-accent-blue);
}

.course-status.completed {
  background: rgba(16, 185, 129, 0.1);
  color: var(--fana-accent-green);
}

.course-instructor {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-4);
}

.course-progress-info {
  margin-bottom: var(--fana-space-4);
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-2);
}

.progress-bar-container {
  width: 100%;
}

.progress-bar-bg {
  height: 6px;
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-full);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-full);
  transition: width var(--fana-transition-base);
}

.next-lesson {
  margin-bottom: var(--fana-space-4);
  padding: var(--fana-space-3);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
}

.next-lesson h4 {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
  margin-bottom: var(--fana-space-1);
}

.next-lesson p {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin: 0;
}

.course-actions {
  margin-bottom: var(--fana-space-4);
}

.btn-primary-modern,
.btn-secondary-modern {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
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

.course-meta {
  text-align: center;
}

.last-accessed {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}
</style>