import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { 
  AnalyticsData, 
  StudentProgress, 
  CourseAnalytics,
  LearningMetrics 
} from '@/types/analytics';
import { analyticsService } from '@/services/analyticsService';

export const useAnalyticsStore = defineStore('analytics', () => {
  // State
  const studentProgress = ref<StudentProgress[]>([]);
  const courseAnalytics = ref<CourseAnalytics[]>([]);
  const learningMetrics = ref<LearningMetrics | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const averageProgress = computed(() => {
    if (studentProgress.value.length === 0) return 0;
    const total = studentProgress.value.reduce((sum, progress) => sum + progress.completionPercentage, 0);
    return Math.round(total / studentProgress.value.length);
  });

  const topPerformingCourses = computed(() => 
    courseAnalytics.value
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 5)
  );

  const strugglingStudents = computed(() => 
    studentProgress.value
      .filter(progress => progress.completionPercentage < 50 || progress.averageScore < 60)
      .sort((a, b) => a.completionPercentage - b.completionPercentage)
  );

  const engagementTrends = computed(() => {
    if (!learningMetrics.value) return [];
    
    return learningMetrics.value.dailyEngagement.map((engagement, index) => ({
      date: new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: engagement
    }));
  });

  // Actions
  const fetchStudentProgress = async (courseId?: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      studentProgress.value = await analyticsService.getStudentProgress(courseId);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch student progress';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCourseAnalytics = async (instructorId?: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      courseAnalytics.value = await analyticsService.getCourseAnalytics(instructorId);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch course analytics';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchLearningMetrics = async (userId: string, timeRange: '7d' | '30d' | '90d' = '30d') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      learningMetrics.value = await analyticsService.getLearningMetrics(userId, timeRange);
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch learning metrics';
    } finally {
      isLoading.value = false;
    }
  };

  const trackEvent = async (eventType: string, eventData: Record<string, any>) => {
    try {
      await analyticsService.trackEvent(eventType, eventData);
    } catch (err) {
      console.error('Failed to track event:', err);
    }
  };

  const generateReport = async (reportType: 'student' | 'course' | 'instructor', filters: Record<string, any>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const report = await analyticsService.generateReport(reportType, filters);
      return report;
    } catch (err: any) {
      error.value = err.message || 'Failed to generate report';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const exportData = async (dataType: 'progress' | 'analytics' | 'metrics', format: 'csv' | 'json' | 'pdf') => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const exportUrl = await analyticsService.exportData(dataType, format);
      return exportUrl;
    } catch (err: any) {
      error.value = err.message || 'Failed to export data';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    studentProgress,
    courseAnalytics,
    learningMetrics,
    isLoading,
    error,
    
    // Getters
    averageProgress,
    topPerformingCourses,
    strugglingStudents,
    engagementTrends,
    
    // Actions
    fetchStudentProgress,
    fetchCourseAnalytics,
    fetchLearningMetrics,
    trackEvent,
    generateReport,
    exportData
  };
});