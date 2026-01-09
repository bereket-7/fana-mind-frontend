<template>
  <footer class="modern-footer">
    <!-- Main Footer Content -->
    <div class="footer-main">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Brand Section -->
          <div class="footer-brand">
            <div class="brand-logo">
              <div class="brand-icon">
                <font-awesome-icon :icon="['fas', 'graduation-cap']" />
              </div>
              <span class="brand-text">Fana Mind</span>
            </div>
            
            <p class="brand-description">
              Transforming education through AI-powered learning experiences. 
              Join thousands of learners worldwide in their journey to success.
            </p>
            
            <div class="social-links">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url" 
                :title="social.name"
                class="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <font-awesome-icon :icon="social.icon" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><router-link to="/" class="footer-link">Home</router-link></li>
              <li><router-link to="/courses" class="footer-link">Courses</router-link></li>
              <li><router-link to="/about" class="footer-link">About Us</router-link></li>
              <li><router-link to="/contact" class="footer-link">Contact</router-link></li>
            </ul>
          </div>

          <!-- Learning -->
          <div class="footer-section">
            <h3 class="footer-title">Learning</h3>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Browse Courses</a></li>
              <li><a href="#" class="footer-link">Become Instructor</a></li>
              <li><a href="#" class="footer-link">Student Dashboard</a></li>
              <li><a href="#" class="footer-link">Certificates</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div class="footer-section">
            <h3 class="footer-title">Support</h3>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Help Center</a></li>
              <li><a href="#" class="footer-link">Community</a></li>
              <li><a href="#" class="footer-link">Privacy Policy</a></li>
              <li><a href="#" class="footer-link">Terms of Service</a></li>
            </ul>
          </div>

          <!-- Newsletter -->
          <div class="footer-section">
            <h3 class="footer-title">Stay Updated</h3>
            <p class="newsletter-text">
              Subscribe to our newsletter for the latest updates and learning resources.
            </p>
            
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <div class="input-group">
                <input 
                  v-model="email"
                  type="email" 
                  placeholder="Enter your email"
                  class="newsletter-input"
                  required
                />
                <button type="submit" class="newsletter-btn" :disabled="isSubscribing">
                  <font-awesome-icon 
                    :icon="isSubscribing ? ['fas', 'spinner'] : ['fas', 'paper-plane']" 
                    :spin="isSubscribing"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="footer-container">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>&copy; {{ currentYear }} Fana Mind. All rights reserved.</p>
          </div>
          
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">Privacy</a>
            <a href="#" class="footer-bottom-link">Terms</a>
            <a href="#" class="footer-bottom-link">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNotificationsStore } from '@/store/modules/notifications';

const notificationsStore = useNotificationsStore();

// Reactive data
const email = ref('');
const isSubscribing = ref(false);

// Computed
const currentYear = computed(() => new Date().getFullYear());

// Social media links
const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com/fanamind',
    icon: ['fab', 'facebook-f']
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/fanamind',
    icon: ['fab', 'twitter']
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/fanamind',
    icon: ['fab', 'linkedin-in']
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/fanamind',
    icon: ['fab', 'instagram']
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/fanamind',
    icon: ['fab', 'youtube']
  }
];

// Methods
const subscribeNewsletter = async () => {
  if (!email.value) return;
  
  isSubscribing.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    notificationsStore.showSuccess(
      'Successfully subscribed to our newsletter!',
      'Welcome aboard'
    );
    
    email.value = '';
  } catch (error) {
    notificationsStore.showError(
      'Failed to subscribe. Please try again.',
      'Subscription Error'
    );
  } finally {
    isSubscribing.value = false;
  }
};
</script>

<style scoped>
.modern-footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #ffffff;
  margin-top: auto;
}

.footer-main {
  padding: 4rem 0 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-brand {
  max-width: 350px;
}

.brand-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.brand-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-size: 1.5rem;
}

.brand-text {
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-description {
  color: #b8c5d6;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: translateY(-2px);
  color: #ffffff;
}

.footer-section {
  min-width: 200px;
}

.footer-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: #b8c5d6;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 400;
}

.footer-link:hover {
  color: #667eea;
}

.newsletter-text {
  color: #b8c5d6;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.newsletter-form {
  margin-top: 1rem;
}

.input-group {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.newsletter-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 0.875rem;
  outline: none;
}

.newsletter-input::placeholder {
  color: #b8c5d6;
}

.newsletter-btn {
  padding: 0.875rem 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.newsletter-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
}

.newsletter-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
  background: rgba(0, 0, 0, 0.2);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: #b8c5d6;
  font-size: 0.875rem;
}

.footer-bottom-links {
  display: flex;
  gap: 2rem;
}

.footer-bottom-link {
  color: #b8c5d6;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-bottom-link:hover {
  color: #667eea;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-main {
    padding: 3rem 0 1.5rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
  }
  
  .brand-logo {
    justify-content: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 0 0.75rem;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .newsletter-btn {
    border-radius: 0 0 8px 8px;
  }
}
</style>