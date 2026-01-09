<template>
  <section class="hero-section">
    <!-- Animated Background -->
    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="floating-shapes">
        <div v-for="i in 6" :key="i" class="shape" :style="getShapeStyle(i)"></div>
      </div>
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- Main Content -->
        <div class="hero-text">
          <div class="hero-badge animate-fade-in-up">
            <font-awesome-icon :icon="['fas', 'sparkles']" />
            <span>AI-Powered Learning Platform</span>
          </div>
          
          <h1 class="hero-title animate-fade-in-up stagger-1">
            
            <span class="text-gradient">Transform Your</span>
            <span class="text-gradient">Learning Journey</span>
            with Fana Mind
          </h1>
          
          <p class="hero-description animate-fade-in-up stagger-2">
            Experience the future of education with our cutting-edge AI-powered learning management system. 
            Personalized courses, real-time analytics, and collaborative learning environments designed to 
            accelerate your growth.
          </p>
          
          <div class="hero-stats animate-fade-in-up stagger-3">
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
          
          <div class="hero-actions animate-fade-in-up stagger-4">
            <button class="btn-primary-modern hero-cta" @click="startLearning">
              <font-awesome-icon :icon="['fas', 'rocket']" />
              Start Learning Free
              <div class="btn-shine"></div>
            </button>
            
            <button class="btn-outline-modern" @click="watchDemo">
              <font-awesome-icon :icon="['fas', 'play']" />
              Watch Demo
            </button>
          </div>
          
          <div class="hero-features animate-fade-in-up stagger-5">
            <div class="feature-tag">
              <font-awesome-icon :icon="['fas', 'check']" />
              No Credit Card Required
            </div>
            <div class="feature-tag">
              <font-awesome-icon :icon="['fas', 'check']" />
              14-Day Free Trial
            </div>
            <div class="feature-tag">
              <font-awesome-icon :icon="['fas', 'check']" />
              Cancel Anytime
            </div>
          </div>
        </div>
        
        <!-- Hero Visual -->
        <div class="hero-visual animate-slide-in-right">
          <div class="visual-container">
            <!-- Main Dashboard Preview -->
            <div class="dashboard-preview glass-card">
              <div class="preview-header">
                <div class="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div class="preview-title">Fana Mind Dashboard</div>
              </div>
              
              <div class="preview-content">
                <!-- Progress Chart -->
                <div class="chart-container">
                  <div class="chart-header">
                    <h6>Learning Progress</h6>
                    <span class="progress-percentage">{{ animatedProgress }}%</span>
                  </div>
                  <div class="progress-chart">
                    <svg viewBox="0 0 100 100" class="circular-progress">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="var(--fana-gray-200)" 
                        stroke-width="8"
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="url(#progressGradient)" 
                        stroke-width="8"
                        stroke-linecap="round"
                        :stroke-dasharray="circumference"
                        :stroke-dashoffset="progressOffset"
                        class="progress-circle"
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" style="stop-color:#6366f1"/>
                          <stop offset="100%" style="stop-color:#ec4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                
                <!-- Course Cards -->
                <div class="course-cards">
                  <div 
                    v-for="(course, index) in featuredCourses" 
                    :key="course.id"
                    class="course-card"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                  >
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
            
            <!-- Floating Elements -->
            <div class="floating-elements">
              <div class="floating-card card-1 animate-float">
                <font-awesome-icon :icon="['fas', 'brain']" />
                <span>AI Tutor</span>
              </div>
              
              <div class="floating-card card-2 animate-float stagger-2">
                <font-awesome-icon :icon="['fas', 'users']" />
                <span>Live Collaboration</span>
              </div>
              
              <div class="floating-card card-3 animate-float stagger-3">
                <font-awesome-icon :icon="['fas', 'chart-line']" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="scroll-indicator animate-pulse">
        <div class="scroll-text">Scroll to explore</div>
        <div class="scroll-arrow">
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive data
const animatedProgress = ref(0);
const targetProgress = 87;

const featuredCourses = [
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
];

// Computed properties
const circumference = computed(() => 2 * Math.PI * 45);
const progressOffset = computed(() => {
  return circumference.value - (animatedProgress.value / 100) * circumference.value;
});

// Methods
const animateProgress = () => {
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = targetProgress / steps;
  const stepDuration = duration / steps;
  
  let currentStep = 0;
  const timer = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(timer);
      animatedProgress.value = targetProgress;
      return;
    }
    
    animatedProgress.value = Math.min(increment * currentStep, targetProgress);
    currentStep++;
  }, stepDuration);
};

const getShapeStyle = (index: number) => {
  const shapes = [
    { left: '10%', top: '20%', animationDelay: '0s' },
    { left: '80%', top: '10%', animationDelay: '1s' },
    { left: '15%', top: '70%', animationDelay: '2s' },
    { left: '85%', top: '60%', animationDelay: '0.5s' },
    { left: '50%', top: '15%', animationDelay: '1.5s' },
    { left: '70%', top: '80%', animationDelay: '2.5s' }
  ];
  
  return shapes[index - 1] || {};
};

