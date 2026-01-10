<template>
  <div class="my-courses-view">
    <!-- Header -->
    <section class="my-courses-header">
      <div class="header-container">
        <h1 class="page-title">My Courses</h1>
        <p class="page-subtitle">Manage your learning journey and created courses</p>
        
        <div class="header-actions">
          <router-link to="/create-course" class="btn-primary-modern">
            <font-awesome-icon :icon="['fas', 'plus']" />
            Create New Course
          </router-link>
        </div>
      </div>
    </section>

    <!-- Course Tabs -->
    <section class="courses-tabs-section">
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
              <span class="tab-count">{{ getTabCount(tab.id) }}</span>
            </button>
          </nav>
          
          <div class="tab-content">
            <!-- Enrolled Courses Tab -->
            <div v-if="activeTab === 'enrolled'" class="tab-panel">
              <div class="courses-header">
                <h2>Enrolled Courses</h2>
                <div class="courses-filters">
                  <select v-model="enrolledFilter" class="filter-select">
                    <option value="all">All Courses</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="not-started">Not Started</option>
                  </select>
                </div>
              </div>
              
              <div v-if="filteredEnrolledCourses.length > 0" class="courses-grid">
                <EnrolledCourseCard 
                  v-for="course in filteredEnrolledCourses" 
                  :key="course.id"
                  :course="course"
                  @continue="continueCourse"
                  @view-certificate="viewCertificate"
                />
              </div>
              
              <div v-else class="empty-state">
                <div class="empty-icon">
                  <font-awesome-icon :icon="['fas', 'graduation-cap']" />
                </div>
                <h3>No enrolled courses</h3>
                <p>Start your learning journey by enrolling in courses that interest you.</p>
                <router-link to="/courses" class="btn-primary-modern">
                  <font-awesome-icon :icon="['fas', 'search']" />
                  Browse Courses
                </router-link>
              </div>
            </div>

            <!-- Created Courses Tab -->
            <div v-if="activeTab === 'created'" class="tab-panel">
              <div class="courses-header">
                <h2>Created Courses</h2>
                <div class="courses-filters">
                  <select v-model="createdFilter" class="filter-select">
                    <option value="all">All Courses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending Review</option>
                  </select>
                </div>
              </div>
              
              <div v-if="filteredCreatedCourses.length > 0" class="courses-grid">
                <CreatedCourseCard 
                  v-for="course in filteredCreatedCourses" 
                  :key="course.id"
                  :course="course"
                  @edit="editCourse"
                  @view-analytics="viewAnalytics"
                  @publish="publishCourse"
                  @unpublish="unpublishCourse"
                  @delete="deleteCourse"
                />
              </div>
              
              <div v-else class="empty-state">
                <div class="empty-icon">
                  <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" />
                </div>
                <h3>No created courses</h3>
                <p>Share your knowledge by creating your first course.</p>
                <router-link to="/create-course" class="btn-primary-modern">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                  Create Course
                </router-link>
              </div>
            </div>

            <!-- Wishlist Tab -->
            <div v-if="activeTab === 'wishlist'" class="tab-panel">
              <div class="courses-header">
                <h2>Wishlist</h2>
                <div class="courses-filters">
                  <select v-model="wishlistFilter" class="filter-select">
                    <option value="all">All Items</option>
                    <option value="free">Free Courses</option>
                    <option value="paid">Paid Courses</option>
                    <option value="on-sale">On Sale</option>
                  </select>
                </div>
              </div>
              
              <div v-if="filteredWishlistCourses.length > 0" class="courses-grid">
                <WishlistCourseCard 
                  v-for="course in filteredWishlistCourses" 
                  :key="course.id"
                  :course="course"
                  @enroll="enrollInCourse"
                  @remove="removeFromWishlist"
                />
              </div>
              
              <div v-else class="empty-state">
                <div class="empty-icon">
                  <font-awesome-icon :icon="['fas', 'heart']" />
                </div>
                <h3>No courses in wishlist</h3>
                <p>Save courses you're interested in to your wishlist for later.</p>
                <router-link to="/courses" class="btn-primary-modern">
                  <font-awesome-icon :icon="['fas', 'search']" />
                  Browse Courses
                </router-link>
              </div>
            </div>

            <!-- Certificates Tab -->
            <div v-if="activeTab === 'certificates'" class="tab-panel">
              <div class="courses-header">
                <h2>Certificates</h2>
                <div class="courses-filters">
                  <select v-model="certificateFilter" class="filter-select">
                    <option value="all">All Certificates</option>
                    <option value="recent">Recent</option>
                    <option value="course">By Course</option>
                  </select>
                </div>
              </div>
              
              <div v-if="filteredCertificates.length > 0" class="certificates-grid">
                <CertificateCard 
                  v-for="certificate in filteredCertificates" 
                  :key="certificate.id"
                  :certificate="certificate"
                  @download="downloadCertificate"
                  @share="shareCertificate"
                />
              </div>
              
              <div v-else class="empty-state">
                <div class="empty-icon">
                  <font-awesome-icon :icon="['fas', 'certificate']" />
                </div>
                <h3>No certificates earned</h3>
                <p>Complete courses to earn certificates and showcase your achievements.</p>
                <router-link to="/courses" class="btn-primary-modern">
                  <font-awesome-icon :icon="['fas', 'graduation-cap']" />
                  Start Learning
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Stats -->
    <section class="learning-stats-section">
      <div class="section-container">
        <h2 class="section-title">Learning Statistics</h2>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <font-awesome-icon :icon="['fas', 'book-open']" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ enrolledCourses.length }}</div>
              <div class="stat-label">Courses Enrolled</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <font-awesome-icon :icon="['fas', 'clock']" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ totalLearningHours }}h</div>
              <div class="stat-label">Hours Learned</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <font-awesome-icon :icon="['fas', 'certificate']" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ certificates.length }}</div>
              <div class="stat-label">Certificates Earned</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <font-awesome-icon :icon="['fas', 'trophy']" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ completionRate }}%</div>
              <div class="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCoursesStore } from '@/store/modules/courses';
