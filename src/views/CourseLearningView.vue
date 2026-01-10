<template>
  <div class="course-learning-view">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <font-awesome-icon :icon="['fas', 'spinner']" spin />
      </div>
      <p>Loading course content...</p>
    </div>

    <!-- Course Learning Interface -->
    <div v-else-if="course" class="learning-interface">
      <!-- Course Header -->
      <header class="course-header">
        <div class="header-container">
          <div class="course-info">
            <router-link :to="`/courses/${course.id}`" class="back-link">
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
              Back to Course
            </router-link>
            <h1 class="course-title">{{ course.title }}</h1>
            <div class="progress-info">
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: `${courseProgress}%` }"
                ></div>
              </div>
              <span class="progress-text">{{ courseProgress }}% Complete</span>
            </div>
          </div>
          
          <div class="header-actions">
            <button class="btn-secondary-modern" @click="toggleSidebar">
              <font-awesome-icon :icon="['fas', 'list']" />
              Course Content
            </button>
            <button class="btn-primary-modern" @click="toggleNotes">
              <font-awesome-icon :icon="['fas', 'sticky-note']" />
              Notes
            </button>
          </div>
        </div>
      </header>

      <!-- Main Learning Content -->
      <div class="learning-content">
        <!-- Sidebar -->
        <aside class="course-sidebar" :class="{ collapsed: sidebarCollapsed }">
          <div class="sidebar-header">
            <h3>Course Content</h3>
            <button class="collapse-btn" @click="toggleSidebar">
              <font-awesome-icon :icon="['fas', sidebarCollapsed ? 'chevron-right' : 'chevron-left']" />
            </button>
          </div>
          
          <div class="curriculum-list">
            <div 
              v-for="(section, sectionIndex) in curriculum" 
              :key="section.id" 
              class="curriculum-section"
            >
              <div class="section-header" @click="toggleSection(sectionIndex)">
                <div class="section-info">
                  <font-awesome-icon 
                    :icon="['fas', expandedSections.includes(sectionIndex) ? 'chevron-down' : 'chevron-right']" 
                  />
                  <h4>{{ section.title }}</h4>
                </div>
                <div class="section-progress">
                  {{ getSectionProgress(section) }}%
                </div>
              </div>
              
              <div v-if="expandedSections.includes(sectionIndex)" class="section-lessons">
                <div 
                  v-for="lesson in section.lessons" 
                  :key="lesson.id"
                  class="lesson-item"
                  :class="{
                    active: currentLesson?.id === lesson.id,
                    completed: lesson.isCompleted,
                    locked: lesson.isLocked
                  }"
                  @click="selectLesson(lesson)"
                >
                  <div class="lesson-icon">
                    <font-awesome-icon 
                      v-if="lesson.isCompleted"
                      :icon="['fas', 'check-circle']"
                      class="completed-icon"
                    />
                    <font-awesome-icon 
                      v-else-if="lesson.isLocked"
                      :icon="['fas', 'lock']"
                      class="locked-icon"
                    />
                    <font-awesome-icon 
                      v-else-if="lesson.type === 'video'"
                      :icon="['fas', 'play-circle']"
                    />
                    <font-awesome-icon 
                      v-else-if="lesson.type === 'quiz'"
                      :icon="['fas', 'question-circle']"
                    />
                    <font-awesome-icon 
                      v-else-if="lesson.type === 'assignment'"
                      :icon="['fas', 'file-alt']"
                    />
                    <font-awesome-icon 
                      v-else
                      :icon="['fas', 'book-open']"
                    />
                  </div>
                  
                  <div class="lesson-details">
                    <h5>{{ lesson.title }}</h5>
                    <div class="lesson-meta">
                      <span class="lesson-type">{{ formatLessonType(lesson.type) }}</span>
                      <span v-if="lesson.duration" class="lesson-duration">
                        {{ formatDuration(lesson.duration) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <main class="lesson-content">
          <div v-if="currentLesson" class="lesson-container">
            <!-- Lesson Header -->
            <div class="lesson-header">
              <div class="lesson-info">
                <div class="lesson-type-badge" :class="currentLesson.type">
                  <font-awesome-icon :icon="getLessonIcon(currentLesson.type)" />
                  {{ formatLessonType(currentLesson.type) }}
                </div>
                <h2>{{ currentLesson.title }}</h2>
                <p v-if="currentLesson.description">{{ currentLesson.description }}</p>
              </div>
              
              <div class="lesson-actions">
                <button 
                  v-if="!currentLesson.isCompleted"
                  class="btn-success-modern"
                  @click="markAsComplete"
                >
                  <font-awesome-icon :icon="['fas', 'check']" />
                  Mark Complete
                </button>
                <button class="btn-secondary-modern" @click="toggleBookmark">
                  <font-awesome-icon :icon="currentLesson.isBookmarked ? ['fas', 'bookmark'] : ['far', 'bookmark']" />
                  {{ currentLesson.isBookmarked ? 'Bookmarked' : 'Bookmark' }}
                </button>
              </div>
            </div>

            <!-- Lesson Content -->
            <div class="lesson-body">
              <!-- Video Lesson -->
              <div v-if="currentLesson.type === 'video'" class="video-lesson">
                <div class="video-player">
                  <video 
                    v-if="currentLesson.videoUrl"
                    :src="currentLesson.videoUrl" 
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
                
                <div v-if="currentLesson.transcript" class="video-transcript">
                  <h4>Transcript</h4>
                  <div class="transcript-content">
                    {{ currentLesson.transcript }}
                  </div>
                </div>
              </div>

              <!-- Quiz Lesson -->
              <div v-else-if="currentLesson.type === 'quiz'" class="quiz-lesson">
                <QuizComponent 
                  :quiz="currentLesson.quiz"
                  @complete="onQuizComplete"
                />
              </div>

              <!-- Assignment Lesson -->
              <div v-else-if="currentLesson.type === 'assignment'" class="assignment-lesson">
                <AssignmentComponent 
                  :assignment="currentLesson.assignment"
                  @submit="onAssignmentSubmit"
                />
              </div>

              <!-- Reading Lesson -->
              <div v-else class="reading-lesson">
                <div class="reading-content" v-html="currentLesson.content"></div>
              </div>
            </div>

            <!-- Lesson Resources -->
            <div v-if="currentLesson.resources && currentLesson.resources.length > 0" class="lesson-resources">
              <h4>Resources</h4>
              <div class="resources-grid">
                <a 
                  v-for="resource in currentLesson.resources" 
                  :key="resource.id"
                  :href="resource.url"
                  target="_blank"
                  class="resource-item"
                >
                  <font-awesome-icon :icon="getResourceIcon(resource.type)" />
                  <div class="resource-info">
                    <h5>{{ resource.title }}</h5>
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
          </div>

          <!-- No Lesson Selected -->
          <div v-else class="no-lesson-selected">
            <div class="empty-state">
              <font-awesome-icon :icon="['fas', 'play-circle']" />
              <h3>Select a lesson to start learning</h3>
              <p>Choose a lesson from the course content sidebar to begin your learning journey.</p>
            </div>
          </div>
        </main>

        <!-- Notes Panel -->
        <aside v-if="showNotes" class="notes-panel">
          <div class="notes-header">
            <h3>My Notes</h3>
            <button class="close-notes-btn" @click="toggleNotes">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
          
          <div class="notes-content">
            <textarea
              v-model="currentNotes"
              placeholder="Take notes while learning..."
              class="notes-textarea"
              @input="saveNotes"
            ></textarea>
          </div>
          
          <div class="notes-footer">
            <small>Notes are automatically saved</small>
          </div>
        </aside>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="error-container">
      <div class="error-icon">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      </div>
      <h2>Course not found</h2>
      <p>The course you're trying to access doesn't exist or you don't have permission to view it.</p>
      <router-link to="/my-courses" class="btn-primary-modern">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Back to My Courses
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoursesStore } from '@/store/modules/courses';
import QuizComponent from '@/components/Learning/QuizComponent.vue';
import AssignmentComponent from '@/components/Learning/AssignmentComponent.vue';

const route = useRoute();
const router = useRouter();
const coursesStore = useCoursesStore();

// Reactive state
const isLoading = ref(true);
const sidebarCollapsed = ref(false);
const showNotes = ref(false);
const expandedSections = ref<number[]>([0]);
const currentLesson = ref(null);
const currentNotes = ref('');

// Mock course data (in real app, this would come from the store)
const course = ref({
  id: route.params.id,
  title: 'Complete React Developer Course',
  progress: 75
});

// Mock curriculum data
const curriculum = ref([
  {
    id: '1',
    title: 'Getting Started',
    lessons: [
      {
        id: '1-1',
        title: 'Welcome to the Course',
        type: 'video',
        duration: 0.5,
        isCompleted: true,
        isLocked: false,
        videoUrl: '/api/placeholder/video',
        transcript: 'Welcome to this comprehensive course...'
      },
      {
        id: '1-2',
        title: 'Course Overview',
        type: 'video',
        duration: 1.0,
        isCompleted: true,
        isLocked: false
      }
    ]
  },
  {
    id: '2',
    title: 'Core Concepts',
    lessons: [
      {
        id: '2-1',
        title: 'Understanding the Basics',
        type: 'video',
        duration: 2.0,
        isCompleted: false,
        isLocked: false,
        isCurrent: true
      },
      {
        id: '2-2',
        title: 'Knowledge Check',
        type: 'quiz',
        duration: 0.5,
        isCompleted: false,
        isLocked: false,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is React?',
              options: ['Library', 'Framework', 'Language', 'Tool'],
              correct: 0
            }
          ]
        }
      }
    ]
  }
]);

