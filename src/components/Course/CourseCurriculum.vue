<template>
  <div class="course-curriculum">
    <div class="curriculum-header">
      <h3>Course Curriculum</h3>
      <div class="curriculum-stats">
        <span>{{ totalSections }} sections</span>
        <span>•</span>
        <span>{{ totalLessons }} lessons</span>
        <span>•</span>
        <span>{{ formatDuration(totalDuration) }} total length</span>
      </div>
    </div>

    <div class="curriculum-content">
      <div v-for="(section, sectionIndex) in curriculum" :key="section.id" class="curriculum-section">
        <div class="section-header" @click="toggleSection(sectionIndex)">
          <div class="section-info">
            <button class="section-toggle">
              <font-awesome-icon 
                :icon="['fas', expandedSections.includes(sectionIndex) ? 'chevron-down' : 'chevron-right']" 
              />
            </button>
            <h4 class="section-title">{{ section.title }}</h4>
          </div>
          <div class="section-meta">
            <span class="lesson-count">{{ section.lessons.length }} lessons</span>
            <span class="section-duration">{{ formatDuration(section.duration) }}</span>
          </div>
        </div>

        <div v-if="expandedSections.includes(sectionIndex)" class="section-content">
          <div class="section-description" v-if="section.description">
            <p>{{ section.description }}</p>
          </div>
          
          <div class="lessons-list">
            <div 
              v-for="(lesson, lessonIndex) in section.lessons" 
              :key="lesson.id"
              class="lesson-item"
              :class="{
                'completed': lesson.isCompleted,
                'current': lesson.isCurrent,
                'locked': lesson.isLocked && !isEnrolled
              }"
            >
              <div class="lesson-info">
                <div class="lesson-icon">
                  <font-awesome-icon 
                    v-if="lesson.isCompleted"
                    :icon="['fas', 'check-circle']"
                    class="completed-icon"
                  />
                  <font-awesome-icon 
                    v-else-if="lesson.isLocked && !isEnrolled"
                    :icon="['fas', 'lock']"
                    class="locked-icon"
                  />
                  <font-awesome-icon 
                    v-else-if="lesson.type === 'video'"
                    :icon="['fas', 'play-circle']"
                    class="lesson-type-icon"
                  />
                  <font-awesome-icon 
                    v-else-if="lesson.type === 'quiz'"
                    :icon="['fas', 'question-circle']"
                    class="lesson-type-icon"
                  />
                  <font-awesome-icon 
                    v-else-if="lesson.type === 'assignment'"
                    :icon="['fas', 'file-alt']"
                    class="lesson-type-icon"
                  />
                  <font-awesome-icon 
                    v-else
                    :icon="['fas', 'book-open']"
                    class="lesson-type-icon"
                  />
                </div>
                
                <div class="lesson-details">
                  <h5 class="lesson-title">
                    <button 
                      v-if="isEnrolled && !lesson.isLocked"
                      class="lesson-link"
                      @click="openLesson(lesson)"
                    >
                      {{ lesson.title }}
                    </button>
                    <span v-else class="lesson-text">{{ lesson.title }}</span>
                  </h5>
                  
                  <div class="lesson-meta">
                    <span class="lesson-type">{{ formatLessonType(lesson.type) }}</span>
                    <span v-if="lesson.duration" class="lesson-duration">
                      {{ formatDuration(lesson.duration) }}
                    </span>
                    <span v-if="lesson.isPreview" class="preview-badge">Preview</span>
                  </div>
                </div>
              </div>

              <div class="lesson-actions">
                <button 
                  v-if="lesson.isPreview || (isEnrolled && !lesson.isLocked)"
                  class="preview-btn"
                  @click="previewLesson(lesson)"
                >
                  <font-awesome-icon :icon="['fas', 'eye']" />
                  {{ lesson.isPreview ? 'Preview' : 'View' }}
                </button>
                
                <div v-if="lesson.resources && lesson.resources.length > 0" class="lesson-resources">
                  <button class="resources-btn" @click="toggleResources(lesson.id)">
                    <font-awesome-icon :icon="['fas', 'paperclip']" />
                    {{ lesson.resources.length }}
                  </button>
                  
                  <div v-if="expandedResources.includes(lesson.id)" class="resources-dropdown">
                    <div 
                      v-for="resource in lesson.resources" 
                      :key="resource.id"
                      class="resource-item"
                    >
                      <font-awesome-icon :icon="getResourceIcon(resource.type)" />
                      <a :href="resource.url" target="_blank" class="resource-link">
                        {{ resource.title }}
                      </a>
                      <span class="resource-size">{{ resource.size }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lesson Preview Modal -->
    <LessonPreviewModal 
      v-if="previewLesson"
      :lesson="selectedLesson"
      @close="closePreview"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Course, Lesson, CourseSection } from '@/types/course';
