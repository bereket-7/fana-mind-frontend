import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Course, Lesson, Quiz, CourseFilters } from '@/types/course';
import { courseService } from '@/services/courseService';

export const useCoursesStore = defineStore('courses', () => {
  // State
  const courses = ref<Course[]>([]);
  const currentCourse = ref<Course | null>(null);
  const enrolledCourses = ref<Course[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<CourseFilters>({
    category: null,
    difficulty: null,
    price: null,
    search: ''
  });

  // Getters
  const filteredCourses = computed(() => {
    let filtered = courses.value;

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search)
      );
    }

    if (filters.value.category) {
      filtered = filtered.filter(course => course.category === filters.value.category);
    }

    if (filters.value.difficulty) {
      filtered = filtered.filter(course => course.difficulty === filters.value.difficulty);
    }

    if (filters.value.price) {
      if (filters.value.price === 'free') {
        filtered = filtered.filter(course => course.price === 0);
      } else if (filters.value.price === 'paid') {
        filtered = filtered.filter(course => course.price > 0);
      }
    }

    return filtered;
  });

  const coursesByCategory = computed(() => {
    const grouped: Record<string, Course[]> = {};
    courses.value.forEach(course => {
      if (!grouped[course.category]) {
        grouped[course.category] = [];
      }
      grouped[course.category].push(course);
    });
    return grouped;
  });

  const popularCourses = computed(() => 
    courses.value
      .filter(course => course.enrollmentCount > 100)
      .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
      .slice(0, 6)
  );

  // Actions
  const fetchCourses = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      courses.value = await courseService.getAllCourses();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch courses';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCourseById = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      currentCourse.value = await courseService.getCourseById(id);
      return currentCourse.value;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch course';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const createCourse = async (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const newCourse = await courseService.createCourse(courseData);
      courses.value.unshift(newCourse);
      return newCourse;
    } catch (err: any) {
      error.value = err.message || 'Failed to create course';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const updatedCourse = await courseService.updateCourse(id, updates);
      const index = courses.value.findIndex(c => c.id === id);
      if (index !== -1) {
        courses.value[index] = updatedCourse;
      }
      if (currentCourse.value?.id === id) {
        currentCourse.value = updatedCourse;
      }
      return updatedCourse;
    } catch (err: any) {
      error.value = err.message || 'Failed to update course';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteCourse = async (id: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      await courseService.deleteCourse(id);
      courses.value = courses.value.filter(c => c.id !== id);
      if (currentCourse.value?.id === id) {
        currentCourse.value = null;
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to delete course';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const enrollInCourse = async (courseId: string) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      await courseService.enrollInCourse(courseId);
      const course = courses.value.find(c => c.id === courseId);
      if (course && !enrolledCourses.value.find(c => c.id === courseId)) {
        enrolledCourses.value.push(course);
        course.enrollmentCount++;
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to enroll in course';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchEnrolledCourses = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      enrolledCourses.value = await courseService.getEnrolledCourses();
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch enrolled courses';
    } finally {
      isLoading.value = false;
    }
  };

  const updateFilters = (newFilters: Partial<CourseFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  const clearFilters = () => {
    filters.value = {
      category: null,
      difficulty: null,
      price: null,
      search: ''
    };
  };

  return {
    // State
    courses,
    currentCourse,
    enrolledCourses,
    isLoading,
    error,
    filters,
    
    // Getters
    filteredCourses,
    coursesByCategory,
    popularCourses,
    
    // Actions
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    fetchEnrolledCourses,
    updateFilters,
    clearFilters
  };
});