import { useAuthStore } from '@/store/modules/auth';
import EnrolledCourseCard from '@/components/Course/EnrolledCourseCard.vue';
import CreatedCourseCard from '@/components/Course/CreatedCourseCard.vue';
import WishlistCourseCard from '@/components/Course/WishlistCourseCard.vue';
import CertificateCard from '@/components/Course/CertificateCard.vue';

const router = useRouter();
const coursesStore = useCoursesStore();
const authStore = useAuthStore();

// Reactive state
const activeTab = ref('enrolled');
const enrolledFilter = ref('all');
const createdFilter = ref('all');
const wishlistFilter = ref('all');
const certificateFilter = ref('all');

// Mock data (in real app, this would come from stores)
const enrolledCourses = ref([
  {
    id: '1',
    title: 'Complete React Developer Course',
    instructor: 'John Doe',
    thumbnail: '/api/placeholder/300/200',
    progress: 75,
    totalLessons: 120,
    completedLessons: 90,
    lastAccessed: '2024-01-10',
    status: 'in-progress',
    timeSpent: 45.5,
    nextLesson: 'Advanced Hooks Patterns'
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    instructor: 'Jane Smith',
    thumbnail: '/api/placeholder/300/200',
    progress: 100,
    totalLessons: 80,
    completedLessons: 80,
    lastAccessed: '2024-01-08',
    status: 'completed',
    timeSpent: 60.0,
    certificateEarned: true
  }
]);

