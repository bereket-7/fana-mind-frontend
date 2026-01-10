import apiService from './api';
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  AuthResponse,
  PasswordResetRequest,
  PasswordReset 
} from '@/types/auth';

class AuthService {
  private readonly endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    profile: '/auth/profile',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
    oauth: '/auth/oauth'
  };

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(this.endpoints.login, credentials);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(this.endpoints.register, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(this.endpoints.logout);
    } catch (error) {
      // Logout should always succeed locally even if server call fails
      console.error('Logout error:', error);
    }
  }

  async refreshToken(): Promise<{ token: string }> {
    try {
      const response = await apiService.post<{ token: string }>(this.endpoints.refresh);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await apiService.get<User>(this.endpoints.profile);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {
      const response = await apiService.patch<User>(this.endpoints.profile, profileData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  async forgotPassword(data: PasswordResetRequest): Promise<{ message: string }> {
    try {
      const response = await apiService.post<{ message: string }>(this.endpoints.forgotPassword, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset request failed');
    }
  }

  async resetPassword(data: PasswordReset): Promise<{ message: string }> {
    try {
      const response = await apiService.post<{ message: string }>(this.endpoints.resetPassword, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const response = await apiService.post<{ message: string }>(this.endpoints.verifyEmail, { token });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Email verification failed');
    }
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    try {
      const response = await apiService.post<{ message: string }>(this.endpoints.resendVerification, { email });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend verification');
    }
  }

  async oauthLogin(provider: string, code: string): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>(`${this.endpoints.oauth}/${provider}`, { code });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OAuth login failed');
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    try {
      const response = await apiService.post<{ message: string }>('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password change failed');
    }
  }

  async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<{ avatarUrl: string }> {
    try {
      const response = await apiService.uploadFile<{ avatarUrl: string }>(
        '/auth/avatar',
        file,
        onProgress
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Avatar upload failed');
    }
  }

  async deleteAccount(password: string): Promise<{ message: string }> {
    try {
      const response = await apiService.delete<{ message: string }>('/auth/account', {
        data: { password }
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Account deletion failed');
    }
  }

  // Utility methods
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  getTokenPayload(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;