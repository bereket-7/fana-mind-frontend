export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  bio?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  isActive: boolean;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: NotificationPreferences;
  accessibility: AccessibilityPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  courseUpdates: boolean;
  assignments: boolean;
  grades: boolean;
  announcements: boolean;
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  screenReader: boolean;
  keyboardNavigation: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor';
  agreeToTerms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

export interface OAuthProvider {
  id: 'google' | 'microsoft' | 'github';
  name: string;
  icon: string;
  enabled: boolean;
}