import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Notification, NotificationType } from '@/types/notification';

export const useNotificationsStore = defineStore('notifications', () => {
  // State
  const notifications = ref<Notification[]>([]);
  const isLoading = ref(false);

  // Getters
  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  );

  const unreadNotifications = computed(() => 
    notifications.value.filter(n => !n.read)
  );

  const notificationsByType = computed(() => {
    const grouped: Record<NotificationType, Notification[]> = {
      info: [],
      success: [],
      warning: [],
      error: []
    };
    
    notifications.value.forEach(notification => {
      grouped[notification.type].push(notification);
    });
    
    return grouped;
  });

  // Actions
  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
      read: false
    };
    
    notifications.value.unshift(newNotification);
    
    // Auto-remove after 5 seconds for non-persistent notifications
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    }
    
    return newNotification;
  };

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  };

  const markAsRead = (id: string) => {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };

  const markAllAsRead = () => {
    notifications.value.forEach(notification => {
      notification.read = true;
    });
  };

  const clearAll = () => {
    notifications.value = [];
  };

  const clearRead = () => {
    notifications.value = notifications.value.filter(n => !n.read);
  };

  // Convenience methods for different notification types
  const showSuccess = (message: string, title?: string, persistent = false) => {
    return addNotification({
      type: 'success',
      title: title || 'Success',
      message,
      persistent
    });
  };

  const showError = (message: string, title?: string, persistent = true) => {
    return addNotification({
      type: 'error',
      title: title || 'Error',
      message,
      persistent
    });
  };

  const showWarning = (message: string, title?: string, persistent = false) => {
    return addNotification({
      type: 'warning',
      title: title || 'Warning',
      message,
      persistent
    });
  };

  const showInfo = (message: string, title?: string, persistent = false) => {
    return addNotification({
      type: 'info',
      title: title || 'Info',
      message,
      persistent
    });
  };

  return {
    // State
    notifications,
    isLoading,
    
    // Getters
    unreadCount,
    unreadNotifications,
    notificationsByType,
    
    // Actions
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    clearRead,
    
    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
});