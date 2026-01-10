<template>
  <div class="courses-view">
    <!-- Hero Section -->
    <section class="courses-hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
      </div>
      
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <font-awesome-icon :icon="['fas', 'graduation-cap']" />
            <span>Course Catalog</span>
          </div>
          
          <h1 class="hero-title">
            <span class="text-gradient">Discover Your</span><br>
            <span class="text-gradient">Perfect Course</span>
          </h1>
          
          <p class="hero-description">
            Explore our comprehensive collection of AI-powered courses designed to accelerate your learning journey. 
            From beginner-friendly introductions to advanced masterclasses.
          </p>
          
          <!-- Search Bar -->
          <div class="search-container">
            <div class="search-input-wrapper">
              <font-awesome-icon :icon="['fas', 'search']" class="search-icon" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Search courses, topics, or instructors..."
                class="search-input"
                @input="handleSearch"
              />
            </div>
            <button class="search-btn" @click="handleSearch">
              <font-awesome-icon :icon="['fas', 'search']" />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="filters-section">
      <div class="section-container">
        <div class="filters-wrapper">
          <div class="filters-header">
            <h3>Filter Courses</h3>
            <button class="clear-filters-btn" @click="clearFilters" v-if="hasActiveFilters">
              <font-awesome-icon :icon="['fas', 'times']" />
              Clear All
            </button>
          </div>
          
          <div class="filters-grid">
            <!-- Category Filter -->
            <div class="filter-group">
              <label class="filter-label">Category</label>
              <select v-model="filters.category" class="filter-select">
                <option value="">All Categories</option>
                <option value="programming">Programming</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="data-science">Data Science</option>
                <option value="ai-ml">AI & Machine Learning</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            <!-- Difficulty Filter -->
            <div class="filter-group">
              <label class="filter-label">Difficulty</label>
              <select v-model="filters.difficulty" class="filter-select">
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <!-- Price Filter -->
            <div class="filter-group">
              <label class="filter-label">Price</label>
              <select v-model="filters.price" class="filter-select">
                <option value="">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <!-- Duration Filter -->
            <div class="filter-group">
              <label class="filter-label">Duration</label>
              <select v-model="filters.duration" class="filter-select">
                <option value="">Any Duration</option>
                <option value="short">Under 5 hours</option>
                <option value="medium">5-20 hours</option>
                <option value="long">20+ hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Grid Section -->
    <section class="courses-grid-section">
      <div class="section-container">
        <div class="section-header">
          <div class="results-info">
            <h2 class="section-title">
              {{ filteredCourses.length }} Course{{ filteredCourses.length !== 1 ? 's' : '' }} Found
            </h2>
            <p class="section-subtitle">Choose from our expertly crafted learning experiences</p>
          </div>
          
          <div class="view-controls">
            <button 
              class="view-btn" 
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <font-awesome-icon :icon="['fas', 'th-large']" />
            </button>
            <button 
              class="view-btn" 
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <font-awesome-icon :icon="['fas', 'list']" />
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-grid">
          <div v-for="n in 6" :key="n" class="course-card-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
            </div>
          </div>
        </div>

        <!-- Courses Grid -->
        <div v-else-if="filteredCourses.length > 0" class="courses-grid" :class="{ 'list-view': viewMode === 'list' }">
          <CourseCard 
            v-for="course in paginatedCourses" 
            :key="course.id"
            :course="course"
            :view-mode="viewMode"
            @enroll="handleEnroll"
            @favorite="handleFavorite"
          />
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state">
          <div class="empty-icon">
            <font-awesome-icon :icon="['fas', 'search']" />
          </div>
          <h3 class="empty-title">No courses found</h3>
          <p class="empty-description">
            Try adjusting your search criteria or browse our featured courses below.
          </p>
          <button class="btn-primary-modern" @click="clearFilters">
            <font-awesome-icon :icon="['fas', 'refresh']" />
            Reset Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-wrapper">
          <nav class="pagination">
            <button 
              class="pagination-btn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <font-awesome-icon :icon="['fas', 'chevron-left']" />
              Previous
            </button>
            
            <div class="pagination-numbers">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                class="pagination-number"
                :class="{ active: page === currentPage }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="pagination-btn"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Next
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </nav>
        </div>
      </div>
    </section>

    <!-- Featured Courses Section -->
    <section v-if="!hasActiveFilters" class="featured-courses-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Featured Courses</h2>
          <p class="section-subtitle">Hand-picked courses from our top instructors</p>
        </div>
        
        <div class="featured-courses-grid">
          <CourseCard 
            v-for="course in featuredCourses" 
            :key="course.id"
            :course="course"
            :featured="true"
            @enroll="handleEnroll"
            @favorite="handleFavorite"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useCoursesStore } from '@/store/modules/courses';
