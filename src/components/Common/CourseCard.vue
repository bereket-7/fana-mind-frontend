<template>
  <div class="course-card" :class="{ 'list-view': viewMode === 'list', 'featured': featured }">
    <div class="course-image-container">
      <img 
        :src="course.thumbnail || '/api/placeholder/400/250'" 
        :alt="course.title"
        class="course-image"
        loading="lazy"
      />
      <div class="course-overlay">
        <button class="favorite-btn" :class="{ active: isFavorited }" @click="toggleFavorite">
          <font-awesome-icon :icon="isFavorited ? ['fas', 'heart'] : ['far', 'heart']" />
        </button>
        <div class="course-badges">
          <span v-if="course.price === 0" class="badge free">Free</span>
          <span v-if="course.isNew" class="badge new">New</span>
          <span v-if="course.isBestseller" class="badge bestseller">Bestseller</span>
          <span v-if="featured" class="badge featured">Featured</span>
        </div>
      </div>
      <div class="course-duration">
        <font-awesome-icon :icon="['fas', 'clock']" />
        {{ formatDuration(course.duration) }}
      </div>
    </div>

    <div class="course-content">
      <div class="course-header">
        <div class="course-category">
          <font-awesome-icon :icon="getCategoryIcon(course.category)" />
          {{ formatCategory(course.category) }}
        </div>
        <div class="course-difficulty" :class="course.difficulty">
          {{ course.difficulty }}
        </div>
      </div>

      <h3 class="course-title">
        <router-link :to="`/courses/${course.id}`" class="course-link">
          {{ course.title }}
        </router-link>
      </h3>

      <p class="course-description">
        {{ truncateText(course.description, viewMode === 'list' ? 200 : 120) }}
      </p>

      <div class="course-instructor">
        <img 
          :src="course.instructor.avatar || '/api/placeholder/40/40'" 
          :alt="course.instructor.name"
          class="instructor-avatar"
        />
        <div class="instructor-info">
          <span class="instructor-name">{{ course.instructor.name }}</span>
          <span class="instructor-title">{{ course.instructor.title }}</span>
        </div>
      </div>

      <div class="course-stats">
        <div class="stat-item">
          <font-awesome-icon :icon="['fas', 'users']" />
          <span>{{ formatNumber(course.enrollmentCount) }} students</span>
        </div>
        <div class="stat-item">
          <font-awesome-icon :icon="['fas', 'star']" />
          <span>{{ course.rating.toFixed(1) }} ({{ formatNumber(course.reviewCount) }})</span>
        </div>
        <div class="stat-item">
          <font-awesome-icon :icon="['fas', 'play-circle']" />
          <span>{{ course.lessonCount }} lessons</span>
        </div>
      </div>

      <div class="course-footer">
        <div class="course-price">
          <span v-if="course.price === 0" class="price free">Free</span>
          <div v-else class="price-container">
            <span v-if="course.originalPrice && course.originalPrice > course.price" class="original-price">
              ${{ course.originalPrice }}
            </span>
            <span class="current-price">${{ course.price }}</span>
          </div>
        </div>

        <div class="course-actions">
          <button 
            v-if="isEnrolled"
            class="btn-secondary-modern"
            @click="continueLearning"
          >
            <font-awesome-icon :icon="['fas', 'play']" />
            Continue
          </button>
          <button 
            v-else
            class="btn-primary-modern"
            @click="enrollInCourse"
            :disabled="isEnrolling"
          >
            <font-awesome-icon :icon="isEnrolling ? ['fas', 'spinner'] : ['fas', 'plus']" />
            {{ isEnrolling ? 'Enrolling...' : 'Enroll Now' }}
          </button>
        </div>
      </div>

      <!-- Progress bar for enrolled courses -->
      <div v-if="isEnrolled && course.progress" class="course-progress">
        <div class="progress-info">
          <span class="progress-text">Progress: {{ course.progress.percentage }}%</span>
          <span class="progress-lessons">{{ course.progress.completedLessons }}/{{ course.lessonCount }} lessons</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${course.progress.percentage}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import type { Course } from '@/types/course';

interface Props {
  course: Course;
  viewMode?: 'grid' | 'list';
  featured?: boolean;
}

interface Emits {
  (e: 'enroll', courseId: string): void;
  (e: 'favorite', courseId: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  viewMode: 'grid',
  featured: false
});

const emit = defineEmits<Emits>();

const router = useRouter();
const authStore = useAuthStore();

// Reactive state
const isEnrolling = ref(false);
const isFavorited = ref(false); // This would come from user's favorites

// Computed properties
const isEnrolled = computed(() => {
  // Check if user is enrolled in this course
  return props.course.isEnrolled || false;
});

// Methods
const formatDuration = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 10) return `${hours.toFixed(1)}h`;
  return `${Math.round(hours)}h`;
};

