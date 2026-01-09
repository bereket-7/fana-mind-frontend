<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section bg-gradient-primary text-white py-5 mb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-3">Welcome to Fana Mind</h1>
            <p class="lead mb-4">
              Transform your learning journey with our advanced AI-powered learning management system.
              Create, learn, and grow with cutting-edge educational technology.
            </p>
            <div class="d-flex gap-3">
              <BButton variant="light" size="lg" @click="$router.push('/courses')">
                <font-awesome-icon :icon="['fas', 'book']" class="me-2" />
                Browse Courses
              </BButton>
              <BButton variant="outline-light" size="lg" @click="$router.push('/dashboard')">
                <font-awesome-icon :icon="['fas', 'tachometer-alt']" class="me-2" />
                Dashboard
              </BButton>
            </div>
          </div>
          <div class="col-lg-6 text-center">
            <font-awesome-icon :icon="['fas', 'graduation-cap']" class="hero-icon" />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="display-5 fw-bold mb-3">Why Choose Fana Mind?</h2>
            <p class="lead text-muted">Experience the future of online learning</p>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-4">
            <BCard class="feature-card h-100 text-center border-0 shadow-sm">
              <BCardBody class="p-4">
                <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3">
                  <font-awesome-icon :icon="['fas', 'brain']" />
                </div>
                <h5 class="fw-bold mb-3">AI-Powered Learning</h5>
                <p class="text-muted">
                  Personalized learning paths powered by artificial intelligence to optimize your educational journey.
                </p>
              </BCardBody>
            </BCard>
          </div>
          
          <div class="col-md-4">
            <BCard class="feature-card h-100 text-center border-0 shadow-sm">
              <BCardBody class="p-4">
                <div class="feature-icon bg-success text-white rounded-circle mx-auto mb-3">
                  <font-awesome-icon :icon="['fas', 'chart-line']" />
                </div>
                <h5 class="fw-bold mb-3">Advanced Analytics</h5>
                <p class="text-muted">
                  Track your progress with detailed analytics and insights to improve your learning outcomes.
                </p>
              </BCardBody>
            </BCard>
          </div>
          
          <div class="col-md-4">
            <BCard class="feature-card h-100 text-center border-0 shadow-sm">
              <BCardBody class="p-4">
                <div class="feature-icon bg-info text-white rounded-circle mx-auto mb-3">
                  <font-awesome-icon :icon="['fas', 'users']" />
                </div>
                <h5 class="fw-bold mb-3">Collaborative Learning</h5>
                <p class="text-muted">
                  Connect with peers and instructors in real-time collaborative learning environments.
                </p>
              </BCardBody>
            </BCard>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section bg-light py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="stat-item">
              <h3 class="display-4 fw-bold text-primary mb-2">{{ stats.courses }}+</h3>
              <p class="text-muted mb-0">Courses Available</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="stat-item">
              <h3 class="display-4 fw-bold text-success mb-2">{{ stats.students }}+</h3>
              <p class="text-muted mb-0">Active Students</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="stat-item">
              <h3 class="display-4 fw-bold text-warning mb-2">{{ stats.instructors }}+</h3>
              <p class="text-muted mb-0">Expert Instructors</p>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="stat-item">
              <h3 class="display-4 fw-bold text-info mb-2">{{ stats.completionRate }}%</h3>
              <p class="text-muted mb-0">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-5">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h2 class="display-5 fw-bold mb-3">Ready to Start Learning?</h2>
            <p class="lead text-muted mb-4">
              Join thousands of learners who are already transforming their careers with Fana Mind.
            </p>
            <BButton variant="primary" size="lg" class="me-3">
              <font-awesome-icon :icon="['fas', 'rocket']" class="me-2" />
              Get Started Free
            </BButton>
            <BButton variant="outline-primary" size="lg">
              <font-awesome-icon :icon="['fas', 'play']" class="me-2" />
              Watch Demo
            </BButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Reactive data
const stats = ref({
  courses: 150,
  students: 5000,
  instructors: 200,
  completionRate: 94
});

// Animate numbers on mount
onMounted(() => {
  // You can add number animation logic here
});
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0 0 2rem 2rem;
}

.hero-icon {
  font-size: 8rem;
  opacity: 0.8;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15) !important;
}

.feature-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.stat-item {
  padding: 1rem;
}

.cta-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

@media (max-width: 768px) {
  .hero-icon {
    font-size: 4rem;
    margin-top: 2rem;
  }
  
  .display-4 {
    font-size: 2.5rem;
  }
}
</style>