import { useAuthStore } from '@/store/modules/auth';
import CourseCard from '@/components/Common/CourseCard.vue';
import type { CourseFilters } from '@/types/course';

// Store instances
const coursesStore = useCoursesStore();
const authStore = useAuthStore();

// Reactive state
const searchQuery = ref('');
const viewMode = ref<'grid' | 'list'>('grid');
const currentPage = ref(1);
const itemsPerPage = 12;

// Filters
const filters = ref<CourseFilters>({
  category: '',
  difficulty: '',
  price: '',
  duration: '',
  search: ''
});

// Computed properties
const isLoading = computed(() => coursesStore.isLoading);
const allCourses = computed(() => coursesStore.courses);
const featuredCourses = computed(() => coursesStore.popularCourses.slice(0, 3));

const filteredCourses = computed(() => {
  let courses = allCourses.value;

  // Apply search filter
  if (searchQuery.value.trim()) {
    const search = searchQuery.value.toLowerCase();
    courses = courses.filter(course => 
      course.title.toLowerCase().includes(search) ||
      course.description.toLowerCase().includes(search) ||
      course.instructor.name.toLowerCase().includes(search)
    );
  }

  // Apply category filter
  if (filters.value.category) {
    courses = courses.filter(course => course.category === filters.value.category);
  }

  // Apply difficulty filter
  if (filters.value.difficulty) {
    courses = courses.filter(course => course.difficulty === filters.value.difficulty);
  }

  // Apply price filter
  if (filters.value.price) {
    if (filters.value.price === 'free') {
      courses = courses.filter(course => course.price === 0);
    } else if (filters.value.price === 'paid') {
      courses = courses.filter(course => course.price > 0);
    }
  }

  // Apply duration filter
  if (filters.value.duration) {
    courses = courses.filter(course => {
      const duration = course.duration || 0;
      switch (filters.value.duration) {
        case 'short': return duration < 5;
        case 'medium': return duration >= 5 && duration <= 20;
        case 'long': return duration > 20;
        default: return true;
      }
    });
  }

  return courses;
});

const totalPages = computed(() => Math.ceil(filteredCourses.value.length / itemsPerPage));

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredCourses.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});

const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() || 
         filters.value.category || 
         filters.value.difficulty || 
         filters.value.price || 
         filters.value.duration;
});

// Methods
const handleSearch = () => {
  currentPage.value = 1;
  filters.value.search = searchQuery.value;
};

const clearFilters = () => {
  searchQuery.value = '';
  filters.value = {
    category: '',
    difficulty: '',
    price: '',
    duration: '',
    search: ''
  };
  currentPage.value = 1;
};

const handleEnroll = async (courseId: string) => {
  if (!authStore.isAuthenticated) {
    // Redirect to login or show login modal
    return;
  }
  
  try {
    await coursesStore.enrollInCourse(courseId);
    // Show success notification
  } catch (error) {
    console.error('Enrollment failed:', error);
    // Show error notification
  }
};

const handleFavorite = (courseId: string) => {
  // Implement favorite functionality
  console.log('Toggle favorite for course:', courseId);
};

// Watch for filter changes
watch(filters, () => {
  currentPage.value = 1;
}, { deep: true });

// Lifecycle
onMounted(async () => {
  await coursesStore.fetchCourses();
});
</script>

<style scoped>
/* Hero Section */
.courses-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
  top: -150px;
  right: -150px;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
  bottom: -125px;
  left: -125px;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  width: 100%;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-4);
  background: rgba(99, 102, 241, 0.1);
  color: var(--fana-primary);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  margin-bottom: var(--fana-space-6);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--fana-space-6);
  color: var(--fana-text-primary);
}