const startLearning = () => {
  router.push('/courses');
};

const watchDemo = () => {
  // Open demo modal or navigate to demo page
  console.log('Opening demo...');
};

// Intersection Observer for animations
let observer: IntersectionObserver;

onMounted(() => {
  // Start progress animation when component mounts
  setTimeout(animateProgress, 1000);
  
  // Set up intersection observer for scroll-triggered animations
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Observe animated elements
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--fana-bg-primary);
  padding-top: 80px; /* Account for fixed navbar */
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
  opacity: 0.7;
  animation: float 6s ease-in-out infinite;
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
  animation-delay: 2s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
  bottom: -125px;
  left: 30%;
  animation-delay: 4s;
}

.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.shape {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--fana-gradient-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 4s ease-in-out infinite;
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
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: var(--fana-space-12);
    text-align: center;
  }
}

.hero-text {
  max-width: 600px;
  
  @media (max-width: 1024px) {
    max-width: none;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-2) var(--fana-space-4);
  background: rgba(99, 102, 241, 0.1);
  color: var(--fana-primary);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  margin-bottom: var(--fana-space-6);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--fana-space-6);
  color: var(--fana-text-primary);
}

.hero-description {
  font-size: var(--fana-text-lg);
  color: var(--fana-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--fana-space-8);
}

.hero-stats {
  display: flex;
  gap: var(--fana-space-8);
  margin-bottom: var(--fana-space-8);
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: var(--fana-space-4);
  }
}

.stat-item {
  text-align: center;
  
  @media (max-width: 1024px) {
    text-align: center;
  }
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
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.hero-cta {
  position: relative;
  overflow: hidden;
  font-size: var(--fana-text-lg);
  padding: var(--fana-space-4) var(--fana-space-8);
  
  .btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shine 3s infinite;
  }
}

@keyframes shine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

.hero-features {
  display: flex;
  gap: var(--fana-space-6);
  flex-wrap: wrap;
  
  @media (max-width: 1024px) {
    justify-content: center;
  }
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  font-weight: 500;
  
  svg {
    color: var(--fana-accent-green);
  }
}

.hero-visual {
  position: relative;
  
  @media (max-width: 1024px) {
    order: -1;
  }
}

.visual-container {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.dashboard-preview {
  padding: var(--fana-space-6);
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  animation: float 6s ease-in-out infinite;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--fana-space-6);
  padding-bottom: var(--fana-space-4);
  border-bottom: 1px solid var(--fana-border-color);
}

.preview-dots {
  display: flex;
  gap: var(--fana-space-2);
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--fana-gray-300);
    
    &:nth-child(1) { background: #ff5f57; }
    &:nth-child(2) { background: #ffbd2e; }
    &:nth-child(3) { background: #28ca42; }
  }
}

.preview-title {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-secondary);
}

.chart-container {
  margin-bottom: var(--fana-space-6);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-4);
  
  h6 {
    margin: 0;
    font-size: var(--fana-text-base);
    font-weight: 600;
  }
}

.progress-percentage {
  font-size: var(--fana-text-xl);
  font-weight: 800;
  color: var(--fana-primary);
}

.progress-chart {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.circular-progress {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle {
  transition: stroke-dashoffset 0.5s ease;
}

.course-cards {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
}

.course-card {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-3);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-lg);
  animation: slideInRight 0.6s ease-out;
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

.course-info {
  h6 {
    margin: 0 0 var(--fana-space-1) 0;
    font-size: var(--fana-text-sm);
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: var(--fana-text-xs);
    color: var(--fana-text-muted);
  }
}

.floating-elements {
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
  backdrop-filter: var(--fana-backdrop-blur-sm);
}

.card-1 {
  top: 20%;
  right: -20%;
  color: var(--fana-primary);
}

.card-2 {
  top: 60%;
  left: -25%;
  color: var(--fana-accent-green);
}

.card-3 {
  bottom: 20%;
  right: -15%;
  color: var(--fana-secondary);
}

.scroll-indicator {
  position: absolute;
  bottom: var(--fana-space-8);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--fana-text-muted);
  
  @media (max-width: 1024px) {
    display: none;
  }
}

.scroll-text {
  font-size: var(--fana-text-sm);
  margin-bottom: var(--fana-space-2);
}

.scroll-arrow {
  font-size: var(--fana-text-lg);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// Dark mode adjustments
[data-theme="dark"] {
  .hero-badge {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.3);
  }
  
  .dashboard-preview {
    background: rgba(30, 41, 59, 0.8);
    border-color: var(--fana-gray-700);
  }
  
  .floating-card {
    background: rgba(30, 41, 59, 0.9);
    border-color: var(--fana-gray-700);
  }
}
</style>