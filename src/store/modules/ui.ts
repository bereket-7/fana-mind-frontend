import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUIStore = defineStore('ui', () => {
  // State
  const sidebarCollapsed = ref(false);
  const theme = ref<'light' | 'dark'>('light');
  const loading = ref(false);
  const modals = ref<Record<string, boolean>>({});
  const breadcrumbs = ref<Array<{ label: string; to?: string }>>([]);
  const pageTitle = ref('Fana Mind');

  // Getters
  const isDarkMode = computed(() => theme.value === 'dark');
  const isModalOpen = computed(() => (modalId: string) => modals.value[modalId] || false);

  // Actions
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed;
  };

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', theme.value);
    updateThemeClass();
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeClass();
  };

  const updateThemeClass = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.value = prefersDark ? 'dark' : 'light';
    }
    updateThemeClass();
  };

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };

  const openModal = (modalId: string) => {
    modals.value[modalId] = true;
  };

  const closeModal = (modalId: string) => {
    modals.value[modalId] = false;
  };

  const toggleModal = (modalId: string) => {
    modals.value[modalId] = !modals.value[modalId];
  };

  const setBreadcrumbs = (newBreadcrumbs: Array<{ label: string; to?: string }>) => {
    breadcrumbs.value = newBreadcrumbs;
  };

  const addBreadcrumb = (breadcrumb: { label: string; to?: string }) => {
    breadcrumbs.value.push(breadcrumb);
  };

  const setPageTitle = (title: string) => {
    pageTitle.value = title;
    document.title = `${title} - Fana Mind`;
  };

  return {
    // State
    sidebarCollapsed,
    theme,
    loading,
    modals,
    breadcrumbs,
    pageTitle,
    
    // Getters
    isDarkMode,
    isModalOpen,
    
    // Actions
    toggleSidebar,
    setSidebarCollapsed,
    toggleTheme,
    setTheme,
    initializeTheme,
    setLoading,
    openModal,
    closeModal,
    toggleModal,
    setBreadcrumbs,
    addBreadcrumb,
    setPageTitle
  };
});