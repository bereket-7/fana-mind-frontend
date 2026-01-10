import apiService from './api';
import type { 
  Course, 
  Lesson, 
  Quiz, 
  Assignment,
  CourseProgress,
  CourseFilters 
} from '@/types/course';

class CourseService {
  private readonly endpoints = {
    courses: '/courses',
    enrollments: '/enrollments',
    progress: '/progress',
    lessons: '/lessons',
    quizzes: '/quizzes',
    assignments: '/assignments'
  };

  // Course Management
  async getAllCourses(filters?: CourseFilters): Promise<Course[]> {
    try {
      const params = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiService.get<Course[]>(`${this.endpoints.courses}?${params}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
  }

  async getCourseById(id: string): Promise<Course> {
    try {
      const response = await apiService.get<Course>(`${this.endpoints.courses}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course');
    }
  }

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    try {
      const response = await apiService.post<Course>(this.endpoints.courses, courseData);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create course');
    }
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    try {
      const response = await apiService.patch<Course>(`${this.endpoints.courses}/${id}`, updates);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update course');
    }
  }

  async deleteCourse(id: string): Promise<void> {
    try {
      await apiService.delete(`${this.endpoints.courses}/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete course');
    }
  }

  async publishCourse(id: string): Promise<Course> {
    try {
      const response = await apiService.post<Course>(`${this.endpoints.courses}/${id}/publish`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to publish course');
    }
  }

  async unpublishCourse(id: string): Promise<Course> {
    try {
      const response = await apiService.post<Course>(`${this.endpoints.courses}/${id}/unpublish`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to unpublish course');
    }
  }

  // Enrollment Management
  async enrollInCourse(courseId: string): Promise<{ message: string; enrollment: any }> {
    try {
      const response = await apiService.post<{ message: string; enrollment: any }>(
        this.endpoints.enrollments,
        { courseId }
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to enroll in course');
    }
  }

  async unenrollFromCourse(courseId: string): Promise<{ message: string }> {
    try {
      const response = await apiService.delete<{ message: string }>(
        `${this.endpoints.enrollments}/${courseId}`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to unenroll from course');
    }
  }

  async getEnrolledCourses(): Promise<Course[]> {
    try {
      const response = await apiService.get<Course[]>(`${this.endpoints.enrollments}/my-courses`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch enrolled courses');
    }
  }

  async getCourseEnrollments(courseId: string): Promise<any[]> {
    try {
      const response = await apiService.get<any[]>(`${this.endpoints.courses}/${courseId}/enrollments`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course enrollments');
    }
  }

  // Progress Tracking
  async getCourseProgress(courseId: string): Promise<CourseProgress> {
    try {
      const response = await apiService.get<CourseProgress>(`${this.endpoints.progress}/${courseId}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch course progress');
    }
  }

  async updateLessonProgress(lessonId: string, completed: boolean): Promise<void> {
    try {
      await apiService.post(`${this.endpoints.lessons}/${lessonId}/progress`, { completed });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update lesson progress');
    }
  }

  async markLessonComplete(lessonId: string): Promise<void> {
    try {
      await apiService.post(`${this.endpoints.lessons}/${lessonId}/complete`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark lesson as complete');
    }
  }

  // Lesson Management
  async getLessonById(id: string): Promise<Lesson> {
    try {
      const response = await apiService.get<Lesson>(`${this.endpoints.lessons}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch lesson');
    }
  }

  async createLesson(courseId: string, lessonData: Omit<Lesson, 'id' | 'courseId'>): Promise<Lesson> {
    try {
      const response = await apiService.post<Lesson>(
        `${this.endpoints.courses}/${courseId}/lessons`,
        lessonData
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create lesson');
    }
  }

  async updateLesson(id: string, updates: Partial<Lesson>): Promise<Lesson> {
    try {
      const response = await apiService.patch<Lesson>(`${this.endpoints.lessons}/${id}`, updates);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update lesson');
    }
  }

  async deleteLesson(id: string): Promise<void> {
    try {
      await apiService.delete(`${this.endpoints.lessons}/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete lesson');
    }
  }

  // Quiz Management
  async getQuizById(id: string): Promise<Quiz> {
    try {
      const response = await apiService.get<Quiz>(`${this.endpoints.quizzes}/${id}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch quiz');
    }
  }

  async submitQuizAnswers(quizId: string, answers: Record<string, any>): Promise<{
    score: number;
    totalPoints: number;
    passed: boolean;
    feedback: any[];
  }> {
    try {
      const response = await apiService.post<{
        score: number;
        totalPoints: number;
        passed: boolean;
        feedback: any[];
      }>(`${this.endpoints.quizzes}/${quizId}/submit`, { answers });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to submit quiz');
    }
  }

  async getQuizAttempts(quizId: string): Promise<any[]> {
    try {
      const response = await apiService.get<any[]>(`${this.endpoints.quizzes}/${quizId}/attempts`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch quiz attempts');
    }
  }

  // File Upload
  async uploadCourseImage(courseId: string, file: File, onProgress?: (progress: number) => void): Promise<{ url: string }> {
    try {
      const response = await apiService.uploadFile<{ url: string }>(
        `/courses/${courseId}/image`,
        file,
        onProgress
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload course image');
    }
  }

  async uploadLessonVideo(lessonId: string, file: File, onProgress?: (progress: number) => void): Promise<{ url: string }> {
    try {
      const response = await apiService.uploadFile<{ url: string }>(
        `/lessons/${lessonId}/video`,
        file,
        onProgress
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload lesson video');
    }
  }

  // Search and Recommendations
  async searchCourses(query: string, filters?: CourseFilters): Promise<Course[]> {
    try {
      const params = new URLSearchParams({ q: query });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            params.append(key, value.toString());
          }
        });
      }
      
      const response = await apiService.get<Course[]>(`${this.endpoints.courses}/search?${params}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search courses');
    }
  }

  async getRecommendedCourses(limit = 6): Promise<Course[]> {
    try {
      const response = await apiService.get<Course[]>(`${this.endpoints.courses}/recommended?limit=${limit}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch recommended courses');
    }
  }

  async getFeaturedCourses(limit = 6): Promise<Course[]> {
    try {
      const response = await apiService.get<Course[]>(`${this.endpoints.courses}/featured?limit=${limit}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured courses');
    }
  }

  // Reviews and Ratings
  async addCourseReview(courseId: string, rating: number, comment: string): Promise<any> {
    try {
      const response = await apiService.post(`${this.endpoints.courses}/${courseId}/reviews`, {
        rating,
        comment
      });
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add review');
    }
  }

  async getCourseReviews(courseId: string, page = 1, limit = 10): Promise<{
    reviews: any[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await apiService.get<{
        reviews: any[];
        total: number;
        page: number;
        totalPages: number;
      }>(`${this.endpoints.courses}/${courseId}/reviews?page=${page}&limit=${limit}`);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
}

export const courseService = new CourseService();
export default courseService;