const createdCourses = ref([
  {
    id: '1',
    title: 'Vue.js Masterclass',
    thumbnail: '/api/placeholder/300/200',
    status: 'published',
    enrollmentCount: 1250,
    rating: 4.8,
    revenue: 15750,
    lastUpdated: '2024-01-05',
    totalLessons: 95
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    thumbnail: '/api/placeholder/300/200',
    status: 'draft',
    enrollmentCount: 0,
    rating: 0,
    revenue: 0,
    lastUpdated: '2024-01-12',
    totalLessons: 45
  }
]);

const wishlistCourses = ref([
  {
    id: '1',
    title: 'Advanced Python Programming',
    instructor: 'Mike Johnson',
    thumbnail: '/api/placeholder/300/200',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.7,
    addedDate: '2024-01-08',
    isOnSale: true
  }
]);

const certificates = ref([
  {
    id: '1',
    courseTitle: 'Machine Learning Fundamentals',
    instructor: 'Jane Smith',
    completionDate: '2024-01-08',
    certificateUrl: '#',
    thumbnail: '/api/placeholder/400/300'
  }
]);

// Tabs configuration
const tabs = [
  { id: 'enrolled', label: 'Enrolled', icon: ['fas', 'book-open'] },
  { id: 'created', label: 'Created', icon: ['fas', 'chalkboard-teacher'] },
  { id: 'wishlist', label: 'Wishlist', icon: ['fas', 'heart'] },
  { id: 'certificates', label: 'Certificates', icon: ['fas', 'certificate'] }
];

// Computed properties
const filteredEnrolledCourses = computed(() => {
  let courses = enrolledCourses.value;
  
  if (enrolledFilter.value !== 'all') {
    courses = courses.filter(course => course.status === enrolledFilter.value);
  }
  
  return courses;
});

const filteredCreatedCourses = computed(() => {
  let courses = createdCourses.value;
  
  if (createdFilter.value !== 'all') {
    courses = courses.filter(course => course.status === createdFilter.value);
  }
  
  return courses;
});

const filteredWishlistCourses = computed(() => {
  let courses = wishlistCourses.value;
  
  switch (wishlistFilter.value) {
    case 'free':
      courses = courses.filter(course => course.price === 0);
      break;
    case 'paid':
      courses = courses.filter(course => course.price > 0);
      break;
    case 'on-sale':
      courses = courses.filter(course => course.isOnSale);
      break;
  }
  
  return courses;
});

const filteredCertificates = computed(() => {
  let certs = certificates.value;
  
  if (certificateFilter.value === 'recent') {
    certs = certs.sort((a, b) => 
      new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime()
    );
  }
  
  return certs;
});

const totalLearningHours = computed(() => {
  return enrolledCourses.value.reduce((total, course) => total + course.timeSpent, 0);
});

const completionRate = computed(() => {
  if (enrolledCourses.value.length === 0) return 0;
  const completed = enrolledCourses.value.filter(course => course.status === 'completed').length;
  return Math.round((completed / enrolledCourses.value.length) * 100);
});

// Methods
const getTabCount = (tabId: string): number => {
  switch (tabId) {
    case 'enrolled':
      return enrolledCourses.value.length;
    case 'created':
      return createdCourses.value.length;
    case 'wishlist':
      return wishlistCourses.value.length;
    case 'certificates':
      return certificates.value.length;
    default:
      return 0;
  }
};

const continueCourse = (courseId: string) => {
  router.push(`/courses/${courseId}/learn`);
};

const viewCertificate = (certificateId: string) => {
  // Open certificate in new tab
  window.open(`/certificates/${certificateId}`, '_blank');
};

const editCourse = (courseId: string) => {
  router.push(`/courses/${courseId}/edit`);
};

const viewAnalytics = (courseId: string) => {
  router.push(`/courses/${courseId}/analytics`);
};

const publishCourse = async (courseId: string) => {
  try {
    await coursesStore.publishCourse(courseId);
    // Update local state
    const course = createdCourses.value.find(c => c.id === courseId);
    if (course) {
      course.status = 'published';
    }
  } catch (error) {
    console.error('Failed to publish course:', error);
  }
};

