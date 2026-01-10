<template>
  <nav class="modern-navbar" :class="{ 'scrolled': isScrolled }">
    <div class="navbar-container">
      <!-- Logo Section -->
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">
          <div class="brand-icon">
            <font-awesome-icon :icon="['fas', 'graduation-cap']" />
          </div>
          <span class="brand-text">Fana Mind</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-nav desktop-nav">
        <router-link 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path" 
          class="nav-link"
          :class="{ 'active': $route.path === item.path }"
        >
          <font-awesome-icon :icon="item.icon" class="nav-icon" />
          {{ item.name }}
        </router-link>
      </div>

      <!-- Right Side Actions -->
      <div class="navbar-actions">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="action-btn theme-toggle"
          :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <font-awesome-icon 
            :icon="isDarkMode ? ['fas', 'sun'] : ['fas', 'moon']" 
            class="theme-icon"
          />
        </button>

        <!-- Notifications -->
        <div class="notification-wrapper">
          <button class="action-btn notification-btn" @click="toggleNotifications">
            <font-awesome-icon :icon="['fas', 'bell']" />
            <span v-if="notificationCount > 0" class="notification-badge">
              {{ notificationCount > 99 ? '99+' : notificationCount }}
            </span>
          </button>
          
          <!-- Notification Dropdown -->
          <div v-if="showNotifications" class="notification-dropdown glass-card">
            <div class="notification-header">
              <h6>Notifications</h6>
              <button @click="clearAllNotifications" class="clear-btn">Clear All</button>
            </div>
            <div class="notification-list">
              <div v-if="notifications.length === 0" class="no-notifications">
                <font-awesome-icon :icon="['fas', 'bell-slash']" />
                <p>No new notifications</p>
              </div>
              <div 
                v-for="notification in notifications.slice(0, 5)" 
                :key="notification.id"
                class="notification-item"
              >
                <div class="notification-content">
                  <h6>{{ notification.title }}</h6>
                  <p>{{ notification.message }}</p>
                  <small>{{ formatTimeAgo(notification.createdAt) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <button class="profile-btn" @click="toggleUserMenu">
            <img 
              :src="user?.avatar || '/default-avatar.png'" 
              :alt="user?.name || 'User'"
              class="profile-avatar"
            />
            <span class="profile-name">{{ user?.name || 'Guest' }}</span>
            <font-awesome-icon :icon="['fas', 'chevron-down']" class="dropdown-icon" />
          </button>
          
          <!-- User Dropdown -->
          <div v-if="showUserMenu" class="user-dropdown glass-card">
            <div class="user-info">
              <img :src="user?.avatar || '/default-avatar.png'" :alt="user?.name" />
              <div>
                <h6>{{ user?.name || 'Guest User' }}</h6>
                <p>{{ user?.email || 'guest@fanamind.com' }}</p>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <router-link to="/profile" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'user']" />
              Profile
            </router-link>
            <router-link to="/settings" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'cog']" />
              Settings
            </router-link>
            <router-link to="/help" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'question-circle']" />
              Help
            </router-link>
            <div class="dropdown-divider"></div>
            <button @click="logout" class="dropdown-item logout-btn">
              <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
              Logout
            </button>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button 
          @click="toggleMobileMenu" 
          class="mobile-menu-toggle"
          :class="{ 'active': showMobileMenu }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'active': showMobileMenu }">
      <div class="mobile-nav-content">
        <router-link 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path" 
          class="mobile-nav-link"
          @click="closeMobileMenu"
        >
          <font-awesome-icon :icon="item.icon" />
          {{ item.name }}
        </router-link>
        
        <div class="mobile-nav-divider"></div>
        
        <button @click="logout" class="mobile-nav-link logout">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          Logout
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-if="showMobileMenu" 
      class="mobile-overlay" 
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Reactive state
const isScrolled = ref(false);
const showNotifications = ref(false);
const showUserMenu = ref(false);
const showMobileMenu = ref(false);
const isDarkMode = ref(false);

// Mock data - replace with actual store data
const user = ref({
  name: 'John Doe',
  email: 'john@fanamind.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
});

const notifications = ref([
  {
    id: 1,
    title: 'New Course Available',
    message: 'Advanced React Patterns is now live!',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: 'Assignment Due',
    message: 'JavaScript Fundamentals assignment due tomorrow',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
  }
]);

const navItems = [
  { name: 'Home', path: '/', icon: ['fas', 'home'] },
  { name: 'Courses', path: '/courses', icon: ['fas', 'book'] },
  { name: 'Dashboard', path: '/dashboard', icon: ['fas', 'tachometer-alt'] },
  { name: 'Community', path: '/community', icon: ['fas', 'users'] },
  { name: 'About', path: '/about', icon: ['fas', 'info-circle'] }
];

// Computed properties
const notificationCount = computed(() => notifications.value.length);

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showNotifications.value = false;
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
};

const clearAllNotifications = () => {
  notifications.value = [];
  showNotifications.value = false;
};

const logout = () => {
  // Implement logout logic
  console.log('Logging out...');
  router.push('/');
  closeMobileMenu();
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

// Initialize theme
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  isDarkMode.value = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
  document.documentElement.setAttribute('data-theme', isDarkMode.value ? 'dark' : 'light');
};

// Close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  
  if (!target.closest('.notification-wrapper')) {
    showNotifications.value = false;
  }
  
  if (!target.closest('.user-profile')) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  initializeTheme();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.modern-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--fana-z-fixed);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: var(--fana-backdrop-blur);
  -webkit-backdrop-filter: var(--fana-backdrop-blur);
  border-bottom: 1px solid var(--fana-border-color);
  transition: all var(--fana-transition-base);
  
  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: var(--fana-shadow-lg);
  }
}