.text-gradient {
  background: var(--fana-gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: var(--fana-text-lg);
  color: var(--fana-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--fana-space-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Search Container */
.search-container {
  display: flex;
  gap: var(--fana-space-3);
  max-width: 600px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: var(--fana-space-4);
  top: 50%;
  transform: translateY(-50%);
  color: var(--fana-text-muted);
  font-size: var(--fana-text-sm);
}

.search-input {
  width: 100%;
  padding: var(--fana-space-4) var(--fana-space-4) var(--fana-space-4) var(--fana-space-12);
  border: 2px solid var(--fana-border-color);
  border-radius: var(--fana-radius-xl);
  font-size: var(--fana-text-base);
  background: var(--fana-bg-card);
  transition: all var(--fana-transition-base);
}

.search-input:focus {
  outline: none;
  border-color: var(--fana-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-btn {
  padding: var(--fana-space-4) var(--fana-space-6);
  background: var(--fana-gradient-primary);
  color: white;
  border: none;
  border-radius: var(--fana-radius-xl);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

/* Filters Section */
.filters-section {
  padding: var(--fana-space-16) 0;
  background: var(--fana-bg-secondary);
  border-bottom: 1px solid var(--fana-border-color);
}

.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
}

.filters-wrapper {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  padding: var(--fana-space-8);
  box-shadow: var(--fana-shadow-sm);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-6);
}

.filters-header h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin: 0;
}

.clear-filters-btn {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-4);
  background: transparent;
  color: var(--fana-text-muted);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-sm);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.clear-filters-btn:hover {
  color: var(--fana-primary);
  border-color: var(--fana-primary);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--fana-space-6);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
}

.filter-label {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-secondary);
}

.filter-select {
  padding: var(--fana-space-3) var(--fana-space-4);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  background: var(--fana-bg-primary);
  font-size: var(--fana-text-sm);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.filter-select:focus {
  outline: none;
  border-color: var(--fana-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Courses Grid Section */
.courses-grid-section {
  padding: var(--fana-space-16) 0;
  background: var(--fana-bg-primary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: var(--fana-space-12);
}

.section-title {
  font-size: var(--fana-text-3xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.section-subtitle {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  margin: 0;
}

.view-controls {
  display: flex;
  gap: var(--fana-space-2);
}

.view-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fana-bg-secondary);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  color: var(--fana-text-muted);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.view-btn:hover,
.view-btn.active {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

/* Loading Skeleton */
.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

.course-card-skeleton {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
}

.skeleton-image {
  height: 200px;
  background: var(--fana-gray-200);
  animation: loading 1.5s infinite;
}

.skeleton-content {
  padding: var(--fana-space-6);
}

.skeleton-title {
  height: 24px;
  background: var(--fana-gray-200);
  border-radius: var(--fana-radius-md);
  margin-bottom: var(--fana-space-3);
  animation: loading 1.5s infinite;
}

.skeleton-text {
  height: 16px;
  background: var(--fana-gray-200);
  border-radius: var(--fana-radius-md);
  margin-bottom: var(--fana-space-2);
  animation: loading 1.5s infinite;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

.courses-grid.list-view {
  grid-template-columns: 1fr;
  gap: var(--fana-space-4);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--fana-space-16) var(--fana-space-8);
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--fana-space-6);
  color: var(--fana-text-muted);
  font-size: 2rem;
}

.empty-title {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.empty-description {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-8);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Pagination */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: var(--fana-space-16);
}

.pagination {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  color: var(--fana-text-secondary);
  font-size: var(--fana-text-sm);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.pagination-btn:hover:not(:disabled) {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: var(--fana-space-1);
  margin: 0 var(--fana-space-4);
}

.pagination-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  color: var(--fana-text-secondary);
  font-size: var(--fana-text-sm);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.pagination-number:hover,
.pagination-number.active {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

/* Featured Courses Section */
.featured-courses-section {
  padding: var(--fana-space-20) 0;
  background: var(--fana-bg-secondary);
}

.featured-courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--fana-space-4);
  }
  
  .filters-grid {
    grid-template-columns: 1fr;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>