const formatCategory = (category: string): string => {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const getCategoryIcon = (category: string): string[] => {
  const icons: Record<string, string[]> = {
    'programming': ['fas', 'code'],
    'design': ['fas', 'palette'],
    'business': ['fas', 'briefcase'],
    'data-science': ['fas', 'chart-bar'],
    'ai-ml': ['fas', 'brain'],
    'marketing': ['fas', 'bullhorn'],
    'default': ['fas', 'book']
  };
  return icons[category] || icons.default;
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  emit('favorite', props.course.id);
};

const enrollInCourse = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  isEnrolling.value = true;
  try {
    emit('enroll', props.course.id);
  } finally {
    isEnrolling.value = false;
  }
};

const continueLearning = () => {
  router.push(`/courses/${props.course.id}/learn`);
};
</script>

<style scoped>
.course-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
  transition: all var(--fana-transition-base);
  border: 1px solid var(--fana-border-color);
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--fana-shadow-2xl);
  border-color: var(--fana-primary);
}

.course-card.featured {
  border: 2px solid var(--fana-secondary);
  position: relative;
}

.course-card.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--fana-gradient-primary);
  z-index: 1;
}

.course-card.list-view {
  flex-direction: row;
  max-height: 200px;
}

.course-card.list-view .course-image-container {
  width: 300px;
  flex-shrink: 0;
}

.course-card.list-view .course-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Image Container */
.course-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--fana-transition-base);
}

.course-card:hover .course-image {
  transform: scale(1.05);
}

.course-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.3) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--fana-space-4);
}

.favorite-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: var(--fana-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  color: var(--fana-text-muted);
}

.favorite-btn:hover,
.favorite-btn.active {
  background: var(--fana-secondary);
  color: white;
  transform: scale(1.1);
}

.course-badges {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
}

.badge {
  padding: var(--fana-space-1) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.free {
  background: var(--fana-accent-green);
  color: white;
}

.badge.new {
  background: var(--fana-accent-blue);
  color: white;
}

.badge.bestseller {
  background: var(--fana-accent-orange);
  color: white;
}

.badge.featured {
  background: var(--fana-secondary);
  color: white;
}

.course-duration {
  position: absolute;
  bottom: var(--fana-space-4);
  right: var(--fana-space-4);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: var(--fana-space-2) var(--fana-space-3);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--fana-space-1);
}

/* Content */
.course-content {
  padding: var(--fana-space-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-4);
}

.course-category {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  color: var(--fana-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-difficulty {
  padding: var(--fana-space-1) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  text-transform: capitalize;
}

.course-difficulty.beginner {
  background: rgba(16, 185, 129, 0.1);
  color: var(--fana-accent-green);
}

.course-difficulty.intermediate {
  background: rgba(245, 158, 11, 0.1);
  color: var(--fana-accent-orange);
}

.course-difficulty.advanced {
  background: rgba(239, 68, 68, 0.1);
  color: var(--fana-accent-red);
}

.course-title {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  margin-bottom: var(--fana-space-3);
  line-height: 1.3;
}

.course-link {
  color: var(--fana-text-primary);
  text-decoration: none;
  transition: color var(--fana-transition-base);
}

.course-link:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

.course-description {
  color: var(--fana-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--fana-space-4);
  flex: 1;
}

.course-instructor {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  margin-bottom: var(--fana-space-4);
}

.instructor-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--fana-radius-full);
  object-fit: cover;
}

.instructor-info {
  display: flex;
  flex-direction: column;
}

.instructor-name {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
}

.instructor-title {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.course-stats {
  display: flex;
  gap: var(--fana-space-4);
  margin-bottom: var(--fana-space-6);
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-1);
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.course-price {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.price.free {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-accent-green);
}

.price-container {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.original-price {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-muted);
  text-decoration: line-through;
}

.current-price {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-primary);
}

.course-actions {
  display: flex;
  gap: var(--fana-space-2);
}

.btn-primary-modern,
.btn-secondary-modern {
  display: flex;
  align-items: center;
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

.btn-primary-modern:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

.btn-primary-modern:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary-modern {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
}

.btn-secondary-modern:hover {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

/* Progress */
.course-progress {
  margin-top: var(--fana-space-4);
  padding-top: var(--fana-space-4);
  border-top: 1px solid var(--fana-border-color);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-2);
}

.progress-text {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
}

.progress-lessons {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.progress-bar {
  height: 6px;
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-full);
  transition: width var(--fana-transition-base);
}

/* Responsive Design */
@media (max-width: 768px) {
  .course-card.list-view {
    flex-direction: column;
    max-height: none;
  }
  
  .course-card.list-view .course-image-container {
    width: 100%;
    height: 200px;
  }
  
  .course-stats {
    flex-direction: column;
    gap: var(--fana-space-2);
  }
  
  .course-footer {
    flex-direction: column;
    gap: var(--fana-space-4);
    align-items: stretch;
  }
}
</style>