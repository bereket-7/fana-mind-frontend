<template>
  <div class="created-course-card">
    <div class="course-image-container">
      <img :src="course.thumbnail" :alt="course.title" class="course-image" />
      <div class="course-status-badge" :class="course.status">
        {{ formatStatus(course.status) }}
      </div>
    </div>

    <div class="course-content">
      <h3 class="course-title">{{ course.title }}</h3>

      <div class="course-stats">
        <div class="stat-item">
          <font-awesome-icon :icon="['fas', 'users']" />
          <span>{{ formatNumber(course.enrollmentCount) }} students</span>
        </div>
        <div class="stat-item">
          <font-awesome-icon :icon="['fas', 'star']" />
          <span>{{ course.rating > 0 ? course.rating.toFixed(1) : 'No ratings' }}</span>
        </div>
        <div class="stat-item">
          <font-awesome-icon :icon="['fas', 'play-circle']" />
          <span>{{ course.totalLessons }} lessons</span>
        </div>
      </div>

      <div class="course-revenue" v-if="course.revenue > 0">
        <div class="revenue-item">
          <span class="revenue-label">Total Revenue:</span>
          <span class="revenue-amount">${{ formatNumber(course.revenue) }}</span>
        </div>
      </div>

      <div class="course-actions">
        <div class="primary-actions">
          <button class="btn-primary-small" @click="editCourse">
            <font-awesome-icon :icon="['fas', 'edit']" />
            Edit
          </button>
          <button class="btn-secondary-small" @click="viewAnalytics">
            <font-awesome-icon :icon="['fas', 'chart-bar']" />
            Analytics
          </button>
        </div>
        
        <div class="secondary-actions">
          <button 
            v-if="course.status === 'draft'"
            class="btn-success-small"
            @click="publishCourse"
          >
            <font-awesome-icon :icon="['fas', 'upload']" />
            Publish
          </button>
          <button 
            v-else-if="course.status === 'published'"
            class="btn-warning-small"
            @click="unpublishCourse"
          >
            <font-awesome-icon :icon="['fas', 'eye-slash']" />
            Unpublish
          </button>
          
          <div class="dropdown">
            <button class="btn-menu" @click="toggleDropdown">
              <font-awesome-icon :icon="['fas', 'ellipsis-v']" />
            </button>
            <div v-if="showDropdown" class="dropdown-menu">
              <button class="dropdown-item" @click="duplicateCourse">
                <font-awesome-icon :icon="['fas', 'copy']" />
                Duplicate
              </button>
              <button class="dropdown-item danger" @click="deleteCourse">
                <font-awesome-icon :icon="['fas', 'trash']" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="course-meta">
        <span class="last-updated">
          Last updated: {{ formatDate(course.lastUpdated) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface CreatedCourse {
  id: string;
  title: string;
  thumbnail: string;
  status: 'draft' | 'published' | 'pending';
  enrollmentCount: number;
  rating: number;
  revenue: number;
  lastUpdated: string;
  totalLessons: number;
}

interface Props {
  course: CreatedCourse;
}

interface Emits {
  (e: 'edit', courseId: string): void;
  (e: 'view-analytics', courseId: string): void;
  (e: 'publish', courseId: string): void;
  (e: 'unpublish', courseId: string): void;
  (e: 'delete', courseId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showDropdown = ref(false);

const formatStatus = (status: string): string => {
  switch (status) {
    case 'draft': return 'Draft';
    case 'published': return 'Published';
    case 'pending': return 'Pending Review';
    default: return status;
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const editCourse = () => {
  emit('edit', props.course.id);
};

const viewAnalytics = () => {
  emit('view-analytics', props.course.id);
};

const publishCourse = () => {
  emit('publish', props.course.id);
};

const unpublishCourse = () => {
  emit('unpublish', props.course.id);
};

const duplicateCourse = () => {
  // Implement duplicate functionality
  console.log('Duplicate course:', props.course.id);
};

const deleteCourse = () => {
  emit('delete', props.course.id);
};
</script>

<style scoped>
.created-course-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
  transition: all var(--fana-transition-base);
  border: 1px solid var(--fana-border-color);
}

.created-course-card:hover {
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

.course-status-badge {
  position: absolute;
  top: var(--fana-space-4);
  right: var(--fana-space-4);
  padding: var(--fana-space-2) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.course-status-badge.draft {
  background: rgba(156, 163, 175, 0.9);
  color: white;
}

.course-status-badge.published {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.course-status-badge.pending {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.course-content {
  padding: var(--fana-space-6);
}

.course-title {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin-bottom: var(--fana-space-4);
}

.course-stats {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
  margin-bottom: var(--fana-space-4);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.stat-item svg {
  color: var(--fana-primary);
  width: 14px;
}

.course-revenue {
  margin-bottom: var(--fana-space-4);
  padding: var(--fana-space-3);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
}

.revenue-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.revenue-label {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.revenue-amount {
  font-size: var(--fana-text-base);
  font-weight: 700;
  color: var(--fana-accent-green);
}

.course-actions {
  margin-bottom: var(--fana-space-4);
}

.primary-actions {
  display: flex;
  gap: var(--fana-space-2);
  margin-bottom: var(--fana-space-3);
}

.secondary-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary-small,
.btn-secondary-small,
.btn-success-small,
.btn-warning-small,
.btn-menu {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-3);
  border-radius: var(--fana-radius-md);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  border: none;
}

.btn-primary-small {
  background: var(--fana-primary);
  color: white;
  flex: 1;
}

.btn-secondary-small {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
  flex: 1;
}

.btn-success-small {
  background: var(--fana-accent-green);
  color: white;
}

.btn-warning-small {
  background: var(--fana-accent-orange);
  color: white;
}

.btn-menu {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-secondary);
  border: 1px solid var(--fana-border-color);
  width: 32px;
  height: 32px;
  justify-content: center;
}

.btn-primary-small:hover,
.btn-secondary-small:hover,
.btn-success-small:hover,
.btn-warning-small:hover,
.btn-menu:hover {
  transform: translateY(-1px);
  box-shadow: var(--fana-shadow-sm);
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  box-shadow: var(--fana-shadow-lg);
  padding: var(--fana-space-2);
  min-width: 150px;
  margin-top: var(--fana-space-1);
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-3);
  background: transparent;
  border: none;
  border-radius: var(--fana-radius-md);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-primary);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  text-align: left;
}

.dropdown-item:hover {
  background: var(--fana-bg-secondary);
}

.dropdown-item.danger {
  color: var(--fana-accent-red);
}

.dropdown-item.danger:hover {
  background: rgba(239, 68, 68, 0.1);
}

.course-meta {
  text-align: center;
}

.last-updated {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}
</style>