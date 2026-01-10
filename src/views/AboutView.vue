<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
      </div>
      
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <font-awesome-icon :icon="['fas', 'info-circle']" />
            <span>About Fana Mind</span>
          </div>
          
          <h1 class="hero-title">
            <span class="text-gradient">Revolutionizing</span><br>
            <span class="text-gradient">Education Through</span><br>
            <span class="text-gradient">Innovation</span>
          </h1>
          
          <p class="hero-description">
            We're building the future of online education with cutting-edge AI technology, 
            personalized learning experiences, and a commitment to making quality education 
            accessible to everyone, everywhere.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="mission-vision-section">
      <div class="section-container">
        <div class="content-grid">
          <!-- Mission -->
          <div class="content-card">
            <div class="card-icon">
              <font-awesome-icon :icon="['fas', 'bullseye']" />
            </div>
            <h2 class="card-title">Our Mission</h2>
            <p class="card-description">
              At Fana Mind, we believe that quality education should be accessible to everyone, everywhere. 
              Our mission is to democratize learning by providing an advanced, AI-powered learning management 
              system that adapts to each learner's unique needs and pace.
            </p>
            <p class="card-description">
              We combine the latest in educational technology with proven pedagogical methods to create 
              an engaging, effective, and personalized learning experience.
            </p>
          </div>

          <!-- Vision -->
          <div class="content-card">
            <div class="card-icon">
              <font-awesome-icon :icon="['fas', 'eye']" />
            </div>
            <h2 class="card-title">Our Vision</h2>
            <p class="card-description">
              We envision a world where learning is limitless, where geographical boundaries don't 
              restrict access to quality education, and where technology enhances rather than replaces 
              human connection in the learning process.
            </p>
            <p class="card-description">
              Through continuous innovation and a commitment to excellence, we're building the future 
              of education—one learner at a time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Our Core Values</h2>
          <p class="section-subtitle">The principles that guide everything we do</p>
        </div>
        
        <div class="values-grid">
          <div class="value-card" v-for="value in values" :key="value.id">
            <div class="value-icon" :style="{ background: value.gradient }">
              <font-awesome-icon :icon="value.icon" />
            </div>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-description">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="about-stats-section">
      <div class="section-container">
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in aboutStats" :key="stat.id">
            <div class="stat-icon">
              <font-awesome-icon :icon="stat.icon" />
            </div>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section class="contact-cta-section">
      <div class="cta-background">
        <div class="cta-pattern"></div>
      </div>
      
      <div class="section-container">
        <div class="cta-content">
          <div class="cta-text">
            <h2 class="cta-title">Ready to Get Started?</h2>
            <p class="cta-description">
              Join thousands of learners who are already transforming their careers with Fana Mind. 
              Have questions? We'd love to hear from you!
            </p>
          </div>
          
          <div class="cta-actions">
            <button class="btn-primary-cta" @click="getStarted">
              <font-awesome-icon :icon="['fas', 'rocket']" />
              Get Started Free
            </button>
            <button class="btn-secondary-cta" @click="contactUs">
              <font-awesome-icon :icon="['fas', 'envelope']" />
              Contact Us
            </button>
          </div>
          
          <div class="social-links">
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'github']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
            <a href="#" class="social-link">
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </a>
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

