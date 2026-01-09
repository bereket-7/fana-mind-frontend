<template>
  <div class="notification-center">
    <!-- Notification Bell -->
    <BDropdown 
      variant="link" 
      no-caret 
      class="notification-dropdown"
      @show="markAllAsRead"
    >
      <template #button-content>
        <div class="position-relative">
          <font-awesome-icon 
            :icon="['fas', 'bell']" 
            class="text-muted fs-5"
          />
          <BBadge 
            v-if="unreadCount > 0"
            variant="danger" 
            pill 
            class="position-absolute top-0 start-100 translate-middle"
          >
            {{ unreadCount > 99 ? '99+' : unreadCount }}
          </BBadge>
        </div>
      </template>

      <div class="notification-dropdown-content">
        <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h6 class="mb-0">Notifications</h6>
          <BButton 
            v-if="notifications.length > 0"
            variant="link" 
            size="sm" 
            @click="clearAll"
            class="text-muted p-0"
          >
            Clear All
          </BButton>
        </div>

        <div class="notification-list">
          <div 
            v-if="notifications.length === 0" 
            class="text-center p-4 text-muted"
          >
            <font-awesome-icon :icon="['fas', 'bell-slash']" class="fs-1 mb-2" />
            <p class="mb-0">No notifications</p>
          </div>

          <div 
            v-for="notification in notifications.slice(0, 10)" 
            :key="notification.id"
            class="notification-item"
            :class="{ 'unread': !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <div class="d-flex align-items-start p-3">
              <div class="notification-icon me-3">
                <font-awesome-icon 
                  :icon="getNotificationIcon(notification.type)"
                  :class="getNotificationIconClass(notification.type)"
                />
              </div>
              
              <div class="flex-grow-1">
                <h6 class="notification-title mb-1">{{ notification.title }}</h6>
                <p class="notification-message mb-1 text-muted">
                  {{ notification.message }}
                </p>
                <small class="text-muted">
                  {{ formatTimeAgo(notification.createdAt) }}
                </small>
              </div>

              <BButton
                variant="link"
                size="sm"
                class="text-muted p-0 ms-2"
                @click.stop="removeNotification(notification.id)"
              >
                <font-awesome-icon :icon="['fas', 'times']" />
              </BButton>
            </div>
          </div>
        </div>

        <div 
          v-if="notifications.length > 10" 
          class="text-center p-3 border-top"
        >
          <BButton variant="link" size="sm" @click="$router.push('/notifications')">
            View All Notifications
          </BButton>
        </div>
      </div>
    </BDropdown>

    <!-- Toast Notifications -->
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
      <BToast
        v-for="notification in toastNotifications"
        :key="notification.id"
        :variant="getToastVariant(notification.type)"
        :show="true"
        :auto-hide="!notification.persistent"
        :delay="5000"
        @hidden="removeNotification(notification.id)"
        class="mb-2"
      >
        <template #title>
          <div class="d-flex align-items-center">
            <font-awesome-icon 
              :icon="getNotificationIcon(notification.type)"
              class="me-2"
            />
            {{ notification.title }}
          </div>
        </template>
        
        {{ notification.message }}
        
        <template v-if="notification.actionUrl" #footer>
          <BButton 
            variant="primary" 
            size="sm" 
            @click="handleNotificationAction(notification)"
          >
            {{ notification.actionText || 'View' }}
          </BButton>
        </template>
      </BToast>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useNotificationsStore } from '@/store/modules/notifications';
import { useRouter } from 'vue-router';

const notificationsStore = useNotificationsStore();
const router = useRouter();

// Computed properties
const notifications = computed(() => notificationsStore.notifications);
const unreadCount = computed(() => notificationsStore.unreadCount);
const toastNotifications = computed(() => 
  notifications.value.filter(n => !n.read && Date.now() - n.createdAt.getTime() < 10000)
);

// Methods
const markAllAsRead = () => {
  notificationsStore.markAllAsRead();
};

const clearAll = () => {
  notificationsStore.clearAll();
};

const removeNotification = (id) => {
  notificationsStore.removeNotification(id);
};

const handleNotificationClick = (notification) => {
  notificationsStore.markAsRead(notification.id);
  
  if (notification.actionUrl) {
    router.push(notification.actionUrl);
  }
};

const handleNotificationAction = (notification) => {
  if (notification.actionUrl) {
    router.push(notification.actionUrl);
  }
  removeNotification(notification.id);
};

const getNotificationIcon = (type) => {
  const icons = {
    info: ['fas', 'info-circle'],
    success: ['fas', 'check-circle'],
    warning: ['fas', 'exclamation-triangle'],
    error: ['fas', 'exclamation-circle']
  };
  return icons[type] || icons.info;
};

const getNotificationIconClass = (type) => {
  const classes = {
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-danger'
  };
  return classes[type] || classes.info;
};

const getToastVariant = (type) => {
  const variants = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'danger'
  };
  return variants[type] || variants.info;
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
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
};

// WebSocket connection for real-time notifications
let ws = null;

const connectWebSocket = () => {
  const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
  ws = new WebSocket(`${wsUrl}/notifications`);
  
  ws.onopen = () => {
    console.log('WebSocket connected for notifications');
  };
  
  ws.onmessage = (event) => {
    try {
      const notification = JSON.parse(event.data);
      notificationsStore.addNotification(notification);
    } catch (error) {
      console.error('Failed to parse notification:', error);
    }
  };
  
  ws.onclose = () => {
    console.log('WebSocket disconnected, attempting to reconnect...');
    setTimeout(connectWebSocket, 5000);
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
};

const disconnectWebSocket = () => {
  if (ws) {
    ws.close();
    ws = null;
  }
};

onMounted(() => {
  connectWebSocket();
});

onUnmounted(() => {
  disconnectWebSocket();
});
</script>

<style scoped>
.notification-dropdown {
  border: none !important;
}

.notification-dropdown-content {
  width: 380px;
  max-height: 500px;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  border-bottom: 1px solid #f8f9fa;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.notification-item:hover {
  background-color: #f8f9fa;
}

.notification-item.unread {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 24px;
  text-align: center;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
}

.notification-message {
  font-size: 0.8rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.toast-container {
  z-index: 9999;
}

/* Custom scrollbar for notification list */
.notification-list::-webkit-scrollbar {
  width: 4px;
}

.notification-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.notification-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.notification-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>