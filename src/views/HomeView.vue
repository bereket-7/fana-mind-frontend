<template>
  <div class="home">
    <!-- Hero Section with Better Contrast -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
      </div>
      
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <!-- Hero Badge -->
            <div class="hero-badge">
              <font-awesome-icon :icon="['fas', 'sparkles']" />
              <span>AI-Powered Learning Platform</span>
            </div>
            
            <!-- Main Heading -->
            <h1 class="hero-title">
              <span class="text-gradient">Transform Your</span><br>
              <span class="text-gradient">Learning Journey</span><br>
              <span class="text-gradient">with Fana Mind</span><br>
            </h1>
            
            <!-- Description -->
            <p class="hero-description">
              Experience the future of education with our cutting-edge AI-powered learning management system. 
              Personalized courses, real-time analytics, and collaborative learning environments designed to 
              accelerate your growth.
            </p>
            
            <!-- Stats -->
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">50K+</div>
                <div class="stat-label">Active Learners</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">Expert Courses</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">Success Rate</div>
              </div>
            </div>
            
            <!-- CTA Buttons -->
            <div class="hero-actions">
              <button class="btn-primary-hero" @click="startLearning">
                <font-awesome-icon :icon="['fas', 'rocket']" />
                Start Learning Free
                <div class="btn-shine"></div>
              </button>
              
              <button class="btn-secondary-hero" @click="watchDemo">
                <font-awesome-icon :icon="['fas', 'play']" />
                Watch Demo
              </button>
            </div>
            
            <!-- Trust Indicators -->
            <div class="trust-indicators">
              <div class="trust-item">
                <font-awesome-icon :icon="['fas', 'check-circle']" />
                <span>No Credit Card Required</span>
              </div>
              <div class="trust-item">
                <font-awesome-icon :icon="['fas', 'check-circle']" />
                <span>14-Day Free Trial</span>
              </div>
              <div class="trust-item">
                <font-awesome-icon :icon="['fas', 'check-circle']" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
          
          <!-- Hero Visual -->
          <div class="hero-visual">
            <div class="dashboard-mockup">
              <div class="mockup-header">
                <div class="mockup-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="mockup-title">Fana Mind Dashboard</div>
              </div>
              
              <div class="mockup-content">
                <div class="progress-section">
                  <h6>Learning Progress</h6>
                  <div class="progress-circle">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--fana-gray-200)" stroke-width="8"/>
                      <circle cx="50" cy="50" r="45" fill="none" stroke="url(#progressGradient)" stroke-width="8" 
                              stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="70" class="progress-bar"/>
                      <defs>
                        <linearGradient id="progressGradient">
                          <stop offset="0%" stop-color="var(--fana-primary)"/>
                          <stop offset="100%" stop-color="var(--fana-secondary)"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div class="progress-text">75%</div>
                  </div>
                </div>
                
                <div class="courses-section">
                  <div class="course-item" v-for="course in mockCourses" :key="course.id">
                    <div class="course-icon" :style="{ background: course.color }">
                      <font-awesome-icon :icon="course.icon" />
                    </div>
                    <div class="course-info">
                      <h6>{{ course.title }}</h6>
                      <p>{{ course.progress }}% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Floating Cards -->
            <div class="floating-cards">
              <div class="floating-card card-1">
                <font-awesome-icon :icon="['fas', 'brain']" />
                <span>AI Tutor</span>
              </div>
              <div class="floating-card card-2">
                <font-awesome-icon :icon="['fas', 'users']" />
                <span>Live Collaboration</span>
              </div>
              <div class="floating-card card-3">
                <font-awesome-icon :icon="['fas', 'chart-line']" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Why Choose Fana Mind?</h2>
          <p class="section-subtitle">Experience the future of online learning with cutting-edge features</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon" :style="{ background: feature.gradient }">
              <font-awesome-icon :icon="feature.icon" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="section-container">
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.id">
            <div class="stat-icon">
              <font-awesome-icon :icon="stat.icon" />
            </div>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section with High Contrast -->
    <section class="cta-section">
      <div class="cta-background">
        <div class="cta-pattern"></div>
      </div>
      
      <div class="section-container">
        <div class="cta-content">
          <div class="cta-text">
            <h2 class="cta-title">Ready to Start Learning?</h2>
            <p class="cta-description">
              Join thousands of learners who are already transforming their careers with Fana Mind. 
              Start your journey today with our comprehensive learning platform.
            </p>
          </div>
          
          <div class="cta-actions">
            <button class="btn-secondary-cta" @click="getStarted">
              <font-awesome-icon :icon="['fas', 'rocket']" />
              Get Started Free
            </button>
            <button class="btn-secondary-cta" @click="learnMore">
              <font-awesome-icon :icon="['fas', 'info-circle']" />
              Learn More
            </button>
          </div>
          
          <div class="cta-features">
            <div class="cta-feature">
              <font-awesome-icon :icon="['fas', 'shield-alt']" />
              <span>Secure & Private</span>
            </div>
            <div class="cta-feature">
              <font-awesome-icon :icon="['fas', 'clock']" />
              <span>24/7 Support</span>
            </div>
            <div class="cta-feature">
              <font-awesome-icon :icon="['fas', 'award']" />
              <span>Certified Courses</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Mock data
