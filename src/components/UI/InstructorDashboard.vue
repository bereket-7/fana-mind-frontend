<template>
  <div class="instructor-dashboard">
    <!-- Header Section -->
    <div class="dashboard-header mb-4">
      <div class="row align-items-center">
        <div class="col-md-8">
          <h2 class="mb-1">Welcome back, {{ user?.firstName }}!</h2>
          <p class="text-muted mb-0">Here's what's happening with your courses today.</p>
        </div>
        <div class="col-md-4 text-md-end">
          <BButton variant="primary" @click="$router.push('/courses/create')">
            <font-awesome-icon :icon="['fas', 'plus']" class="me-2" />
            Create New Course
          </BButton>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="row mb-4">
      <div class="col-md-3 col-sm-6 mb-3">
        <BCard class="stat-card h-100">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-primary text-white rounded-circle me-3">
              <font-awesome-icon :icon="['fas', 'book']" />
            </div>
            <div>
              <h3 class="mb-0">{{ dashboardData?.totalCourses || 0 }}</h3>
              <small class="text-muted">Total Courses</small>
            </div>
          </div>
        </BCard>
      </div>
      
      <div class="col-md-3 col-sm-6 mb-3">
        <BCard class="stat-card h-100">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-success text-white rounded-circle me-3">
              <font-awesome-icon :icon="['fas', 'users']" />
            </div>
            <div>
              <h3 class="mb-0">{{ dashboardData?.totalStudents || 0 }}</h3>
              <small class="text-muted">Total Students</small>
            </div>
          </div>
        </BCard>
      </div>
      
      <div class="col-md-3 col-sm-6 mb-3">
        <BCard class="stat-card h-100">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-warning text-white rounded-circle me-3">
              <font-awesome-icon :icon="['fas', 'star']" />
            </div>
            <div>
              <h3 class="mb-0">{{ dashboardData?.averageRating?.toFixed(1) || '0.0' }}</h3>
              <small class="text-muted">Average Rating</small>
            </div>
          </div>
        </BCard>
      </div>
      
      <div class="col-md-3 col-sm-6 mb-3">
        <BCard class="stat-card h-100">
          <div class="d-flex align-items-center">
            <div class="stat-icon bg-info text-white rounded-circle me-3">
              <font-awesome-icon :icon="['fas', 'dollar-sign']" />
            </div>
            <div>
              <h3 class="mb-0">${{ dashboardData?.totalRevenue?.toLocaleString() || '0' }}</h3>
              <small class="text-muted">Total Revenue</small>
            </div>
          </div>
        </BCard>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="row mb-4">
      <div class="col-lg-8 mb-3">
        <BCard>
          <BCardHeader>
            <h5 class="mb-0">Enrollment Trends</h5>
          </BCardHeader>
          <BCardBody>
            <EnrollmentChart :data="dashboardData?.enrollmentTrends" />
          </BCardBody>
        </BCard>
      </div>
      
      <div class="col-lg-4 mb-3">
        <BCard>
          <BCardHeader>
            <h5 class="mb-0">Course Performance</h5>
          </BCardHeader>
          <BCardBody>
            <CoursePerformanceChart :data="dashboardData?.coursePerformance" />
          </BCardBody>
        </BCard>
      </div>
    </div>

    <!-- Recent Activity & Course Management -->
    <div class="row">
      <div class="col-lg-6 mb-3">
        <BCard>
          <BCardHeader class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Recent Students</h5>
            <BButton variant="outline-primary" size="sm" @click="$router.push('/students')">
              View All
            </BButton>
          </BCardHeader>
          <BCardBody class="p-0">
            <div v-if="recentStudents.length === 0" class="text-center p-4 text-muted">
              <font-awesome-icon :icon="['fas', 'user-graduate']" class="fs-1 mb-2" />
              <p class="mb-0">No recent enrollments</p>
            </div>
            
            <div v-else class="list-group list-group-flush">
              <div 
                v-for="student in recentStudents.slice(0, 5)" 
                :key="student.id"
                class="list-group-item d-flex align-items-center"
              >
                <BAvatar 
                  :src="student.avatar" 
                  :text="student.name.charAt(0)"
                  size="sm" 
                  class="me-3"
                />
                <div class="flex-grow-1">
                  <h6 class="mb-0">{{ student.name }}</h6>
                  <small class="text-muted">{{ student.course }}</small>
                </div>
                <small class="text-muted">{{ formatTimeAgo(student.enrolledAt) }}</small>
              </div>
            </div>
          </BCardBody>
        </BCard>
      </div>

      <div class="col-lg-6 mb-3">
        <BCard>
          <BCardHeader class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Course Performance Overview</h5>
            <BDropdown variant="outline-secondary" size="sm" text="Filter">
              <BDropdownItem @click="filterPeriod = '7d'">Last 7 days</BDropdownItem>
              <BDropdownItem @click="filterPeriod = '30d'">Last 30 days</BDropdownItem>
              <BDropdownItem @click="filterPeriod = '90d'">Last 90 days</BDropdownItem>
            </BDropdown>
          </BCardHeader>
          <BCardBody class="p-0">
            <div v-if="coursePerformance.length === 0" class="text-center p-4 text-muted">
              <font-awesome-icon :icon="['fas', 'chart-line']" class="fs-1 mb-2" />
              <p class="mb-0">No performance data available</p>
            </div>
            
            <div v-else class="list-group list-group-flush">
              <div 
                v-for="course in coursePerformance.slice(0, 5)" 
                :key="course.courseId"
                class="list-group-item"
              >
                <div class="d-flex justify-content-between align-items-start">
                  <div class="flex-grow-1">
                    <h6 class="mb-1">{{ course.courseName }}</h6>
                    <div class="d-flex align-items-center mb-1">
                      <small class="text-muted me-3">
                        <font-awesome-icon :icon="['fas', 'users']" class="me-1" />
                        {{ course.enrollmentCount }} students
                      </small>
                      <small class="text-muted">
                        <font-awesome-icon :icon="['fas', 'percentage']" class="me-1" />
                        {{ course.completionRate }}% completion
                      </small>
                    </div>
                    <BProgress :value="course.completionRate" variant="success" height="4px" />
                  </div>
                  <div class="text-end ms-3">
                    <div class="d-flex align-items-center">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-warning me-1" />
                      <span class="fw-bold">{{ course.averageRating.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BCardBody>
        </BCard>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row">
      <div class="col-12">
        <BCard>
          <BCardHeader>
            <h5 class="mb-0">Quick Actions</h5>
          </BCardHeader>
          <BCardBody>
            <div class="row">
              <div class="col-md-3 col-sm-6 mb-3">
                <BButton 
                  variant="outline-primary" 
                  class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                  @click="$router.push('/courses/create')"
                >
                  <font-awesome-icon :icon="['fas', 'plus-circle']" class="fs-2 mb-2" />
                  <span>Create Course</span>
                </BButton>
              </div>
              
              <div class="col-md-3 col-sm-6 mb-3">
                <BButton 
                  variant="outline-success" 
                  class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                  @click="$router.push('/analytics')"
                >
                  <font-awesome-icon :icon="['fas', 'chart-bar']" class="fs-2 mb-2" />
                  <span>View Analytics</span>
                </BButton>
              </div>
              
              <div class="col-md-3 col-sm-6 mb-3">
                <BButton 
                  variant="outline-info" 
                  class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                  @click="$router.push('/students')"
                >
                  <font-awesome-icon :icon="['fas', 'users']" class="fs-2 mb-2" />
                  <span>Manage Students</span>
                </BButton>
              </div>
              
              <div class="col-md-3 col-sm-6 mb-3">
                <BButton 
                  variant="outline-warning" 
                  class="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3"
                  @click="$router.push('/reports')"
                >
                  <font-awesome-icon :icon="['fas', 'file-alt']" class="fs-2 mb-2" />
                  <span>Generate Reports</span>
                </BButton>
              </div>
            </div>
          </BCardBody>
        </BCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/modules/auth';
import { useAnalyticsStore } from '@/store/modules/analytics';
import EnrollmentChart from '@/components/Charts/EnrollmentChart.vue';
import CoursePerformanceChart from '@/components/Charts/CoursePerformanceChart.vue';

const authStore = useAuthStore();
const analyticsStore = useAnalyticsStore();

// Reactive data
const filterPeriod = ref('30d');
const dashboardData = ref(null);
const recentStudents = ref([]);
const coursePerformance = ref([]);

// Computed properties
const user = computed(() => authStore.user);

// Methods
const fetchDashboardData = async () => {
  try {
    dashboardData.value = await analyticsStore.getDashboardData('instructor');
    
    // Mock data for demonstration
    recentStudents.value = [
      { id: 1, name: 'Alice Johnson', course: 'Advanced React', avatar: '', enrolledAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { id: 2, name: 'Bob Smith', course: 'Node.js Fundamentals', avatar: '', enrolledAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { id: 3, name: 'Carol Davis', course: 'Vue.js Mastery', avatar: '', enrolledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { id: 4, name: 'David Wilson', course: 'Python for Beginners', avatar: '', enrolledAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { id: 5, name: 'Eva Brown', course: 'JavaScript Essentials', avatar: '', enrolledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
    ];

    coursePerformance.value = [
      { courseId: 1, courseName: 'Advanced React', enrollmentCount: 245, completionRate: 78, averageRating: 4.6 },
      { courseId: 2, courseName: 'Node.js Fundamentals', enrollmentCount: 189, completionRate: 82, averageRating: 4.4 },
      { courseId: 3, courseName: 'Vue.js Mastery', enrollmentCount: 156, completionRate: 75, averageRating: 4.7 },
      { courseId: 4, courseName: 'Python for Beginners', enrollmentCount: 298, completionRate: 85, averageRating: 4.5 },
      { courseId: 5, courseName: 'JavaScript Essentials', enrollmentCount: 412, completionRate: 79, averageRating: 4.3 }
    ];

    // Mock dashboard data
    if (!dashboardData.value) {
      dashboardData.value = {
        totalCourses: 12,
        totalStudents: 1247,
        averageRating: 4.5,
        totalRevenue: 45680,
        enrollmentTrends: generateMockTrendData(),
        coursePerformance: generateMockPerformanceData()
      };
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
  }
};

const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const generateMockTrendData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      enrollments: Math.floor(Math.random() * 20) + 5
    });
  }
  return data;
};

const generateMockPerformanceData = () => {
  return [
    { course: 'React', completion: 78, rating: 4.6 },
    { course: 'Node.js', completion: 82, rating: 4.4 },
    { course: 'Vue.js', completion: 75, rating: 4.7 },
    { course: 'Python', completion: 85, rating: 4.5 }
  ];
};

onMounted(() => {
  fetchDashboardData();
});
</script>

<style scoped>
.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
}

.stat-card {
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.list-group-item {
  border-left: none;
  border-right: none;
  padding: 1rem;
}

.list-group-item:first-child {
  border-top: none;
}

.list-group-item:last-child {
  border-bottom: none;
}

.quick-action-btn {
  min-height: 120px;
  border: 2px dashed #dee2e6;
  transition: all 0.2s ease;
}

.quick-action-btn:hover {
  border-color: #007bff;
  background-color: #f8f9fa;
}
</style>
  