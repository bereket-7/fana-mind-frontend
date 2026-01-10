export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  currency: string;
  thumbnail: string;
  previewVideo?: string;
  duration: number; // in minutes
  language: string;
  subtitles: string[];
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
  targetAudience: string[];
  instructorId: string;
  instructor: Instructor;
  lessons: Lesson[];
  quizzes: Quiz[];
  assignments: Assignment[];
  resources: Resource[];
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isPublished: boolean;
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  completionCertificate: boolean;
  estimatedHours: number;
  skillLevel: string[];
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatar: string;
  expertise: string[];
  rating: number;
  totalStudents: number;
  totalCourses: number;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: LessonContent;
  duration: number;
  order: number;
  isPreview: boolean;
  resources: Resource[];
  quiz?: Quiz;
  assignment?: Assignment;
  isCompleted?: boolean;
  completedAt?: Date;
}

export interface LessonContent {
  type: 'video' | 'text' | 'interactive' | 'code' | 'simulation';
  data: VideoContent | TextContent | InteractiveContent | CodeContent | SimulationContent;
}

export interface VideoContent {
  url: string;
  duration: number;
  subtitles: Subtitle[];
  chapters: VideoChapter[];
  quality: VideoQuality[];
}

export interface TextContent {
  html: string;
  readingTime: number;
}

export interface InteractiveContent {
  type: 'quiz' | 'drag-drop' | 'hotspot' | 'timeline';
  config: Record<string, any>;
}

export interface CodeContent {
  language: string;
  code: string;
  solution?: string;
  tests: CodeTest[];
  environment: 'browser' | 'node' | 'python' | 'java';
}

export interface SimulationContent {
  type: '3d' | 'ar' | 'vr' | 'physics';
  config: Record<string, any>;
  assets: string[];
}

export interface Subtitle {
  language: string;
  url: string;
}

export interface VideoChapter {
  title: string;
  startTime: number;
  endTime: number;
}

export interface VideoQuality {
  resolution: string;
  url: string;
  bitrate: number;
}

export interface CodeTest {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  attempts: number;
  randomizeQuestions: boolean;
  showCorrectAnswers: boolean;
  isGraded: boolean;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay' | 'code' | 'drag-drop';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: Date;
  maxPoints: number;
  submissionType: 'file' | 'text' | 'url' | 'code';
  allowedFileTypes?: string[];
  maxFileSize?: number;
  rubric?: AssignmentRubric;
  isGroupAssignment: boolean;
  maxGroupSize?: number;
}

export interface AssignmentRubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}

export interface RubricCriterion {
  name: string;
  description: string;
  levels: RubricLevel[];
}

export interface RubricLevel {
  name: string;
  description: string;
  points: number;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'audio' | 'link' | 'image';
  url: string;
  size?: number;
  description?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
}

export interface CourseFilters {
  category: string | null;
  difficulty: string | null;
  price: 'free' | 'paid' | null;
  search: string;
  rating?: number;
  duration?: { min: number; max: number };
  language?: string;
}

export interface CourseProgress {
  courseId: string;
  userId: string;
  completedLessons: string[];
  completedQuizzes: string[];
  completedAssignments: string[];
  currentLesson?: string;
  completionPercentage: number;
  timeSpent: number; // in minutes
  lastAccessedAt: Date;
  startedAt: Date;
  completedAt?: Date;
  certificateIssued: boolean;
}