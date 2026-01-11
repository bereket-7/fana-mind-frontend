<template>
  <div class="lesson-view">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <font-awesome-icon :icon="['fas', 'spinner']" spin />
      </div>
      <p>Loading lesson...</p>
    </div>

    <!-- Lesson Content -->
    <div v-else-if="lesson" class="lesson-container">
      <!-- Lesson Header -->
      <header class="lesson-header">
        <div class="header-container">
          <div class="lesson-info">
            <router-link :to="`/courses/${courseId}/learn`" class="back-link">
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
              Back to Course
            </router-link>
            <div class="lesson-type-badge" :class="lesson.type">
              <font-awesome-icon :icon="getLessonIcon(lesson.type)" />
              {{ formatLessonType(lesson.type) }}
            </div>
            <h1 class="lesson-title">{{ lesson.title }}</h1>
            <p v-if="lesson.description" class="lesson-description">{{ lesson.description }}</p>
          </div>
          
          <div class="header-actions">
            <button 
              v-if="!lesson.isCompleted"
              class="btn-success-modern"
              @click="markAsComplete"
            >
              <font-awesome-icon :icon="['fas', 'check']" />
              Mark Complete
            </button>
            <button class="btn-secondary-modern" @click="toggleBookmark">
              <font-awesome-icon :icon="lesson.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
              {{ lesson.isBookmarked ? 'Bookmarked' : 'Bookmark' }}
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="lesson-content">
        <!-- Video Lesson -->
        <div v-if="lesson.type === 'video'" class="video-lesson">
          <div class="video-player">
            <video 
              v-if="lesson.videoUrl"
              :src="lesson.videoUrl" 
              controls 
              class="lesson-video"
              @timeupdate="updateProgress"
              @ended="onVideoEnded"
            >
              Your browser does not support the video tag.
            </video>
            <div v-else class="video-placeholder">
              <font-awesome-icon :icon="['fas', 'video']" />
              <p>Video content will be available here</p>
            </div>
          </div>
          
          <div v-if="lesson.transcript" class="video-transcript">
            <h3>Transcript</h3>
            <div class="transcript-content">
              {{ lesson.transcript }}
            </div>
          </div>
        </div>

        <!-- Quiz Lesson -->
        <div v-else-if="lesson.type === 'quiz'" class="quiz-lesson">
          <QuizComponent 
            :quiz="lesson.quiz"
            @complete="onQuizComplete"
          />
        </div>

        <!-- Assignment Lesson -->
        <div v-else-if="lesson.type === 'assignment'" class="assignment-lesson">
          <AssignmentComponent 
            :assignment="lesson.assignment"
            @submit="onAssignmentSubmit"
          />
        </div>

        <!-- Reading Lesson -->
        <div v-else class="reading-lesson">
          <div class="reading-content" v-html="lesson.content"></div>
        </div>

        <!-- Lesson Resources -->
        <div v-if="lesson.resources && lesson.resources.length > 0" class="lesson-resources">
          <h3>Resources</h3>
          <div class="resources-grid">
            <a 
              v-for="resource in lesson.resources" 
              :key="resource.id"
              :href="resource.url"
              target="_blank"
              class="resource-item"
            >
              <font-awesome-icon :icon="getResourceIcon(resource.type)" />
              <div class="resource-info">
                <h4>{{ resource.title }}</h4>
                <span class="resource-size">{{ resource.size }}</span>
              </div>
              <font-awesome-icon :icon="['fas', 'external-link-alt']" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="lesson-navigation">
          <button 
            v-if="previousLesson"
            class="btn-secondary-modern"
            @click="goToPreviousLesson"
          >
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
            Previous: {{ previousLesson.title }}
          </button>
          
          <button 
            v-if="nextLesson"
            class="btn-primary-modern"
            @click="goToNextLesson"
          >
            Next: {{ nextLesson.title }}
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </button>
        </div>
      </main>
    </div>

    <!-- Error State -->
    <div v-else class="error-container">
      <div class="error-icon">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      </div>
      <h2>Lesson not found</h2>
      <p>The lesson you're trying to access doesn't exist or you don't have permission to view it.</p>
      <router-link :to="`/courses/${courseId}/learn`" class="btn-primary-modern">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Back to Course
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoursesStore } from '@/store/modules/courses';
import QuizComponent from '@/components/Learning/QuizComponent.vue';
import AssignmentComponent from '@/components/Learning/AssignmentComponent.vue';

