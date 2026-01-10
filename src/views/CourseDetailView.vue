<template>
  <div class="course-detail-view">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <font-awesome-icon :icon="['fas', 'spinner']" spin />
      </div>
      <p>Loading course details...</p>
    </div>

    <!-- Course Content -->
    <div v-else-if="course" class="course-content">
      <!-- Hero Section -->
      <section class="course-hero">
        <div class="hero-background">
          <img :src="course.thumbnail" :alt="course.title" class="hero-bg-image" />
          <div class="hero-overlay"></div>
        </div>
        
        <div class="hero-container">
          <div class="hero-content">
            <div class="course-breadcrumb">
              <router-link to="/courses" class="breadcrumb-link">
                <font-awesome-icon :icon="['fas', 'arrow-left']" />
                Back to Courses
              </router-link>
            </div>
            
            <div class="course-badges">
              <span v-if="course.price === 0" class="badge free">Free Course</span>
              <span v-if="course.isNew" class="badge new">New</span>
              <span v-if="course.isBestseller" class="badge bestseller">Bestseller</span>
            </div>
            
            <h1 class="course-title">{{ course.title }}</h1>
            
            <p class="course-subtitle">{{ course.subtitle }}</p>
            
            <div class="course-meta">
              <div class="meta-item">
                <font-awesome-icon :icon="['fas', 'star']" />
                <span>{{ course.rating.toFixed(1) }} ({{ formatNumber(course.reviewCount) }} reviews)</span>
              </div>
              <div class="meta-item">
                <font-awesome-icon :icon="['fas', 'users']" />
                <span>{{ formatNumber(course.enrollmentCount) }} students</span>
              </div>
              <div class="meta-item">
                <font-awesome-icon :icon="['fas', 'clock']" />
                <span>{{ formatDuration(course.duration) }} total</span>
              </div>
              <div class="meta-item">
                <font-awesome-icon :icon="['fas', 'play-circle']" />
                <span>{{ course.lessonCount }} lessons</span>
              </div>
            </div>
            
            <div class="course-instructor">
              <img :src="course.instructor.avatar" :alt="course.instructor.name" class="instructor-avatar" />
              <div class="instructor-info">
                <h3 class="instructor-name">{{ course.instructor.name }}</h3>
                <p class="instructor-title">{{ course.instructor.title }}</p>
              </div>
            </div>
          </div>
          
          <!-- Course Card -->
          <div class="course-card-container">
            <div class="course-card">
              <div class="course-preview">
                <img :src="course.thumbnail" :alt="course.title" class="preview-image" />
                <button class="play-preview-btn" @click="showPreview = true">
                  <font-awesome-icon :icon="['fas', 'play']" />
                  Preview Course
                </button>
              </div>
              
              <div class="course-pricing">
                <div v-if="course.price === 0" class="price free">
                  <span class="price-label">Free</span>
                </div>
                <div v-else class="price paid">
                  <span v-if="course.originalPrice && course.originalPrice > course.price" class="original-price">
                    ${{ course.originalPrice }}
                  </span>
                  <span class="current-price">${{ course.price }}</span>
                  <span v-if="course.originalPrice && course.originalPrice > course.price" class="discount">
                    {{ Math.round((1 - course.price / course.originalPrice) * 100) }}% off
                  </span>
                </div>
              </div>
              
              <div class="course-actions">
                <button 
                  v-if="isEnrolled"
                  class="btn-primary-large"
                  @click="continueLearning"
                >
                  <font-awesome-icon :icon="['fas', 'play']" />
                  Continue Learning
                </button>
                <button 
                  v-else
                  class="btn-primary-large"
                  @click="enrollInCourse"
                  :disabled="isEnrolling"
                >
                  <font-awesome-icon :icon="isEnrolling ? ['fas', 'spinner'] : ['fas', 'plus']" />
                  {{ isEnrolling ? 'Enrolling...' : 'Enroll Now' }}
                </button>
                
                <button class="btn-secondary-large" @click="toggleWishlist">
                  <font-awesome-icon :icon="isWishlisted ? ['fas', 'heart'] : ['far', 'heart']" />
                  {{ isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist' }}
                </button>
              </div>
              
              <div class="course-includes">
                <h4>This course includes:</h4>
                <ul class="includes-list">
                  <li>
                    <font-awesome-icon :icon="['fas', 'video']" />
                    {{ formatDuration(course.duration) }} on-demand video
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fas', 'file-alt']" />
                    {{ course.resourceCount || 0 }} downloadable resources
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fas', 'mobile-alt']" />
                    Access on mobile and TV
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fas', 'infinity']" />
                    Full lifetime access
                  </li>
                  <li>
                    <font-awesome-icon :icon="['fas', 'certificate']" />
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Course Content Tabs -->
      <section class="course-tabs-section">
        <div class="section-container">
          <div class="tabs-wrapper">
            <nav class="tabs-nav">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                class="tab-btn"
                :class="{ active: activeTab === tab.id }"
                @click="activeTab = tab.id"
              >
                <font-awesome-icon :icon="tab.icon" />
                {{ tab.label }}
              </button>
            </nav>
            
            <div class="tab-content">
              <!-- Overview Tab -->
              <div v-if="activeTab === 'overview'" class="tab-panel">
                <div class="overview-grid">
                  <div class="overview-main">
                    <div class="description-section">
                      <h3>About this course</h3>
                      <div class="course-description" v-html="course.description"></div>
                    </div>
                    
                    <div class="learning-objectives">
                      <h3>What you'll learn</h3>
                      <ul class="objectives-list">
                        <li v-for="objective in course.learningObjectives" :key="objective">
                          <font-awesome-icon :icon="['fas', 'check']" />
                          {{ objective }}
                        </li>
                      </ul>
                    </div>
                    
                    <div class="requirements-section">
                      <h3>Requirements</h3>
                      <ul class="requirements-list">
                        <li v-for="requirement in course.requirements" :key="requirement">
                          {{ requirement }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="overview-sidebar">
                    <div class="course-stats-card">
                      <h4>Course Statistics</h4>
                      <div class="stats-grid">
                        <div class="stat-item">
                          <div class="stat-value">{{ course.difficulty }}</div>
                          <div class="stat-label">Level</div>
                        </div>
                        <div class="stat-item">
                          <div class="stat-value">{{ formatCategory(course.category) }}</div>
                          <div class="stat-label">Category</div>
                        </div>
                        <div class="stat-item">
                          <div class="stat-value">{{ course.language || 'English' }}</div>
                          <div class="stat-label">Language</div>
                        </div>
                        <div class="stat-item">
                          <div class="stat-value">{{ formatDate(course.updatedAt) }}</div>
                          <div class="stat-label">Last Updated</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Curriculum Tab -->
              <div v-if="activeTab === 'curriculum'" class="tab-panel">
                <CourseCurriculum :course="course" :is-enrolled="isEnrolled" />
              </div>

              <!-- Reviews Tab -->
              <div v-if="activeTab === 'reviews'" class="tab-panel">
                <CourseReviews :course-id="course.id" :rating="course.rating" />
              </div>

              <!-- Instructor Tab -->
              <div v-if="activeTab === 'instructor'" class="tab-panel">
                <CourseInstructor :instructor="course.instructor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Courses -->
      <section class="related-courses-section">
        <div class="section-container">
          <h2 class="section-title">More courses like this</h2>
          <div class="related-courses-grid">
            <CourseCard 
              v-for="relatedCourse in relatedCourses" 
              :key="relatedCourse.id"
              :course="relatedCourse"
              @enroll="handleEnroll"
              @favorite="handleFavorite"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Error State -->
    <div v-else class="error-container">
      <div class="error-icon">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      </div>
      <h2>Course not found</h2>
      <p>The course you're looking for doesn't exist or has been removed.</p>
      <router-link to="/courses" class="btn-primary-modern">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Back to Courses
      </router-link>
    </div>

    <!-- Preview Modal -->
    <CoursePreviewModal 
      v-if="showPreview" 
      :course="course"
      @close="showPreview = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoursesStore } from '@/store/modules/courses';
import { useAuthStore } from '@/store/modules/auth';
import CourseCard from '@/components/Common/CourseCard.vue';
import CourseCurriculum from '@/components/Course/CourseCurriculum.vue';
import CourseReviews from '@/components/Course/CourseReviews.vue';
import CourseInstructor from '@/components/Course/CourseInstructor.vue';
import CoursePreviewModal from '@/components/Course/CoursePreviewModal.vue';

const route = useRoute();
const router = useRouter();
const coursesStore = useCoursesStore();
const authStore = useAuthStore();

// Reactive state
const activeTab = ref('overview');
const isEnrolling = ref(false);
const isWishlisted = ref(false);
const showPreview = ref(false);

// Computed properties
const isLoading = computed(() => coursesStore.isLoading);
const course = computed(() => coursesStore.currentCourse);
const relatedCourses = computed(() => coursesStore.courses.slice(0, 3));

const isEnrolled = computed(() => {
  return course.value?.isEnrolled || false;
});

const tabs = [
  { id: 'overview', label: 'Overview', icon: ['fas', 'info-circle'] },
  { id: 'curriculum', label: 'Curriculum', icon: ['fas', 'list'] },
  { id: 'reviews', label: 'Reviews', icon: ['fas', 'star'] },
  { id: 'instructor', label: 'Instructor', icon: ['fas', 'user'] }
];

// Methods
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const formatDuration = (hours: number): string => {
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  return `${hours.toFixed(1)}h`;
};

const formatCategory = (category: string): string => {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

const enrollInCourse = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }

  isEnrolling.value = true;
  try {
    await coursesStore.enrollInCourse(course.value!.id);
    // Show success notification
  } catch (error) {
    console.error('Enrollment failed:', error);
    // Show error notification
  } finally {
    isEnrolling.value = false;
  }
};

const continueLearning = () => {
  router.push(`/courses/${course.value!.id}/learn`);
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
  // Implement wishlist functionality
};

const handleEnroll = (courseId: string) => {
  // Handle enrollment for related courses
};

const handleFavorite = (courseId: string) => {
  // Handle favorite for related courses
};

// Lifecycle
onMounted(async () => {
  const courseId = route.params.id as string;
  if (courseId) {
    await coursesStore.fetchCourseById(courseId);
  }
});
</script>

<style scoped>
/* Loading and Error States */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
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

/* Hero Section */
.course-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px) brightness(0.3);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.9) 100%);
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--fana-space-12);
  align-items: start;
}