// Computed properties
const courseProgress = computed(() => {
  const totalLessons = curriculum.value.reduce((total, section) => total + section.lessons.length, 0);
  const completedLessons = curriculum.value.reduce((total, section) => 
    total + section.lessons.filter(lesson => lesson.isCompleted).length, 0
  );
  return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
});

const allLessons = computed(() => {
  return curriculum.value.flatMap(section => section.lessons);
});

const currentLessonIndex = computed(() => {
  return allLessons.value.findIndex(lesson => lesson.id === currentLesson.value?.id);
});

const previousLesson = computed(() => {
  const index = currentLessonIndex.value;
  return index > 0 ? allLessons.value[index - 1] : null;
});

const nextLesson = computed(() => {
  const index = currentLessonIndex.value;
  return index < allLessons.value.length - 1 ? allLessons.value[index + 1] : null;
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

const formatDuration = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours.toFixed(1)}h`;
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

const getSectionProgress = (section: any): number => {
  const completed = section.lessons.filter((lesson: any) => lesson.isCompleted).length;
  return Math.round((completed / section.lessons.length) * 100);
};

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
};

const toggleNotes = () => {
  showNotes.value = !showNotes.value;
};

const toggleSection = (index: number) => {
  const sectionIndex = expandedSections.value.indexOf(index);
  if (sectionIndex > -1) {
    expandedSections.value.splice(sectionIndex, 1);
  } else {
    expandedSections.value.push(index);
  }
};

const selectLesson = (lesson: any) => {
  if (!lesson.isLocked) {
    currentLesson.value = lesson;
    router.push(`/courses/${course.value.id}/learn/${lesson.id}`);
  }
};

const markAsComplete = () => {
  if (currentLesson.value) {
    currentLesson.value.isCompleted = true;
    // In real app, save to backend
  }
};

const toggleBookmark = () => {
  if (currentLesson.value) {
    currentLesson.value.isBookmarked = !currentLesson.value.isBookmarked;
  }
};

const goToPreviousLesson = () => {
  if (previousLesson.value) {
    selectLesson(previousLesson.value);
  }
};

const goToNextLesson = () => {
  if (nextLesson.value) {
    selectLesson(nextLesson.value);
  }
};

const updateProgress = (event: Event) => {
  // Track video progress
  const video = event.target as HTMLVideoElement;
  const progress = (video.currentTime / video.duration) * 100;
  // Save progress to backend
};

const onVideoEnded = () => {
  // Auto-mark video as complete when finished
  markAsComplete();
};

const onQuizComplete = (results: any) => {
  // Handle quiz completion
  markAsComplete();
};

const onAssignmentSubmit = (submission: any) => {
  // Handle assignment submission
  markAsComplete();
};

const saveNotes = () => {
  // Auto-save notes
  localStorage.setItem(`notes-${currentLesson.value?.id}`, currentNotes.value);
};

// Lifecycle
onMounted(async () => {
  isLoading.value = true;
  
  try {
    // Load course data
    await coursesStore.fetchCourseById(route.params.id as string);
    
    // Set initial lesson if specified in route
    const lessonId = route.params.lessonId;
    if (lessonId) {
      const lesson = allLessons.value.find(l => l.id === lessonId);
      if (lesson) {
        currentLesson.value = lesson;
      }
    } else {
      // Find first incomplete lesson or first lesson
      const firstIncomplete = allLessons.value.find(l => !l.isCompleted && !l.isLocked);
      currentLesson.value = firstIncomplete || allLessons.value[0];
    }
  } catch (error) {
    console.error('Failed to load course:', error);
  } finally {
    isLoading.value = false;
  }
});

// Watch for lesson changes to load notes
watch(currentLesson, (newLesson) => {
  if (newLesson) {
    const savedNotes = localStorage.getItem(`notes-${newLesson.id}`);
    currentNotes.value = savedNotes || '';
  }
});
</script>

<style scoped>
.course-learning-view {
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

/* Course Header */
.course-header {
  background: var(--fana-bg-card);
  border-bottom: 1px solid var(--fana-border-color);
  padding: var(--fana-space-4) 0;
  position: sticky;
  top: 0;
  z-index: var(--fana-z-sticky);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: var(--fana-text-secondary);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  margin-bottom: var(--fana-space-2);
  transition: color var(--fana-transition-base);
}

.back-link:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

.course-title {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-3);
  color: var(--fana-text-primary);
}

.progress-info {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
}

.progress-bar {
  width: 200px;
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

.progress-text {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-secondary);
}

.header-actions {
  display: flex;
  gap: var(--fana-space-3);
}

/* Learning Content */
.learning-content {
  display: grid;
  grid-template-columns: 350px 1fr auto;
  min-height: calc(100vh - 80px);
}

/* Sidebar */
.course-sidebar {
  background: var(--fana-bg-card);
  border-right: 1px solid var(--fana-border-color);
  transition: all var(--fana-transition-base);
  overflow-y: auto;
}

.course-sidebar.collapsed {
  width: 0;
  min-width: 0;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-4) var(--fana-space-6);
  border-bottom: 1px solid var(--fana-border-color);
}

.sidebar-header h3 {
  font-size: var(--fana-text-base);
  font-weight: 600;
  color: var(--fana-text-primary);
  margin: 0;
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--fana-text-secondary);
  cursor: pointer;
  padding: var(--fana-space-2);
  border-radius: var(--fana-radius-md);
  transition: all var(--fana-transition-base);
}

.collapse-btn:hover {
  background: var(--fana-bg-secondary);
  color: var(--fana-primary);
}

.curriculum-list {
  padding: var(--fana-space-4);
}

.curriculum-section {
  margin-bottom: var(--fana-space-4);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-3);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.section-header:hover {
  background: var(--fana-bg-tertiary);
}

.section-info {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.section-info h4 {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
  margin: 0;
}

.section-progress {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.section-lessons {
  margin-top: var(--fana-space-2);
  padding-left: var(--fana-space-4);
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-3);
  border-radius: var(--fana-radius-md);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  margin-bottom: var(--fana-space-1);
}

.lesson-item:hover {
  background: var(--fana-bg-secondary);
}

.lesson-item.active {
  background: rgba(99, 102, 241, 0.1);
  border-left: 3px solid var(--fana-primary);
}

.lesson-item.completed {
  opacity: 0.8;
}

.lesson-item.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.lesson-icon {
  width: 20px;
  display: flex;
  justify-content: center;
}

.lesson-icon .completed-icon {
  color: var(--fana-accent-green);
}

.lesson-icon .locked-icon {
  color: var(--fana-text-muted);
}

.lesson-details h5 {
  font-size: var(--fana-text-sm);
  font-weight: 500;
  margin-bottom: var(--fana-space-1);
  color: var(--fana-text-primary);
}

.lesson-meta {
  display: flex;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

/* Main Content */
.lesson-content {
  flex: 1;
  overflow-y: auto;
}

.lesson-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--fana-space-8);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--fana-space-8);
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

.lesson-header h2 {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.lesson-actions {
  display: flex;
  gap: var(--fana-space-3);
}

.lesson-body {
  margin-bottom: var(--fana-space-8);
}

.video-player {
  margin-bottom: var(--fana-space-6);
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
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-6);
}

.video-transcript h4 {
  font-size: var(--fana-text-base);
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.transcript-content {
  color: var(--fana-text-secondary);
  line-height: 1.7;
}

.reading-content {
  color: var(--fana-text-secondary);
  line-height: 1.7;
}

.lesson-resources {
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
}

.lesson-resources h4 {
  font-size: var(--fana-text-base);
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
  padding: var(--fana-space-3);
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-md);
  text-decoration: none;
  color: var(--fana-text-primary);
  transition: all var(--fana-transition-base);
}

.resource-item:hover {
  background: var(--fana-bg-tertiary);
  text-decoration: none;
  color: var(--fana-text-primary);
}

.resource-info {
  flex: 1;
}

.resource-info h5 {
  font-size: var(--fana-text-sm);
  font-weight: 500;
  margin-bottom: var(--fana-space-1);
}

.resource-size {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.lesson-navigation {
  display: flex;
  justify-content: space-between;
  gap: var(--fana-space-4);
}

.no-lesson-selected {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: var(--fana-space-8);
}

.empty-state {
  text-align: center;
  max-width: 400px;
}

.empty-state svg {
  font-size: 4rem;
  color: var(--fana-text-muted);
  margin-bottom: var(--fana-space-4);
}

.empty-state h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-3);
  color: var(--fana-text-primary);
}

/* Notes Panel */
.notes-panel {
  width: 300px;
  background: var(--fana-bg-card);
  border-left: 1px solid var(--fana-border-color);
  display: flex;
  flex-direction: column;
}

.notes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-4) var(--fana-space-6);
  border-bottom: 1px solid var(--fana-border-color);
}

.notes-header h3 {
  font-size: var(--fana-text-base);
  font-weight: 600;
  color: var(--fana-text-primary);
  margin: 0;
}

.close-notes-btn {
  background: none;
  border: none;
  color: var(--fana-text-secondary);
  cursor: pointer;
  padding: var(--fana-space-2);
  border-radius: var(--fana-radius-md);
  transition: all var(--fana-transition-base);
}

.close-notes-btn:hover {
  background: var(--fana-bg-secondary);
  color: var(--fana-primary);
}

.notes-content {
  flex: 1;
  padding: var(--fana-space-4);
}

.notes-textarea {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--fana-text-primary);
  font-size: var(--fana-text-sm);
  line-height: 1.6;
  resize: none;
  outline: none;
}

.notes-footer {
  padding: var(--fana-space-4);
  border-top: 1px solid var(--fana-border-color);
  text-align: center;
}

.notes-footer small {
  color: var(--fana-text-muted);
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
@media (max-width: 1200px) {
  .learning-content {
    grid-template-columns: 300px 1fr;
  }
  
  .notes-panel {
    position: fixed;
    top: 80px;
    right: 0;
    height: calc(100vh - 80px);
    z-index: var(--fana-z-modal);
    box-shadow: var(--fana-shadow-lg);
  }
}

@media (max-width: 768px) {
  .learning-content {
    grid-template-columns: 1fr;
  }
  
  .course-sidebar {
    position: fixed;
    top: 80px;
    left: 0;
    height: calc(100vh - 80px);
    z-index: var(--fana-z-modal);
    box-shadow: var(--fana-shadow-lg);
  }
  
  .course-sidebar.collapsed {
    transform: translateX(-100%);
  }
  
  .lesson-container {
    padding: var(--fana-space-4);
  }
  
  .lesson-header {
    flex-direction: column;
    gap: var(--fana-space-4);
  }
  
  .lesson-navigation {
    flex-direction: column;
  }
}
</style>