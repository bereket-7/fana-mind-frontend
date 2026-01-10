<template>
  <div id="app">
    <!-- Modern Glass Navbar -->
    <nav class="modern-navbar">
      <div class="navbar-container">
        <!-- Brand Logo -->
        <router-link to="/" class="navbar-brand">
          <div class="brand-icon">
            <font-awesome-icon :icon="['fas', 'graduation-cap']" />
          </div>
          <span class="brand-text">Fana Mind</span>
        </router-link>
        
        <!-- Navigation Links -->
        <div class="navbar-nav">
          <router-link to="/" class="nav-link">
            <font-awesome-icon :icon="['fas', 'home']" />
            <span>Home</span>
          </router-link>
          <router-link to="/courses" class="nav-link">
            <font-awesome-icon :icon="['fas', 'book']" />
            <span>Courses</span>
          </router-link>
          <router-link to="/about" class="nav-link">
            <font-awesome-icon :icon="['fas', 'info-circle']" />
            <span>About</span>
          </router-link>
          <router-link to="/dashboard" class="nav-link">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            <span>Dashboard</span>
          </router-link>
        </div>

        <!-- Action Buttons -->
        <div class="navbar-actions">
          <button class="btn-secondary-modern">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
            <span>Login</span>
          </button>
          <button class="btn-primary-modern">
            <font-awesome-icon :icon="['fas', 'rocket']" />
            <span>Get Started</span>
          </button>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" :class="{ 'active': showMobileMenu }">
        <div class="mobile-nav-links">
          <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">
            <font-awesome-icon :icon="['fas', 'home']" />
            <span>Home</span>
          </router-link>
          <router-link to="/courses" class="mobile-nav-link" @click="closeMobileMenu">
            <font-awesome-icon :icon="['fas', 'book']" />
            <span>Courses</span>
          </router-link>
          <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">
            <font-awesome-icon :icon="['fas', 'info-circle']" />
            <span>About</span>
          </router-link>
          <router-link to="/dashboard" class="mobile-nav-link" @click="closeMobileMenu">
            <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
            <span>Dashboard</span>
          </router-link>
        </div>
        <div class="mobile-actions">
          <button class="btn-secondary-modern w-100 mb-3">
            <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
            <span>Login</span>
          </button>
          <button class="btn-primary-modern w-100">
            <font-awesome-icon :icon="['fas', 'rocket']" />
            <span>Get Started</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Modern Footer -->
    <footer class="modern-footer">
      <div class="footer-container">
        <div class="footer-content">
          <!-- Brand Section -->
          <div class="footer-brand">
            <div class="brand-logo">
              <div class="brand-icon">
                <font-awesome-icon :icon="['fas', 'graduation-cap']" />
              </div>
              <span class="brand-text">Fana Mind</span>
            </div>
            <p class="brand-description">
              Empowering learners worldwide with AI-driven education technology.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">
                <font-awesome-icon :icon="['fab', 'twitter']" />
              </a>
              <a href="#" class="social-link">
                <font-awesome-icon :icon="['fab', 'linkedin']" />
              </a>
              <a href="#" class="social-link">
                <font-awesome-icon :icon="['fab', 'github']" />
              </a>
              <a href="#" class="social-link">
                <font-awesome-icon :icon="['fab', 'youtube']" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h6 class="footer-title">Platform</h6>
            <ul class="footer-links">
              <li><router-link to="/courses">Browse Courses</router-link></li>
              <li><router-link to="/pricing">Pricing</router-link></li>
              <li><router-link to="/features">Features</router-link></li>
              <li><router-link to="/enterprise">Enterprise</router-link></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="footer-section">
            <h6 class="footer-title">Support</h6>
            <ul class="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div class="footer-section">
            <h6 class="footer-title">Company</h6>
            <ul class="footer-links">
              <li><router-link to="/about">About Us</router-link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p>&copy; 2024 Fana Mind. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button 
      v-if="showScrollTop" 
      @click="scrollToTop" 
      class="scroll-to-top-btn"
    >
      <font-awesome-icon :icon="['fas', 'arrow-up']" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive state
const showMobileMenu = ref(false);
const showScrollTop = ref(false);

// Methods
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: var(--fana-font-family-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--fana-bg-primary);
  color: var(--fana-text-primary);
}

/* Modern Navbar */
.modern-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--fana-z-fixed);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: var(--fana-backdrop-blur);
  border-bottom: 1px solid var(--fana-border-color);
  transition: all var(--fana-transition-base);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  text-decoration: none;
  color: var(--fana-text-primary);
  font-weight: 700;
  font-size: var(--fana-text-xl);
  transition: all var(--fana-transition-base);
}

.navbar-brand:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: var(--fana-shadow-colored);
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  border-radius: var(--fana-radius-lg);
  text-decoration: none;
  color: var(--fana-text-secondary);
  font-weight: 500;
  font-size: var(--fana-text-sm);
  transition: all var(--fana-transition-base);
  position: relative;
}