.hero-content {
  color: white;
  padding-top: var(--fana-space-16);
}

.course-breadcrumb {
  margin-bottom: var(--fana-space-6);
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  transition: color var(--fana-transition-base);
}

.breadcrumb-link:hover {
  color: white;
  text-decoration: none;
}

.course-badges {
  display: flex;
  gap: var(--fana-space-3);
  margin-bottom: var(--fana-space-6);
}

.badge {
  padding: var(--fana-space-2) var(--fana-space-4);
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

.course-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: var(--fana-space-4);
}

.course-subtitle {
  font-size: var(--fana-text-lg);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: var(--fana-space-8);
}

.course-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: rgba(255, 255, 255, 0.8);
}

.course-instructor {
  display: flex;
  align-items: center;
  gap: var(--fana-space-4);
}

.instructor-avatar {
  width: 60px;
  height: 60px;
  border-radius: var(--fana-radius-full);
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.instructor-name {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  margin-bottom: var(--fana-space-1);
}

.instructor-title {
  font-size: var(--fana-text-sm);
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Course Card */
.course-card-container {
  position: sticky;
  top: var(--fana-space-8);
}

.course-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-2xl);
  border: 1px solid var(--fana-border-color);
}

.course-preview {
  position: relative;
}

.preview-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.play-preview-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  border: none;
  border-radius: var(--fana-radius-full);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.play-preview-btn:hover {
  background: var(--fana-primary);
  transform: translate(-50%, -50%) scale(1.1);
}