const route = useRoute();
const router = useRouter();
const coursesStore = useCoursesStore();

// Reactive state
const isLoading = ref(true);
const lesson = ref(null);
const course = ref(null);

// Route params
const courseId = computed(() => route.params.courseId as string);
const lessonId = computed(() => route.params.lessonId as string);

// Mock lesson data (in real app, this would come from the store)
const mockLesson = {
  id: lessonId.value,
  title: 'Understanding React Components',
  description: 'Learn the fundamentals of React components and how to create reusable UI elements.',
  type: 'video',
  duration: 2.5,
  isCompleted: false,
  isBookmarked: false,
  videoUrl: '/api/placeholder/video',
  transcript: 'In this lesson, we will explore React components...',
  content: '<h2>React Components</h2><p>Components are the building blocks of React applications...</p>',
  resources: [
    {
      id: '1',
      title: 'React Documentation',
      type: 'document',
      url: 'https://reactjs.org/docs',
      size: '2.5 MB'
    },
    {
      id: '2',
      title: 'Component Examples',
      type: 'zip',
      url: '/downloads/examples.zip',
      size: '1.2 MB'
    }
  ]
};

// Mock navigation data
const previousLesson = ref({
  id: 'prev-1',
  title: 'Introduction to React'
});

const nextLesson = ref({
  id: 'next-1',
  title: 'Props and State'
});

// Methods
const formatLessonType = (type: string): string => {
  const types = {
    video: 'Video',
    quiz: 'Quiz',
    assignment: 'Assignment',
    reading: 'Reading'
  };
  return types[type] || 'Lesson';
};

const getLessonIcon = (type: string): string[] => {
  const icons = {
    video: ['fas', 'play-circle'],
    quiz: ['fas', 'question-circle'],
    assignment: ['fas', 'file-alt'],
    reading: ['fas', 'book-open']
  };
  return icons[type] || ['fas', 'book-open'];
};

const getResourceIcon = (type: string): string[] => {
  const icons = {
    pdf: ['fas', 'file-pdf'],
    document: ['fas', 'file-alt'],
    zip: ['fas', 'file-archive'],
    video: ['fas', 'file-video']
  };
  return icons[type] || ['fas', 'file'];
};

const markAsComplete = () => {
  if (lesson.value) {
    lesson.value.isCompleted = true;
    // In real app, save to backend
    console.log('Lesson marked as complete');
  }
};

const toggleBookmark = () => {
  if (lesson.value) {
    lesson.value.isBookmarked = !lesson.value.isBookmarked;
    // In real app, save to backend
    console.log('Bookmark toggled');
  }
};

const goToPreviousLesson = () => {
  if (previousLesson.value) {
    router.push(`/courses/${courseId.value}/learn/${previousLesson.value.id}`);
  }
};

const goToNextLesson = () => {
  if (nextLesson.value) {
    router.push(`/courses/${courseId.value}/learn/${nextLesson.value.id}`);
  }
};

const updateProgress = (event: Event) => {
  // Track video progress
  const video = event.target as HTMLVideoElement;
  const progress = (video.currentTime / video.duration) * 100;
  // Save progress to backend
  console.log('Video progress:', progress);
};

const onVideoEnded = () => {
  // Auto-mark video as complete when finished
  markAsComplete();
};

const onQuizComplete = (results: any) => {
  // Handle quiz completion
  console.log('Quiz completed:', results);
  markAsComplete();
};