const unpublishCourse = async (courseId: string) => {
  try {
    await coursesStore.unpublishCourse(courseId);
    // Update local state
    const course = createdCourses.value.find(c => c.id === courseId);
    if (course) {
      course.status = 'draft';
    }
  } catch (error) {
    console.error('Failed to unpublish course:', error);
  }
};

const deleteCourse = async (courseId: string) => {
  if (confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
    try {
      await coursesStore.deleteCourse(courseId);
      // Remove from local state
      const index = createdCourses.value.findIndex(c => c.id === courseId);
      if (index > -1) {
        createdCourses.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  }
};

const enrollInCourse = async (courseId: string) => {
  try {
    await coursesStore.enrollInCourse(courseId);
    // Remove from wishlist and add to enrolled
    const courseIndex = wishlistCourses.value.findIndex(c => c.id === courseId);
    if (courseIndex > -1) {
      wishlistCourses.value.splice(courseIndex, 1);
    }
  } catch (error) {
    console.error('Failed to enroll in course:', error);
  }
};

const removeFromWishlist = (courseId: string) => {
  const index = wishlistCourses.value.findIndex(c => c.id === courseId);
  if (index > -1) {
    wishlistCourses.value.splice(index, 1);
  }
};

const downloadCertificate = (certificateId: string) => {
  // Trigger certificate download
  const certificate = certificates.value.find(c => c.id === certificateId);
  if (certificate) {
    window.open(certificate.certificateUrl, '_blank');
  }
};

const shareCertificate = (certificateId: string) => {
  // Share certificate on social media or copy link
  const certificate = certificates.value.find(c => c.id === certificateId);
  if (certificate) {
    navigator.clipboard.writeText(`Check out my certificate: ${certificate.certificateUrl}`);
    // Show success notification
  }
};

// Lifecycle
onMounted(async () => {
  await coursesStore.fetchEnrolledCourses();
});
</script>

<style scoped>
/* Header */
.my-courses-header {
  background: var(--fana-bg-secondary);
  padding: var(--fana-space-12) 0 var(--fana-space-8);
  border-bottom: 1px solid var(--fana-border-color);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.page-title {
  font-size: var(--fana-text-4xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.page-subtitle {
  font-size: var(--fana-text-lg);
  color: var(--fana-text-secondary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: var(--fana-space-3);
}

/* Tabs Section */
.courses-tabs-section {
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

.tab-count {
  background: var(--fana-bg-tertiary);
  color: var(--fana-text-muted);
  padding: var(--fana-space-1) var(--fana-space-2);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  min-width: 20px;
  text-align: center;
}

.tab-btn.active .tab-count {
  background: var(--fana-primary);
  color: white;
}

.tab-content {
  padding: var(--fana-space-8);
}

/* Courses Header */
.courses-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-8);
}

.courses-header h2 {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin: 0;
}

.courses-filters {
  display: flex;
  gap: var(--fana-space-3);
}

.filter-select {
  padding: var(--fana-space-2) var(--fana-space-4);
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

/* Courses Grid */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--fana-space-6);
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

.empty-state h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.empty-state p {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-8);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* Learning Stats */
.learning-stats-section {
  padding: var(--fana-space-16) 0;
  background: var(--fana-bg-secondary);
}

.section-title {
  font-size: var(--fana-text-2xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-8);
  color: var(--fana-text-primary);
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--fana-space-6);
}

.stat-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-xl);
  padding: var(--fana-space-6);
  display: flex;
  align-items: center;
  gap: var(--fana-space-4);
  box-shadow: var(--fana-shadow-sm);
  transition: all var(--fana-transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--fana-shadow-lg);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-number {
  font-size: var(--fana-text-2xl);
  font-weight: 800;
  color: var(--fana-primary);
  margin-bottom: var(--fana-space-1);
}

.stat-label {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--fana-space-4);
  }
  
  .tabs-nav {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .courses-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--fana-space-4);
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .certificates-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>