import LessonPreviewModal from './LessonPreviewModal.vue';

interface Props {
  course: Course;
  isEnrolled: boolean;
}

const props = defineProps<Props>();
const router = useRouter();

// Reactive state
const expandedSections = ref<number[]>([0]); // First section expanded by default
const expandedResources = ref<string[]>([]);
const showPreview = ref(false);
const selectedLesson = ref<Lesson | null>(null);

// Mock curriculum data (in real app, this would come from the course prop)
const curriculum = ref<CourseSection[]>([
  {
    id: '1',
    title: 'Getting Started',
    description: 'Introduction to the course and setting up your development environment.',
    duration: 2.5,
    lessons: [
      {
        id: '1-1',
        title: 'Welcome to the Course',
        type: 'video',
        duration: 0.5,
        isPreview: true,
        isCompleted: false,
        isLocked: false,
        isCurrent: false,
        resources: [
          { id: 'r1', title: 'Course Syllabus', type: 'pdf', url: '#', size: '2.1 MB' },
          { id: 'r2', title: 'Setup Guide', type: 'document', url: '#', size: '1.5 MB' }
        ]
      },
      {
        id: '1-2',
        title: 'Course Overview and Learning Path',
        type: 'video',
        duration: 1.0,
        isPreview: true,
        isCompleted: false,
        isLocked: false,
        isCurrent: false
      },
      {
        id: '1-3',
        title: 'Setting Up Your Environment',
        type: 'video',
        duration: 1.0,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false,
        resources: [
          { id: 'r3', title: 'Installation Files', type: 'zip', url: '#', size: '15.2 MB' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Core Concepts',
    description: 'Learn the fundamental concepts and principles.',
    duration: 8.5,
    lessons: [
      {
        id: '2-1',
        title: 'Understanding the Basics',
        type: 'video',
        duration: 2.0,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      },
      {
        id: '2-2',
        title: 'Advanced Techniques',
        type: 'video',
        duration: 3.0,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      },
      {
        id: '2-3',
        title: 'Knowledge Check Quiz',
        type: 'quiz',
        duration: 0.5,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      },
      {
        id: '2-4',
        title: 'Practical Assignment',
        type: 'assignment',
        duration: 3.0,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false,
        resources: [
          { id: 'r4', title: 'Assignment Brief', type: 'pdf', url: '#', size: '800 KB' },
          { id: 'r5', title: 'Starter Code', type: 'zip', url: '#', size: '5.2 MB' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Advanced Topics',
    description: 'Dive deeper into advanced concepts and real-world applications.',
    duration: 12.0,
    lessons: [
      {
        id: '3-1',
        title: 'Advanced Patterns',
        type: 'video',
        duration: 4.0,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      },
      {
        id: '3-2',
        title: 'Best Practices',
        type: 'video',
        duration: 3.5,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      },
      {
        id: '3-3',
        title: 'Case Study Analysis',
        type: 'reading',
        duration: 2.0,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      },
      {
        id: '3-4',
        title: 'Final Project',
        type: 'assignment',
        duration: 2.5,
        isPreview: false,
        isCompleted: false,
        isLocked: !props.isEnrolled,
        isCurrent: false
      }
    ]
  }
]);

// Computed properties
const totalSections = computed(() => curriculum.value.length);
const totalLessons = computed(() => 
  curriculum.value.reduce((total, section) => total + section.lessons.length, 0)
);
const totalDuration = computed(() => 
  curriculum.value.reduce((total, section) => total + section.duration, 0)
);

// Methods
const formatDuration = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours.toFixed(1)}h`;
};

const formatLessonType = (type: string): string => {
  const types: Record<string, string> = {
    video: 'Video',
    quiz: 'Quiz',
    assignment: 'Assignment',
    reading: 'Reading',
    exercise: 'Exercise'
  };
  return types[type] || 'Lesson';
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

const toggleSection = (index: number) => {
  const sectionIndex = expandedSections.value.indexOf(index);
  if (sectionIndex > -1) {
    expandedSections.value.splice(sectionIndex, 1);
  } else {
    expandedSections.value.push(index);
  }
};

const toggleResources = (lessonId: string) => {
  const resourceIndex = expandedResources.value.indexOf(lessonId);
  if (resourceIndex > -1) {
    expandedResources.value.splice(resourceIndex, 1);
  } else {
    expandedResources.value.push(lessonId);
  }
};

const openLesson = (lesson: Lesson) => {
  router.push(`/courses/${props.course.id}/learn/${lesson.id}`);
};

const previewLesson = (lesson: Lesson) => {
  selectedLesson.value = lesson;
  showPreview.value = true;
};

const closePreview = () => {
  showPreview.value = false;
  selectedLesson.value = null;
};
</script>

<style scoped>
.course-curriculum {
  max-width: 100%;
}

.curriculum-header {
  margin-bottom: var(--fana-space-8);
}

.curriculum-header h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.curriculum-stats {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.curriculum-stats span {
  margin: 0 var(--fana-space-2);
}

/* Section Styles */
.curriculum-section {
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-xl);
  margin-bottom: var(--fana-space-4);
  overflow: hidden;
  background: var(--fana-bg-card);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-4) var(--fana-space-6);
  cursor: pointer;
  transition: background-color var(--fana-transition-base);
  background: var(--fana-bg-secondary);
}

.section-header:hover {
  background: var(--fana-bg-tertiary);
}

.section-info {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
}

.section-toggle {
  background: none;
  border: none;
  color: var(--fana-text-secondary);
  cursor: pointer;
  padding: var(--fana-space-2);
  border-radius: var(--fana-radius-md);
  transition: all var(--fana-transition-base);
}

.section-toggle:hover {
  background: var(--fana-bg-card);
  color: var(--fana-primary);
}

.section-title {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin: 0;
  color: var(--fana-text-primary);
}

.section-meta {
  display: flex;
  align-items: center;
  gap: var(--fana-space-4);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.section-content {
  padding: var(--fana-space-6);
  border-top: 1px solid var(--fana-border-color);
}

.section-description {
  margin-bottom: var(--fana-space-6);
  color: var(--fana-text-secondary);
  line-height: 1.6;
}

/* Lesson Styles */
.lessons-list {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
}

.lesson-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-4);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  transition: all var(--fana-transition-base);
  background: var(--fana-bg-primary);
}

.lesson-item:hover {
  border-color: var(--fana-primary);
  box-shadow: var(--fana-shadow-sm);
}

.lesson-item.completed {
  background: rgba(16, 185, 129, 0.05);
  border-color: var(--fana-accent-green);
}

.lesson-item.current {
  background: rgba(99, 102, 241, 0.05);
  border-color: var(--fana-primary);
}

.lesson-item.locked {
  opacity: 0.6;
  background: var(--fana-bg-secondary);
}

.lesson-info {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  flex: 1;
}

.lesson-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--fana-radius-lg);
  background: var(--fana-bg-secondary);
  font-size: 1.2rem;
}

.completed-icon {
  color: var(--fana-accent-green);
}

.locked-icon {
  color: var(--fana-text-muted);
}

.lesson-type-icon {
  color: var(--fana-primary);
}

.lesson-details {
  flex: 1;
}

.lesson-title {
  font-size: var(--fana-text-base);
  font-weight: 600;
  margin: 0 0 var(--fana-space-1) 0;
  color: var(--fana-text-primary);
}

.lesson-link {
  background: none;
  border: none;
  color: var(--fana-text-primary);
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  transition: color var(--fana-transition-base);
}

.lesson-link:hover {
  color: var(--fana-primary);
}

.lesson-text {
  color: var(--fana-text-primary);
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.preview-badge {
  padding: var(--fana-space-1) var(--fana-space-2);
  background: var(--fana-accent-blue);
  color: white;
  border-radius: var(--fana-radius-sm);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  text-transform: uppercase;
}

.lesson-actions {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
}

.preview-btn,
.resources-btn {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-3);
  background: var(--fana-bg-secondary);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-md);
  color: var(--fana-text-secondary);
  font-size: var(--fana-text-sm);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.preview-btn:hover,
.resources-btn:hover {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

.lesson-resources {
  position: relative;
}

.resources-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  box-shadow: var(--fana-shadow-lg);
  padding: var(--fana-space-3);
  min-width: 250px;
  margin-top: var(--fana-space-2);
}

.resource-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2);
  border-radius: var(--fana-radius-md);
  transition: background-color var(--fana-transition-base);
}

.resource-item:hover {
  background: var(--fana-bg-secondary);
}

.resource-link {
  flex: 1;
  color: var(--fana-text-primary);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  font-weight: 500;
}

.resource-link:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

.resource-size {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--fana-space-2);
  }
  
  .lesson-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--fana-space-3);
  }
  
  .lesson-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .resources-dropdown {
    right: auto;
    left: 0;
  }
}
</style>