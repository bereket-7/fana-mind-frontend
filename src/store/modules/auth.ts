import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterData } from '@/types/auth';
import { authService } from '@/services/authService';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('auth_token'));
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const userRole = computed(() => user.value?.role || 'guest');
  const isInstructor = computed(() => userRole.value === 'instructor');
  const isStudent = computed(() => userRole.value === 'student');
  const isAdmin = computed(() => userRole.value === 'admin');

  // Actions
  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await authService.login(credentials);
      token.value = response.token;
      user.value = response.user;
      
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      
      return response;
    } catch (err: any) {
      error.value = err.message || 'Login failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (data: RegisterData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await authService.register(data);
      token.value = response.token;
      user.value = response.user;
      
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
      
      return response;
    } catch (err: any) {
      error.value = err.message || 'Registration failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      user.value = null;
      token.value = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  };

  const refreshToken = async () => {
    if (!token.value) return;
    
    try {
      const response = await authService.refreshToken();
      token.value = response.token;
      localStorage.setItem('auth_token', response.token);
    } catch (err) {
      console.error('Token refresh failed:', err);
      logout();
    }
  };

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser && token.value) {
      try {
        user.value = JSON.parse(storedUser);
      } catch (err) {
        console.error('Failed to parse stored user data:', err);
        logout();
      }
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (!user.value) return;
    
    isLoading.value = true;
    try {
      const updatedUser = await authService.updateProfile(profileData);
      user.value = { ...user.value, ...updatedUser };
      localStorage.setItem('user_data', JSON.stringify(user.value));
    } catch (err: any) {
      error.value = err.message || 'Profile update failed';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    user,
    token,
    isLoading,
    error,
    
    // Getters
    isAuthenticated,
    userRole,
    isInstructor,
    isStudent,
    isAdmin,
    
    // Actions
    login,
    register,
    logout,
    refreshToken,
    initializeAuth,
    updateProfile
  };
});