.nav-link:hover {
  color: var(--fana-primary);
  background: rgba(99, 102, 241, 0.1);
  text-decoration: none;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: var(--fana-primary);
  background: rgba(99, 102, 241, 0.1);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
}

/* Modern Button Styles */
.btn-primary-modern {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-6);
  background: var(--fana-gradient-primary);
  color: white;
  border: none;
  border-radius: var(--fana-radius-lg);
  font-weight: 600;
  font-size: var(--fana-text-sm);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  box-shadow: var(--fana-shadow-sm);
  position: relative;
  overflow: hidden;
}

.btn-primary-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
  color: white;
  text-decoration: none;
}

.btn-primary-modern:active {
  transform: translateY(0);
}

.btn-secondary-modern {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-6);
  background: var(--fana-bg-card);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  font-weight: 500;
  font-size: var(--fana-text-sm);
  text-decoration: none;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  backdrop-filter: var(--fana-backdrop-blur-sm);
}

.btn-secondary-modern:hover {
  background: var(--fana-bg-tertiary);
  border-color: var(--fana-primary);
  color: var(--fana-primary);
  transform: translateY(-1px);
  text-decoration: none;
}

/* Mobile Menu */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.mobile-menu-toggle span {
  width: 100%;
  height: 3px;
  background: var(--fana-text-primary);
  border-radius: var(--fana-radius-full);
  transition: all var(--fana-transition-base);
  transform-origin: center;
}

.mobile-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--fana-bg-card);
  border-bottom: 1px solid var(--fana-border-color);
  backdrop-filter: var(--fana-backdrop-blur);
  padding: var(--fana-space-6);
  transform: translateY(-100%);
  opacity: 0;
  transition: all var(--fana-transition-base);
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
  margin-bottom: var(--fana-space-6);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-4);
  text-decoration: none;
  color: var(--fana-text-secondary);
  font-weight: 500;
  border-radius: var(--fana-radius-lg);
  transition: all var(--fana-transition-base);
}

.mobile-nav-link:hover {
  background: var(--fana-bg-tertiary);
  color: var(--fana-primary);
  text-decoration: none;
}

/* Main Content */
.main-content {
  flex: 1;
  padding-top: 80px; /* Account for fixed navbar */
}

/* Modern Footer */
.modern-footer {
  background: var(--fana-bg-secondary);
  border-top: 1px solid var(--fana-border-color);
  margin-top: auto;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--fana-space-16) var(--fana-space-6) var(--fana-space-8);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--fana-space-12);
  margin-bottom: var(--fana-space-12);
}

.footer-brand {
  max-width: 350px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  margin-bottom: var(--fana-space-4);
}

.brand-logo .brand-icon {
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
}

.brand-description {
  color: var(--fana-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--fana-space-6);
}

.social-links {
  display: flex;
  gap: var(--fana-space-3);
}

.social-link {
  width: 40px;
  height: 40px;
  background: var(--fana-bg-card);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fana-text-secondary);
  text-decoration: none;
  transition: all var(--fana-transition-base);
}

.social-link:hover {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
  transform: translateY(-2px);
  text-decoration: none;
}

.footer-title {
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--fana-space-2);
}

.footer-links a {
  color: var(--fana-text-secondary);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  transition: color var(--fana-transition-base);
}

.footer-links a:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

.footer-bottom {
  border-top: 1px solid var(--fana-border-color);
  padding-top: var(--fana-space-6);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--fana-space-4);
}

.footer-bottom-content p {
  color: var(--fana-text-muted);
  font-size: var(--fana-text-sm);
  margin: 0;
}

.footer-bottom-links {
  display: flex;
  gap: var(--fana-space-6);
}

.footer-bottom-links a {
  color: var(--fana-text-muted);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  transition: color var(--fana-transition-base);
}

.footer-bottom-links a:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

/* Scroll to Top Button */
.scroll-to-top-btn {
  position: fixed;
  bottom: var(--fana-space-8);
  right: var(--fana-space-8);
  width: 48px;
  height: 48px;
  background: var(--fana-gradient-primary);
  color: white;
  border: none;
  border-radius: var(--fana-radius-full);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  z-index: var(--fana-z-fixed);
  box-shadow: var(--fana-shadow-lg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-to-top-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-xl);
}

/* Utility Classes */
.w-100 { width: 100%; }
.mb-3 { margin-bottom: var(--fana-space-3); }

/* Responsive Design */
@media (max-width: 1024px) {
  .navbar-nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: var(--fana-space-8);
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 var(--fana-space-4);
  }
  
  .navbar-actions .btn-secondary-modern {
    display: none;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--fana-space-6);
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .scroll-to-top-btn {
    bottom: var(--fana-space-6);
    right: var(--fana-space-6);
  }
}

@media (max-width: 480px) {
  .navbar-actions .btn-primary-modern span {
    display: none;
  }
  
  .footer-container {
    padding: var(--fana-space-12) var(--fana-space-4) var(--fana-space-6);
  }
}
</style>
