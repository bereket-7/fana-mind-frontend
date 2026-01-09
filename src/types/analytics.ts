export interface AnalyticsData {
  userId: string;
  courseId?: string;
  lessonId?: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: Date;
  sessionId: string;
  deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  screenResolution: string;
  timezone: string;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  completionPercentage: number;
  lessonsCompleted: number;
  totalLessons: number;
  quizzesCompleted: number;
  totalQuizzes: number;
  averageScore: number;
  timeSpent: number; // in minutes
  lastActivity: Date;
  enrollmentDate: Date;
  completionDate?: Date;
  strugglingAreas: string[];
  strengths: string[];
}

export interface CourseAnalytics {
  courseId: string;
  courseName: string;
  instructorId: string;
  totalEnrollments: number;
  activeStudents: number;
  completionRate: number;
  averageScore: number;
  averageTimeToComplete: number; // in days
  dropoffPoints: LessonDropoff[];
  popularLessons: LessonPopularity[];
  quizPerformance: QuizAnalytics[];
  studentFeedback: FeedbackSummary;
  revenueGenerated: number;
  engagementMetrics: EngagementMetrics;
}

export interface LessonDropoff {
  lessonId: string;
  lessonTitle: string;
  dropoffRate: number;
  averageWatchTime: number;
  completionRate: number;
}

export interface LessonPopularity {
  lessonId: string;
  lessonTitle: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  averageRating: number;
}

export interface QuizAnalytics {
  quizId: string;
  quizTitle: string;
  attempts: number;
  averageScore: number;
  passRate: number;
  averageTimeSpent: number;
  difficultQuestions: QuestionDifficulty[];
}

export interface QuestionDifficulty {
  questionId: string;
  question: string;
  correctAnswerRate: number;
  averageTimeSpent: number;
  commonWrongAnswers: string[];
}

export interface FeedbackSummary {
  averageRating: number;
  totalReviews: number;
  sentimentScore: number; // -1 to 1
  commonPraise: string[];
  commonComplaints: string[];
  improvementSuggestions: string[];
}

export interface EngagementMetrics {
  dailyActiveUsers: number[];
  weeklyActiveUsers: number[];
  monthlyActiveUsers: number[];
  sessionDuration: number;
  bounceRate: number;
  returnRate: number;
  socialShares: number;
  forumParticipation: number;
}

export interface LearningMetrics {
  userId: string;
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalLessonsCompleted: number;
  totalQuizzesTaken: number;
  averageQuizScore: number;
  totalTimeSpent: number; // in minutes
  learningStreak: number; // consecutive days
  skillsAcquired: Skill[];
  learningPath: LearningPathProgress[];
  achievements: Achievement[];
  dailyEngagement: number[]; // last 7 days
  weeklyGoals: WeeklyGoal[];
  personalizedRecommendations: Recommendation[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  progress: number; // 0-100
  acquiredAt: Date;
  lastPracticedAt: Date;
}

export interface LearningPathProgress {
  pathId: string;
  pathName: string;
  totalCourses: number;
  completedCourses: number;
  currentCourse?: string;
  estimatedCompletion: Date;
  progress: number; // 0-100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'completion' | 'streak' | 'score' | 'social' | 'time';
  earnedAt: Date;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: 'lessons' | 'minutes' | 'quizzes' | 'courses';
  deadline: Date;
  completed: boolean;
}

export interface Recommendation {
  type: 'course' | 'lesson' | 'skill' | 'path';
  itemId: string;
  title: string;
  reason: string;
  confidence: number; // 0-1
  priority: 'low' | 'medium' | 'high';
}

export interface ReportConfig {
  type: 'student' | 'course' | 'instructor' | 'institution';
  dateRange: {
    start: Date;
    end: Date;
  };
  filters: Record<string, any>;
  metrics: string[];
  format: 'pdf' | 'csv' | 'json' | 'excel';
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
  };
}