// Values data
const values = ref([
  {
    id: 1,
    title: 'Accessibility',
    description: 'Making quality education accessible to learners of all backgrounds and abilities worldwide.',
    icon: ['fas', 'universal-access'],
    gradient: 'var(--fana-gradient-primary)'
  },
  {
    id: 2,
    title: 'Innovation',
    description: 'Continuously pushing the boundaries of educational technology and pedagogical methodology.',
    icon: ['fas', 'lightbulb'],
    gradient: 'var(--fana-gradient-secondary)'
  },
  {
    id: 3,
    title: 'Community',
    description: 'Building strong learning communities that support, inspire, and empower each other.',
    icon: ['fas', 'users'],
    gradient: 'var(--fana-gradient-warm)'
  },
  {
    id: 4,
    title: 'Excellence',
    description: 'Maintaining the highest standards in educational content, technology, and user experience.',
    icon: ['fas', 'award'],
    gradient: 'var(--fana-gradient-cool)'
  },
  {
    id: 5,
    title: 'Transparency',
    description: 'Operating with complete transparency in our methods, pricing, and educational outcomes.',
    icon: ['fas', 'eye'],
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)'
  },
  {
    id: 6,
    title: 'Empowerment',
    description: 'Empowering learners to take control of their educational journey and achieve their goals.',
    icon: ['fas', 'rocket'],
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)'
  }
]);

// About stats
const aboutStats = ref([
  {
    id: 1,
    number: '2019',
    label: 'Founded',
    icon: ['fas', 'calendar-alt']
  },
  {
    id: 2,
    number: '50K+',
    label: 'Students Served',
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
    number: '25+',
    label: 'Countries Reached',
    icon: ['fas', 'globe']
  }
]);

// Methods
const getStarted = () => {
  router.push('/courses');
};

const contactUs = () => {
  console.log('Opening contact form...');
};
</script>

<style scoped>
/* About Hero Section */
.about-hero {
  position: relative;
  min-height: 80vh;
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
  animation-delay: 0s;
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
  margin-left: auto;
  margin-right: auto;
}

/* Mission & Vision Section */
.mission-vision-section {
  padding: var(--fana-space-24) 0;
  background: var(--fana-bg-primary);
}

.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--fana-space-12);
}

.content-card {
  padding: var(--fana-space-10);
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-2xl);
  box-shadow: var(--fana-shadow-lg);
  transition: all var(--fana-transition-base);
}

.content-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--fana-shadow-2xl);
  border-color: var(--fana-primary);
}

.card-icon {
  width: 80px;
  height: 80px;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  margin-bottom: var(--fana-space-6);
  box-shadow: var(--fana-shadow-colored);
}

.card-title {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.card-description {
  color: var(--fana-text-secondary);
  line-height: 1.7;
  margin-bottom: var(--fana-space-4);
}

.card-description:last-child {
  margin-bottom: 0;
}

/* Values Section */
.values-section {
  padding: var(--fana-space-24) 0;
  background: var(--fana-bg-secondary);
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

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--fana-space-8);
}

.value-card {
  padding: var(--fana-space-8);
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-2xl);
  text-align: center;
  transition: all var(--fana-transition-base);
  box-shadow: var(--fana-shadow-sm);
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--fana-shadow-2xl);
  border-color: var(--fana-primary);
}

.value-icon {
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

.value-title {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.value-description {
  color: var(--fana-text-secondary);
  line-height: 1.6;
}

/* About Stats Section */
.about-stats-section {
  padding: var(--fana-space-20) 0;
  background: var(--fana-bg-primary);
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

.stat-number {
  font-size: var(--fana-text-4xl);
  font-weight: 800;
  color: var(--fana-primary);
  margin-bottom: var(--fana-space-2);
}

.stat-label {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  font-weight: 500;
}

/* Contact CTA Section */
.contact-cta-section {
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
  font-size: var(--fana-text-4xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-6);
  color: white;
}

.cta-description {
  font-size: var(--fana-text-lg);
  color: rgba(255, 255, 255, 0.9);
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

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--fana-space-4);
}

.social-link {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--fana-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all var(--fana-transition-base);
  backdrop-filter: var(--fana-backdrop-blur-sm);
}

.social-link:hover {
  background: white;
  color: var(--fana-primary);
  transform: translateY(-2px);
  text-decoration: none;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: var(--fana-space-8);
  }
  
  .values-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--fana-text-3xl);
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-actions button {
    width: 100%;
    max-width: 300px;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