const mockCourses = ref([
  {
    id: 1,
    title: 'React Mastery',
    progress: 75,
    icon: ['fab', 'react'],
    color: 'linear-gradient(135deg, #61dafb, #21759b)'
  },
  {
    id: 2,
    title: 'AI Fundamentals',
    progress: 60,
    icon: ['fas', 'robot'],
    color: 'linear-gradient(135deg, #ff6b6b, #ee5a24)'
  },
  {
    id: 3,
    title: 'Data Science',
    progress: 90,
    icon: ['fas', 'chart-bar'],
    color: 'linear-gradient(135deg, #4ecdc4, #44a08d)'
  }
]);

const features = ref([
  {
    id: 1,
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths powered by artificial intelligence to optimize your educational journey.',
    icon: ['fas', 'brain'],
    gradient: 'var(--fana-gradient-primary)'
  },
  {
    id: 2,
    title: 'Advanced Analytics',
    description: 'Track your progress with detailed analytics and insights to improve your learning outcomes.',
    icon: ['fas', 'chart-line'],
    gradient: 'var(--fana-gradient-secondary)'
  },
  {
    id: 3,
    title: 'Collaborative Learning',
    description: 'Connect with peers and instructors in real-time collaborative learning environments.',
    icon: ['fas', 'users'],
    gradient: 'var(--fana-gradient-warm)'
  },
  {
    id: 4,
    title: 'Interactive Content',
    description: 'Engage with interactive lessons, quizzes, and hands-on projects for better retention.',
    icon: ['fas', 'play-circle'],
    gradient: 'var(--fana-gradient-cool)'
  },
  {
    id: 5,
    title: 'Mobile Learning',
    description: 'Learn anywhere, anytime with our responsive design and mobile-first approach.',
    icon: ['fas', 'mobile-alt'],
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 6,
    title: 'Certification',
    description: 'Earn industry-recognized certificates upon successful completion of courses.',
    icon: ['fas', 'certificate'],
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  }
]);

const stats = ref([
  {
    id: 1,
    number: '150+',
    label: 'Courses Available',
    icon: ['fas', 'book']
  },
  {
    id: 2,
    number: '50K+',
    label: 'Active Students',
    icon: ['fas', 'user-graduate']
  },
  {
    id: 3,
    number: '200+',
    label: 'Expert Instructors',
    icon: ['fas', 'chalkboard-teacher']
  },
  {
    id: 4,
    number: '94%',
    label: 'Completion Rate',
    icon: ['fas', 'trophy']
  }
]);

// Methods
const startLearning = () => {
  router.push('/courses');
};

const watchDemo = () => {
  console.log('Opening demo...');
};

const getStarted = () => {
  router.push('/courses');
};

const learnMore = () => {
  router.push('/about');
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
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
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
  top: 50%;
  right: -150px;
  animation-delay: 3s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
  bottom: -125px;
  left: 30%;
  animation-delay: 6s;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--fana-space-16);
  align-items: center;
  min-height: 80vh;
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
  backdrop-filter: var(--fana-backdrop-blur-sm);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
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
}

.hero-stats {
  display: flex;
  gap: var(--fana-space-8);
  margin-bottom: var(--fana-space-8);
}

.stat-item {
  text-align: left;
}

.stat-number {
  font-size: var(--fana-text-2xl);
  font-weight: 800;
  color: var(--fana-primary);
  margin-bottom: var(--fana-space-1);
}

.stat-label {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-muted);
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: var(--fana-space-4);
  margin-bottom: var(--fana-space-8);
}

.btn-primary-hero {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-4) var(--fana-space-8);
  background: var(--fana-gradient-primary);
  color: white;
  border: none;
  border-radius: var(--fana-radius-xl);
  font-weight: 600;
  font-size: var(--fana-text-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  box-shadow: var(--fana-shadow-lg);
  position: relative;
  overflow: hidden;
}

.btn-primary-hero:hover {
  transform: translateY(-3px);
  box-shadow: var(--fana-shadow-2xl);
}

.btn-secondary-hero {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-4) var(--fana-space-8);
  background: var(--fana-bg-card);
  color: var(--fana-text-primary);
  border: 2px solid var(--fana-border-color);
  border-radius: var(--fana-radius-xl);
  font-weight: 600;
  font-size: var(--fana-text-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  backdrop-filter: var(--fana-backdrop-blur-sm);
}