.course-pricing {
  padding: var(--fana-space-6);
  border-bottom: 1px solid var(--fana-border-color);
}

.price.free .price-label {
  font-size: var(--fana-text-2xl);
  font-weight: 800;
  color: var(--fana-accent-green);
}

.price.paid {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
}

.original-price {
  font-size: var(--fana-text-lg);
  color: var(--fana-text-muted);
  text-decoration: line-through;
}

.current-price {
  font-size: var(--fana-text-2xl);
  font-weight: 800;
  color: var(--fana-primary);
}

.discount {
  padding: var(--fana-space-1) var(--fana-space-2);
  background: var(--fana-accent-red);
  color: white;
  border-radius: var(--fana-radius-md);
  font-size: var(--fana-text-xs);
  font-weight: 600;
}

.course-actions {
  padding: var(--fana-space-6);
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
  border-bottom: 1px solid var(--fana-border-color);
}

.btn-primary-large,
.btn-secondary-large {
  width: 100%;
  padding: var(--fana-space-4) var(--fana-space-6);
  border-radius: var(--fana-radius-xl);
  font-size: var(--fana-text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--fana-space-2);
  border: none;
}

.btn-primary-large {
  background: var(--fana-gradient-primary);
  color: white;
}

.btn-primary-large:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

.btn-secondary-large {
  background: transparent;
  color: var(--fana-text-primary);
  border: 2px solid var(--fana-border-color);
}