const onAssignmentSubmit = (submission: any) => {
  // Handle assignment submission
  console.log('Assignment submitted:', submission);
  markAsComplete();
};

// Lifecycle
onMounted(async () => {
  isLoading.value = true;
  
  try {
    // In real app, fetch lesson data from API
    // await coursesStore.fetchLessonById(courseId.value, lessonId.value);
    
    // For now, use mock data
    lesson.value = mockLesson;
  } catch (error) {
    console.error('Failed to load lesson:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.lesson-view {
  min-height: 100vh;
  background: var(--fana-bg-primary);
}

/* Loading and Error States */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: var(--fana-space-8);
}

.loading-spinner {
  font-size: 3rem;
  color: var(--fana-primary);
  margin-bottom: var(--fana-space-4);
}

.error-icon {
  font-size: 4rem;
  color: var(--fana-accent-red);
  margin-bottom: var(--fana-space-4);
}

/* Lesson Header */
.lesson-header {
  background: var(--fana-bg-card);
  border-bottom: 1px solid var(--fana-border-color);
  padding: var(--fana-space-6) 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: var(--fana-text-secondary);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  margin-bottom: var(--fana-space-3);
  transition: color var(--fana-transition-base);
}

.back-link:hover {
  color: var(--fana-primary);
  text-decoration: none;
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
  background: rgba(16, 185, 129, 0.1);
  color: var(--fana-accent-green);
}

.lesson-type-badge.reading {
  background: rgba(139, 92, 246, 0.1);
  color: var(--fana-accent-purple);
}

.lesson-title {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.lesson-description {
  color: var(--fana-text-secondary);
  line-height: 1.6;
}

.header-actions {
  display: flex;
  gap: var(--fana-space-3);
}

/* Main Content */
.lesson-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--fana-space-8) var(--fana-space-6);
}

.video-player {
  margin-bottom: var(--fana-space-8);
}

.lesson-video {
  width: 100%;
  height: 500px;
  border-radius: var(--fana-radius-lg);
}

.video-placeholder {
  height: 500px;
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--fana-text-muted);
}

.video-placeholder svg {
  font-size: 3rem;
  margin-bottom: var(--fana-space-3);
}

.video-transcript {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
}

.video-transcript h3 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.transcript-content {
  color: var(--fana-text-secondary);
  line-height: 1.7;
}

.reading-content {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-8);
  margin-bottom: var(--fana-space-8);
  color: var(--fana-text-secondary);
  line-height: 1.7;
}

.lesson-resources {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
}

.lesson-resources h3 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.resources-grid {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
}

.resource-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-4);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-md);
  text-decoration: none;
  color: var(--fana-text-primary);
  transition: all var(--fana-transition-base);
}

.resource-item:hover {
  background: var(--fana-bg-tertiary);
  text-decoration: none;
  color: var(--fana-text-primary);
  transform: translateY(-2px);
}

.resource-info {
  flex: 1;
}

.resource-info h4 {
  font-size: var(--fana-text-base);
  font-weight: 500;
  margin-bottom: var(--fana-space-1);
}

.resource-size {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-muted);
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  gap: var(--fana-space-4);
  margin-top: var(--fana-space-8);
}

/* Button Styles */
.btn-primary-modern,
.btn-secondary-modern,
.btn-success-modern {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  border: none;
  text-decoration: none;
}

.btn-primary-modern {
  background: var(--fana-gradient-primary);
  color: white;
}

.btn-secondary-modern {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
}

.btn-success-modern {
  background: var(--fana-accent-green);
  color: white;
}

.btn-primary-modern:hover,
.btn-secondary-modern:hover,
.btn-success-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-sm);
  text-decoration: none;
  color: inherit;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: var(--fana-space-4);
  }
  
  .lesson-content {
    padding: var(--fana-space-4);
  }
  
  .lesson-navigation {
    flex-direction: column;
  }
  
  .lesson-video {
    height: 300px;
  }
}
</style>