.btn-secondary-hero:hover {
  border-color: var(--fana-primary);
  color: var(--fana-primary);
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

.trust-indicators {
  display: flex;
  gap: var(--fana-space-6);
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  font-weight: 500;
}

.trust-item svg {
  color: var(--fana-secondary);
}

/* Hero Visual */
.hero-visual {
  position: relative;
}

.dashboard-mockup {
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-2xl);
  padding: var(--fana-space-6);
  box-shadow: var(--fana-shadow-2xl);
  backdrop-filter: var(--fana-backdrop-blur);
}

.mockup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-6);
  padding-bottom: var(--fana-space-4);
  border-bottom: 1px solid var(--fana-border-color);
}

.mockup-dots {
  display: flex;
  gap: var(--fana-space-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.mockup-title {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-secondary);
}

.progress-section {
  text-align: center;
  margin-bottom: var(--fana-space-6);
}

.progress-circle {
  position: relative;
  width: 120px;
  height: 120px;
  margin: var(--fana-space-4) auto;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bar {
  transition: stroke-dashoffset 1s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--fana-text-xl);
  font-weight: 800;
  color: var(--fana-primary);
}

.courses-section {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
}

.course-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-3);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
}

.course-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--fana-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
}

.course-info h6 {
  margin: 0 0 var(--fana-space-1) 0;
  font-size: var(--fana-text-sm);
  font-weight: 600;
}

.course-info p {
  margin: 0;
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.floating-cards {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  box-shadow: var(--fana-shadow-lg);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
  backdrop-filter: var(--fana-backdrop-blur);
  animation: floatCard 6s ease-in-out infinite;
}

.card-1 {
  top: 20%;
  right: -20%;
  animation-delay: 0s;
}

.card-2 {
  top: 60%;
  left: -25%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  right: -15%;
  animation-delay: 4s;
}

@keyframes floatCard {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Features Section */
.features-section {
  padding: var(--fana-space-24) 0;
  background: var(--fana-bg-primary);
}

.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
}

.section-header {
  text-align: center;
  margin-bottom: var(--fana-space-16);
}

.section-title {
  font-size: var(--fana-text-4xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.section-subtitle {
  font-size: var(--fana-text-lg);
  color: var(--fana-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

.feature-card {
  padding: var(--fana-space-8);
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-2xl);
  text-align: center;
  transition: all var(--fana-transition-base);
  box-shadow: var(--fana-shadow-sm);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--fana-shadow-2xl);
  border-color: var(--fana-primary);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: var(--fana-radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--fana-space-6);
  color: white;
  font-size: 2rem;
}

.feature-title {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.feature-description {
  color: var(--fana-text-secondary);
  line-height: 1.6;
}

/* Stats Section */
.stats-section {
  padding: var(--fana-space-20) 0;
  background: var(--fana-bg-secondary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--fana-space-8);
}

.stat-card {
  text-align: center;
  padding: var(--fana-space-8);
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
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
  margin: 0 auto var(--fana-space-4);
  color: white;
  font-size: 1.5rem;
}

.stat-card .stat-number {
  font-size: var(--fana-text-4xl);
  font-weight: 800;
  color: var(--fana-primary);
  margin-bottom: var(--fana-space-2);
}

.stat-card .stat-label {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  font-weight: 500;
}

/* CTA Section with High Contrast */
.cta-section {
  position: relative;
  padding: var(--fana-space-24) 0;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.cta-pattern {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%);
}

.cta-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: var(--fana-text-5xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-6);
  color: white;
}

.cta-description {
  font-size: var(--fana-text-lg);
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: var(--fana-space-10);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: var(--fana-space-4);
  margin-bottom: var(--fana-space-10);
}

.btn-primary-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-4) var(--fana-space-8);
  background: white;
  color: var(--fana-text-primary);
  border: none;
  border-radius: var(--fana-radius-xl);
  font-weight: 600;
  font-size: var(--fana-text-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  box-shadow: var(--fana-shadow-lg);
}

.btn-primary-cta:hover {
  transform: translateY(-3px);
  box-shadow: var(--fana-shadow-2xl);
  background: var(--fana-gray-50);
}

.btn-secondary-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-4) var(--fana-space-8);
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--fana-radius-xl);
  font-weight: 600;
  font-size: var(--fana-text-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  backdrop-filter: var(--fana-backdrop-blur-sm);
}

.btn-secondary-cta:hover {
  border-color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.cta-features {
  display: flex;
  justify-content: center;
  gap: var(--fana-space-8);
  flex-wrap: wrap;
}

.cta-feature {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.cta-feature svg {
  color: var(--fana-secondary);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: var(--fana-space-12);
    text-align: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions button {
    width: 100%;
    max-width: 300px;
  }
  
  .trust-indicators {
    justify-content: center;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-actions button {
    width: 100%;
    max-width: 300px;
  }
  
  .cta-features {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 640px) {
  .hero-stats {
    flex-direction: column;
    gap: var(--fana-space-4);
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