[data-theme="dark"] .modern-navbar {
  background: rgba(15, 23, 42, 0.8);
  border-bottom-color: var(--fana-gray-700);
  
  &.scrolled {
    background: rgba(15, 23, 42, 0.95);
  }
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  gap: var(--fana-space-6);
}

.navbar-brand {
  .brand-link {
    display: flex;
    align-items: center;
    gap: var(--fana-space-3);
    text-decoration: none;
    color: var(--fana-text-primary);
    font-weight: 800;
    font-size: var(--fana-text-xl);
    transition: all var(--fana-transition-base);
    
    &:hover {
      color: var(--fana-primary);
    }
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
    box-shadow: var(--fana-shadow-lg);
  }
}

.desktop-nav {
  display: none;
  gap: var(--fana-space-1);
  margin: 0 var(--fana-space-6);
  
  @media (min-width: 1024px) {
    display: flex;
  }
  
  .nav-link {
    display: flex;
    align-items: flex-start;
    gap: var(--fana-space-2);
    padding: var(--fana-space-2) var(--fana-space-4);
    text-decoration: none;
    color: var(--fana-text-secondary);
    font-weight: 500;
    border-radius: var(--fana-radius-md);
    transition: all var(--fana-transition-base);
    white-space: nowrap;
    
    &:hover, &.active {
      color: var(--fana-primary);
      background: var(--fana-primary-light);
    }
    
    .nav-icon {
      font-size: 1.1em;
    }
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--fana-space-4);
  margin-left: auto;
  
  @media (max-width: 1023px) {
    gap: var(--fana-space-3);
  }
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--fana-radius-lg);
  border: none;
  background: var(--fana-bg-secondary);
  color: var(--fana-text-secondary);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &:hover {
    background: var(--fana-primary);
    color: white;
    transform: translateY(-2px);
    box-shadow: var(--fana-shadow-lg);
  }
}

.notification-wrapper {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--fana-accent-red);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: var(--fana-radius-full);
  min-width: 20px;
  text-align: center;
}

.notification-dropdown,
.user-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  z-index: var(--fana-z-dropdown);
  animation: fadeInScale 0.2s ease-out;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--fana-space-4);
  border-bottom: 1px solid var(--fana-border-color);
  
  h6 {
    margin: 0;
    font-weight: 600;
  }
  
  .clear-btn {
    background: none;
    border: none;
    color: var(--fana-primary);
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.no-notifications {
  text-align: center;
  padding: var(--fana-space-8);
  color: var(--fana-text-muted);
  
  svg {
    font-size: 2rem;
    margin-bottom: var(--fana-space-2);
  }
}

.notification-item {
  padding: var(--fana-space-4);
  border-bottom: 1px solid var(--fana-border-color);
  cursor: pointer;
  transition: background var(--fana-transition-base);
  
  &:hover {
    background: var(--fana-bg-secondary);
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  h6 {
    margin: 0 0 var(--fana-space-1) 0;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  p {
    margin: 0 0 var(--fana-space-1) 0;
    font-size: 0.8rem;
    color: var(--fana-text-secondary);
  }
  
  small {
    color: var(--fana-text-muted);
    font-size: 0.75rem;
  }
}

.user-profile {
  position: relative;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-2) var(--fana-space-3);
  border-radius: var(--fana-radius-lg);
  border: none;
  background: var(--fana-bg-secondary);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  
  &:hover {
    background: var(--fana-bg-tertiary);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: var(--fana-radius-full);
  object-fit: cover;
}

.profile-name {
  font-weight: 500;
  color: var(--fana-text-primary);
  
  @media (max-width: 1024px) {
    display: none;
  }
}

.dropdown-icon {
  color: var(--fana-text-muted);
  font-size: 0.75rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-4);
  
  img {
    width: 48px;
    height: 48px;
    border-radius: var(--fana-radius-full);
    object-fit: cover;
  }
  
  h6 {
    margin: 0;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.875rem;
    color: var(--fana-text-muted);
  }
}

.dropdown-divider {
  height: 1px;
  background: var(--fana-border-color);
  margin: var(--fana-space-2) 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-3) var(--fana-space-4);
  text-decoration: none;
  color: var(--fana-text-secondary);
  font-weight: 500;
  transition: all var(--fana-transition-base);
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  
  &:hover {
    background: var(--fana-bg-secondary);
    color: var(--fana-text-primary);
  }
  
  &.logout-btn {
    color: var(--fana-accent-red);
    
    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
}

.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: var(--fana-space-2);
  
  @media (min-width: 1024px) {
    display: none;
  }
  
  span {
    width: 100%;
    height: 3px;
    background: var(--fana-text-primary);
    border-radius: var(--fana-radius-full);
    transition: all var(--fana-transition-base);
    transform-origin: center;
  }
  
  &.active {
    span:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translate(8px, -8px);
    }
  }
}

.mobile-nav {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: var(--fana-bg-primary);
  border-bottom: 1px solid var(--fana-border-color);
  transform: translateY(-100%);
  transition: transform var(--fana-transition-base);
  z-index: var(--fana-z-dropdown);
  
  &.active {
    transform: translateY(0);
  }
  
  @media (min-width: 1025px) {
    display: none;
  }
}

.mobile-nav-content {
  padding: var(--fana-space-6);
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
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  
  &:hover {
    background: var(--fana-bg-secondary);
    color: var(--fana-text-primary);
  }
  
  &.logout {
    color: var(--fana-accent-red);
    
    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }
  }
}

.mobile-nav-divider {
  height: 1px;
  background: var(--fana-border-color);
  margin: var(--fana-space-4) 0;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--fana-z-modal-backdrop);
  
  @media (min-width: 1025px) {
    display: none;
  }
}
</style>