.btn-secondary-large:hover {
  border-color: var(--fana-primary);
  color: var(--fana-primary);
}

.course-includes {
  padding: var(--fana-space-6);
}

.course-includes h4 {
  font-size: var(--fana-text-base);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.includes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.includes-list li {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-2) 0;
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.includes-list li svg {
  color: var(--fana-primary);
  width: 16px;
}

/* Tabs Section */
.course-tabs-section {
  padding: var(--fana-space-16) 0;
  background: var(--fana-bg-primary);
}

.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
}

.tabs-wrapper {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid var(--fana-border-color);
  background: var(--fana-bg-secondary);
}

.tab-btn {
  flex: 1;
  padding: var(--fana-space-4) var(--fana-space-6);
  background: transparent;
  border: none;
  color: var(--fana-text-secondary);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--fana-space-2);
  position: relative;
}

.tab-btn:hover,
.tab-btn.active {
  color: var(--fana-primary);
  background: var(--fana-bg-card);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--fana-gradient-primary);
}

.tab-content {
  padding: var(--fana-space-8);
}

/* Overview Tab */
.overview-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--fana-space-12);
}

.overview-main h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.description-section,
.learning-objectives,
.requirements-section {
  margin-bottom: var(--fana-space-8);
}

.course-description {
  color: var(--fana-text-secondary);
  line-height: 1.7;
}

.objectives-list,
.requirements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.objectives-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--fana-space-3);
  padding: var(--fana-space-2) 0;
  color: var(--fana-text-secondary);
}

.objectives-list li svg {
  color: var(--fana-accent-green);
  margin-top: 2px;
  flex-shrink: 0;
}

.requirements-list li {
  padding: var(--fana-space-2) 0;
  color: var(--fana-text-secondary);
  position: relative;
  padding-left: var(--fana-space-4);
}

.requirements-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--fana-primary);
}

.course-stats-card {
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-xl);
  padding: var(--fana-space-6);
  border: 1px solid var(--fana-border-color);
}

.course-stats-card h4 {
  font-size: var(--fana-text-base);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--fana-space-4);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
  margin-bottom: var(--fana-space-1);
}

.stat-label {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Related Courses */
.related-courses-section {
  padding: var(--fana-space-16) 0;
  background: var(--fana-bg-secondary);
}

.section-title {
  font-size: var(--fana-text-2xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-8);
  color: var(--fana-text-primary);
}

.related-courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: var(--fana-space-8);
  }
  
  .course-card-container {
    position: static;
  }
  
  .overview-grid {
    grid-template-columns: 1fr;
    gap: var(--fana-space-8);
  }
}

@media (max-width: 768px) {
  .tabs-nav {
    flex-direction: column;
  }
  
  .tab-btn {
    justify-content: flex-start;
  }
  
  .course-meta {
    flex-direction: column;
    gap: var(--fana-space-3);
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>