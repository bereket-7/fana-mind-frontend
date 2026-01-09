import apiService from './api';
import type { 
  StudentProgress, 
  CourseAnalytics, 
  LearningMetrics,
  ReportConfig 
} from '@/types/analytics';

class AnalyticsService {
  private readonly endpoints = {
    analytics: '/analytics',
    progress: '/analytics/progress',
    courses: '/analytics/courses',
    learning: '/analytics/learning',
    events: '/analytics/events',
    reports: '/analytics/reports'
  };

  // Student Progress Analytics
  async getStudentProgress(courseId?: string): Promise<StudentProgress[]> {
    try {
      const url = courseId 
        ? `${this.endpoints.progress}?courseId=${courseId}`
        : this.endpoints.progress;
      
      const response = await apiService.get<StudentProgress[]>(url);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student progress');
    }
  }

  async getStudentProgressById(studentId: string, courseId?: string): Promise<StudentProgress> {
    try {
      const url = courseId 
        ? `${this.endpoints.progress}/${studentId}?courseId=${courseId}`
        : `${this.endpoints.progress}/${studentId}`;
      
      const response = await apiService.get<StudentProgress>(url);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student progress');
    }
  }

  // Course Analytics
  async getCourseAnalytics(instructorId?: string): Promise<CourseAnalytics[]> {
    try {
      const url = instructorId 
        ? `${this.endpoints.courses}?instructorId=${instructorId}`
        : this.endpoints.courses;
      
      const response = await apiService.get<CourseAnalytics[]>(url);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course analytics');
    }
  }

  async getCourseAnalyticsById(courseId: string): Promise<CourseAnalytics> {
    try {
      const response = await apiService.get<CourseAnalytics>(`${this.endpoints.courses}/${courseId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course analytics');
    }
  }

  // Learning Metrics
  async getLearningMetrics(userId: string, timeRange: '7d' | '30d' | '90d' = '30d'): Promise<LearningMetrics> {
    try {
      const response = await apiService.get<LearningMetrics>(
        `${this.endpoints.learning}/${userId}?timeRange=${timeRange}`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch learning metrics');
    }
  }

  async getGlobalLearningMetrics(timeRange: '7d' | '30d' | '90d' = '30d'): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.learning}/global?timeRange=${timeRange}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch global learning metrics');
    }
  }

  // Event Tracking
  async trackEvent(eventType: string, eventData: Record<string, any>): Promise<void> {
    try {
      await apiService.post(this.endpoints.events, {
        eventType,
        eventData,
        timestamp: new Date().toISOString(),
        sessionId: this.getSessionId(),
        deviceInfo: this.getDeviceInfo()
      });
    } catch (error: any) {
      // Don't throw errors for tracking failures to avoid disrupting user experience
      console.error('Failed to track event:', error);
    }
  }

  async trackLearningEvent(
    eventType: 'lesson_start' | 'lesson_complete' | 'quiz_start' | 'quiz_complete' | 'course_enroll' | 'course_complete',
    data: {
      courseId?: string;
      lessonId?: string;
      quizId?: string;
      score?: number;
      timeSpent?: number;
      [key: string]: any;
    }
  ): Promise<void> {
    await this.trackEvent(eventType, data);
  }

  async trackEngagementEvent(
    eventType: 'page_view' | 'video_play' | 'video_pause' | 'video_seek' | 'download' | 'share',
    data: Record<string, any>
  ): Promise<void> {
    await this.trackEvent(eventType, data);
  }

  // Reports
  async generateReport(
    reportType: 'student' | 'course' | 'instructor' | 'institution',
    filters: Record<string, any>
  ): Promise<any> {
    try {
      const response = await apiService.post(`${this.endpoints.reports}/generate`, {
        reportType,
        filters,
        generatedAt: new Date().toISOString()
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate report');
    }
  }

  async getReportById(reportId: string): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.reports}/${reportId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch report');
    }
  }

  async getReports(page = 1, limit = 10): Promise<{
    reports: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await apiService.get<{
        reports: any[];
        total: number;
        page: number;
        totalPages: number;
      }>(`${this.endpoints.reports}?page=${page}&limit=${limit}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reports');
    }
  }

  async scheduleReport(config: ReportConfig): Promise<{ reportId: string; message: string }> {
    try {
      const response = await apiService.post<{ reportId: string; message: string }>(
        `${this.endpoints.reports}/schedule`,
        config
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to schedule report');
    }
  }

  // Data Export
  async exportData(
    dataType: 'progress' | 'analytics' | 'metrics',
    format: 'csv' | 'json' | 'pdf'
  ): Promise<string> {
    try {
      const response = await apiService.post<{ downloadUrl: string }>('/analytics/export', {
        dataType,
        format,
        requestedAt: new Date().toISOString()
      });
      return response.downloadUrl;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to export data');
    }
  }

  // Dashboard Data
  async getDashboardData(userRole: 'student' | 'instructor' | 'admin'): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.analytics}/dashboard/${userRole}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  }

  async getInstructorDashboard(instructorId: string): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.analytics}/instructor/${instructorId}/dashboard`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch instructor dashboard');
    }
  }

  async getStudentDashboard(studentId: string): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.analytics}/student/${studentId}/dashboard`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch student dashboard');
    }
  }

  // Real-time Analytics
  async getLiveMetrics(): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.analytics}/live`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch live metrics');
    }
  }

  // Predictive Analytics
  async getPredictiveInsights(userId: string): Promise<any> {
    try {
      const response = await apiService.get(`${this.endpoints.analytics}/predictions/${userId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch predictive insights');
    }
  }

  async getAtRiskStudents(courseId?: string): Promise<any[]> {
    try {
      const url = courseId 
        ? `${this.endpoints.analytics}/at-risk?courseId=${courseId}`
        : `${this.endpoints.analytics}/at-risk`;
      
      const response = await apiService.get<any[]>(url);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch at-risk students');
    }
  }

  // Utility Methods
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private getDeviceInfo(): any {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
  }

  // A/B Testing
  async getExperimentVariant(experimentId: string): Promise<{ variant: string; config: any }> {
    try {
      const response = await apiService.get<{ variant: string; config: any }>(
        `/analytics/experiments/${experimentId}/variant`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get experiment variant');
    }
  }

  async trackExperimentEvent(experimentId: string, variant: string, eventType: string, data: any): Promise<void> {
    await this.trackEvent('experiment_event', {
      experimentId,
      variant,
      eventType,
      ...data
    });
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;