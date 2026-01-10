<template>
  <div class="create-course-view">
    <!-- Header -->
    <section class="create-course-header">
      <div class="header-container">
        <div class="breadcrumb">
          <router-link to="/dashboard" class="breadcrumb-link">
            <font-awesome-icon :icon="['fas', 'arrow-left']" />
            Back to Dashboard
          </router-link>
        </div>
        
        <h1 class="page-title">Create New Course</h1>
        <p class="page-subtitle">Share your knowledge and create an engaging learning experience</p>
      </div>
    </section>

    <!-- Course Creation Form -->
    <section class="create-course-content">
      <div class="content-container">
        <div class="form-wrapper">
          <!-- Progress Steps -->
          <div class="progress-steps">
            <div 
              v-for="(step, index) in steps" 
              :key="step.id"
              class="step-item"
              :class="{ 
                active: currentStep === index, 
                completed: index < currentStep 
              }"
            >
              <div class="step-number">
                <font-awesome-icon 
                  v-if="index < currentStep"
                  :icon="['fas', 'check']"
                />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div class="step-info">
                <h4 class="step-title">{{ step.title }}</h4>
                <p class="step-description">{{ step.description }}</p>
              </div>
            </div>
          </div>

          <!-- Form Content -->
          <div class="form-content">
            <form @submit.prevent="handleSubmit">
              <!-- Step 1: Basic Information -->
              <div v-if="currentStep === 0" class="form-step">
                <h2 class="step-heading">Basic Information</h2>
                
                <div class="form-grid">
                  <div class="form-group full-width">
                    <label for="title" class="form-label">Course Title *</label>
                    <input
                      id="title"
                      v-model="courseData.title"
                      type="text"
                      class="form-input"
                      placeholder="Enter an engaging course title"
                      required
                    />
                    <small class="form-hint">Keep it clear and descriptive (60 characters recommended)</small>
                  </div>

                  <div class="form-group full-width">
                    <label for="subtitle" class="form-label">Course Subtitle</label>
                    <input
                      id="subtitle"
                      v-model="courseData.subtitle"
                      type="text"
                      class="form-input"
                      placeholder="A brief description of what students will learn"
                    />
                  </div>

                  <div class="form-group">
                    <label for="category" class="form-label">Category *</label>
                    <select
                      id="category"
                      v-model="courseData.category"
                      class="form-select"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="programming">Programming</option>
                      <option value="design">Design</option>
                      <option value="business">Business</option>
                      <option value="data-science">Data Science</option>
                      <option value="ai-ml">AI & Machine Learning</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="difficulty" class="form-label">Difficulty Level *</label>
                    <select
                      id="difficulty"
                      v-model="courseData.difficulty"
                      class="form-select"
                      required
                    >
                      <option value="">Select difficulty</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="language" class="form-label">Language</label>
                    <select
                      id="language"
                      v-model="courseData.language"
                      class="form-select"
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="price" class="form-label">Price (USD)</label>
                    <input
                      id="price"
                      v-model.number="courseData.price"
                      type="number"
                      class="form-input"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                    <small class="form-hint">Set to 0 for free course</small>
                  </div>

                  <div class="form-group full-width">
                    <label for="description" class="form-label">Course Description *</label>
                    <textarea
                      id="description"
                      v-model="courseData.description"
                      class="form-textarea"
                      rows="6"
                      placeholder="Describe what students will learn and why they should take this course"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Step 2: Learning Objectives -->
              <div v-if="currentStep === 1" class="form-step">
                <h2 class="step-heading">Learning Objectives</h2>
                
                <div class="objectives-section">
                  <p class="section-description">
                    What will students be able to do after completing your course? 
                    List specific, measurable learning outcomes.
                  </p>
                  
                  <div class="objectives-list">
                    <div 
                      v-for="(objective, index) in courseData.learningObjectives" 
                      :key="index"
                      class="objective-item"
                    >
                      <input
                        v-model="courseData.learningObjectives[index]"
                        type="text"
                        class="form-input"
                        placeholder="Students will be able to..."
                      />
                      <button
                        type="button"
                        class="remove-btn"
                        @click="removeObjective(index)"
                        :disabled="courseData.learningObjectives.length <= 1"
                      >
                        <font-awesome-icon :icon="['fas', 'times']" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    class="add-objective-btn"
                    @click="addObjective"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    Add Learning Objective
                  </button>
                </div>

                <div class="requirements-section">
                  <h3>Prerequisites & Requirements</h3>
                  <p class="section-description">
                    What should students know or have before taking this course?
                  </p>
                  
                  <div class="requirements-list">
                    <div 
                      v-for="(requirement, index) in courseData.requirements" 
                      :key="index"
                      class="requirement-item"
                    >
                      <input
                        v-model="courseData.requirements[index]"
                        type="text"
                        class="form-input"
                        placeholder="Basic knowledge of..."
                      />
                      <button
                        type="button"
                        class="remove-btn"
                        @click="removeRequirement(index)"
                        :disabled="courseData.requirements.length <= 1"
                      >
                        <font-awesome-icon :icon="['fas', 'times']" />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    class="add-requirement-btn"
                    @click="addRequirement"
                  >
                    <font-awesome-icon :icon="['fas', 'plus']" />
                    Add Requirement
                  </button>
                </div>
              </div>

              <!-- Step 3: Course Media -->
              <div v-if="currentStep === 2" class="form-step">
                <h2 class="step-heading">Course Media</h2>
                
                <div class="media-section">
                  <!-- Course Thumbnail -->
                  <div class="media-group">
                    <h3>Course Thumbnail</h3>
                    <p class="section-description">
                      Upload an eye-catching image that represents your course (1280x720 recommended)
                    </p>
                    
                    <div class="thumbnail-upload">
                      <div v-if="courseData.thumbnail" class="thumbnail-preview">
                        <img :src="courseData.thumbnail" alt="Course thumbnail" />
                        <button
                          type="button"
                          class="remove-thumbnail-btn"
                          @click="removeThumbnail"
                        >
                          <font-awesome-icon :icon="['fas', 'times']" />
                        </button>
                      </div>
                      
                      <div v-else class="thumbnail-dropzone" @click="triggerThumbnailUpload">
                        <font-awesome-icon :icon="['fas', 'cloud-upload-alt']" />
                        <h4>Upload Course Thumbnail</h4>
                        <p>Drag and drop or click to browse</p>
                        <small>JPG, PNG up to 5MB</small>
                      </div>
                      
                      <input
                        ref="thumbnailInput"
                        type="file"
                        accept="image/*"
                        style="display: none"
                        @change="handleThumbnailUpload"
                      />
                    </div>
                  </div>

                  <!-- Course Trailer -->
                  <div class="media-group">
                    <h3>Course Trailer (Optional)</h3>
                    <p class="section-description">
                      Upload a short video preview of your course to attract students
                    </p>
                    
                    <div class="trailer-upload">
                      <div v-if="courseData.trailer" class="trailer-preview">
                        <video :src="courseData.trailer" controls></video>
                        <button
                          type="button"
                          class="remove-trailer-btn"
                          @click="removeTrailer"
                        >
                          <font-awesome-icon :icon="['fas', 'times']" />
                        </button>
                      </div>
                      
                      <div v-else class="trailer-dropzone" @click="triggerTrailerUpload">
                        <font-awesome-icon :icon="['fas', 'video']" />
                        <h4>Upload Course Trailer</h4>
                        <p>Drag and drop or click to browse</p>
                        <small>MP4, MOV up to 100MB</small>
                      </div>
                      
                      <input
                        ref="trailerInput"
                        type="file"
                        accept="video/*"
                        style="display: none"
                        @change="handleTrailerUpload"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4: Review & Publish -->
              <div v-if="currentStep === 3" class="form-step">
                <h2 class="step-heading">Review & Publish</h2>
                
                <div class="review-section">
                  <div class="course-preview-card">
                    <div class="preview-header">
                      <h3>Course Preview</h3>
                      <p>This is how your course will appear to students</p>
                    </div>
                    
                    <div class="preview-content">
                      <div class="preview-image">
                        <img 
                          :src="courseData.thumbnail || '/api/placeholder/400/250'" 
                          :alt="courseData.title"
                        />
                      </div>
                      
                      <div class="preview-details">
                        <div class="preview-badges">
                          <span class="badge" :class="courseData.difficulty">{{ courseData.difficulty }}</span>
                          <span v-if="courseData.price === 0" class="badge free">Free</span>
                        </div>
                        
                        <h4 class="preview-title">{{ courseData.title || 'Course Title' }}</h4>
                        <p class="preview-subtitle">{{ courseData.subtitle || 'Course subtitle' }}</p>
                        <p class="preview-description">{{ truncateText(courseData.description, 150) }}</p>
                        
                        <div class="preview-meta">
                          <span class="meta-item">
                            <font-awesome-icon :icon="['fas', 'tag']" />
                            {{ formatCategory(courseData.category) }}
                          </span>
                          <span class="meta-item">
                            <font-awesome-icon :icon="['fas', 'globe']" />
                            {{ courseData.language || 'English' }}
                          </span>
                        </div>
                        
                        <div class="preview-price">
                          <span v-if="courseData.price === 0" class="price free">Free</span>
                          <span v-else class="price paid">${{ courseData.price }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="publish-options">
                    <h3>Publishing Options</h3>
                    
                    <div class="option-group">
                      <label class="checkbox-label">
                        <input
                          v-model="courseData.isDraft"
                          type="checkbox"
                          class="checkbox-input"
                        />
                        <span class="checkbox-custom"></span>
                        Save as draft (you can publish later)
                      </label>
                    </div>
                    
                    <div class="option-group">
                      <label class="checkbox-label">
                        <input
                          v-model="courseData.allowPreview"
                          type="checkbox"
                          class="checkbox-input"
                        />
                        <span class="checkbox-custom"></span>
                        Allow students to preview first lesson
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="form-actions">
                <button
                  v-if="currentStep > 0"
                  type="button"
                  class="btn-secondary-large"
                  @click="previousStep"
                >
                  <font-awesome-icon :icon="['fas', 'arrow-left']" />
                  Previous
                </button>
                
                <button
                  v-if="currentStep < steps.length - 1"
                  type="button"
                  class="btn-primary-large"
                  @click="nextStep"
                  :disabled="!canProceed"
                >
                  Next
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </button>
                
                <button
                  v-if="currentStep === steps.length - 1"
                  type="submit"
                  class="btn-primary-large"
                  :disabled="isSubmitting"
                >
                  <font-awesome-icon :icon="isSubmitting ? ['fas', 'spinner'] : ['fas', 'check']" />
                  {{ isSubmitting ? 'Creating...' : (courseData.isDraft ? 'Save Draft' : 'Publish Course') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCoursesStore } from '@/store/modules/courses';

const router = useRouter();
const coursesStore = useCoursesStore();

// Reactive state
const currentStep = ref(0);
const isSubmitting = ref(false);
const thumbnailInput = ref<HTMLInputElement>();
const trailerInput = ref<HTMLInputElement>();

// Form data
const courseData = ref({
  title: '',
  subtitle: '',
  description: '',
  category: '',
  difficulty: '',
  language: 'english',
  price: 0,
  learningObjectives: [''],
  requirements: [''],
  thumbnail: '',
  trailer: '',
  isDraft: false,
  allowPreview: true
});

// Steps configuration
const steps = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Course title, category, and description'
  },
  {
    id: 'objectives',
    title: 'Learning Objectives',
    description: 'What students will learn and requirements'
  },
  {
    id: 'media',
    title: 'Course Media',
    description: 'Thumbnail and trailer video'
  },
  {
    id: 'review',
    title: 'Review & Publish',
    description: 'Review and publish your course'
  }
];

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return courseData.value.title && 
             courseData.value.category && 
             courseData.value.difficulty && 
             courseData.value.description;
    case 1:
      return courseData.value.learningObjectives.some(obj => obj.trim()) &&
             courseData.value.requirements.some(req => req.trim());
    case 2:
      return true; // Media is optional
    case 3:
      return true;
    default:
      return false;
  }
});

// Methods
const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const addObjective = () => {
  courseData.value.learningObjectives.push('');
};

const removeObjective = (index: number) => {
  if (courseData.value.learningObjectives.length > 1) {
    courseData.value.learningObjectives.splice(index, 1);
  }
};

const addRequirement = () => {
  courseData.value.requirements.push('');
};

const removeRequirement = (index: number) => {
  if (courseData.value.requirements.length > 1) {
    courseData.value.requirements.splice(index, 1);
  }
};

const triggerThumbnailUpload = () => {
  thumbnailInput.value?.click();
};

const handleThumbnailUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // In a real app, upload to server and get URL
    const reader = new FileReader();
    reader.onload = (e) => {
      courseData.value.thumbnail = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeThumbnail = () => {
  courseData.value.thumbnail = '';
};

const triggerTrailerUpload = () => {
  trailerInput.value?.click();
};

const handleTrailerUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // In a real app, upload to server and get URL
    const reader = new FileReader();
    reader.onload = (e) => {
      courseData.value.trailer = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const removeTrailer = () => {
  courseData.value.trailer = '';
};

const formatCategory = (category: string): string => {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  try {
    // Clean up empty objectives and requirements
    const cleanedData = {
      ...courseData.value,
      learningObjectives: courseData.value.learningObjectives.filter(obj => obj.trim()),
      requirements: courseData.value.requirements.filter(req => req.trim())
    };
    
    await coursesStore.createCourse(cleanedData);
    
    // Redirect to course management or dashboard
    router.push('/my-courses');
  } catch (error) {
    console.error('Failed to create course:', error);
    // Show error notification
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Header */
.create-course-header {
  background: var(--fana-bg-secondary);
  padding: var(--fana-space-12) 0 var(--fana-space-8);
  border-bottom: 1px solid var(--fana-border-color);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
}

.breadcrumb {
  margin-bottom: var(--fana-space-4);
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: var(--fana-text-secondary);
  text-decoration: none;
  font-size: var(--fana-text-sm);
  transition: color var(--fana-transition-base);
}

.breadcrumb-link:hover {
  color: var(--fana-primary);
  text-decoration: none;
}

.page-title {
  font-size: var(--fana-text-4xl);
  font-weight: 800;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.page-subtitle {
  font-size: var(--fana-text-lg);
  color: var(--fana-text-secondary);
  margin: 0;
}

/* Content */
.create-course-content {
  padding: var(--fana-space-16) 0;
  background: var(--fana-bg-primary);
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--fana-space-6);
}

.form-wrapper {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  box-shadow: var(--fana-shadow-lg);
  overflow: hidden;
}

/* Progress Steps */
.progress-steps {
  background: var(--fana-bg-secondary);
  padding: var(--fana-space-8);
  border-bottom: 1px solid var(--fana-border-color);
}

.step-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-4);
  padding: var(--fana-space-4) 0;
  position: relative;
}

.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 60px;
  width: 2px;
  height: 40px;
  background: var(--fana-border-color);
}

.step-item.completed::after {
  background: var(--fana-primary);
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: var(--fana-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: var(--fana-text-sm);
  background: var(--fana-bg-card);
  border: 2px solid var(--fana-border-color);
  color: var(--fana-text-muted);
  transition: all var(--fana-transition-base);
}

.step-item.active .step-number {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

.step-item.completed .step-number {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
  color: white;
}

.step-title {
  font-size: var(--fana-text-base);
  font-weight: 600;
  margin-bottom: var(--fana-space-1);
  color: var(--fana-text-primary);
}

.step-description {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin: 0;
}

/* Form Content */
.form-content {
  padding: var(--fana-space-8);
}

.step-heading {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-8);
  color: var(--fana-text-primary);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--fana-space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-primary);
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--fana-space-3) var(--fana-space-4);
  border: 1px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-base);
  background: var(--fana-bg-primary);
  transition: all var(--fana-transition-base);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--fana-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-hint {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

/* Objectives and Requirements */
.objectives-section,
.requirements-section {
  margin-bottom: var(--fana-space-8);
}

.section-description {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-6);
  line-height: 1.6;
}

.objectives-list,
.requirements-list {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
  margin-bottom: var(--fana-space-4);
}

.objective-item,
.requirement-item {
  display: flex;
  gap: var(--fana-space-3);
  align-items: center;
}

.objective-item input,
.requirement-item input {
  flex: 1;
}

.remove-btn {
  width: 40px;
  height: 40px;
  background: var(--fana-accent-red);
  color: white;
  border: none;
  border-radius: var(--fana-radius-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover:not(:disabled) {
  background: #dc2626;
  transform: scale(1.05);
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.add-objective-btn,
.add-requirement-btn {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  background: var(--fana-bg-secondary);
  color: var(--fana-primary);
  border: 1px dashed var(--fana-primary);
  border-radius: var(--fana-radius-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  font-weight: 500;
}

.add-objective-btn:hover,
.add-requirement-btn:hover {
  background: var(--fana-primary);
  color: white;
}

/* Media Upload */
.media-section {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-8);
}

.media-group h3 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.thumbnail-upload,
.trailer-upload {
  margin-top: var(--fana-space-4);
}

.thumbnail-preview,
.trailer-preview {
  position: relative;
  display: inline-block;
}

.thumbnail-preview img {
  width: 300px;
  height: 169px;
  object-fit: cover;
  border-radius: var(--fana-radius-lg);
}

.trailer-preview video {
  width: 400px;
  height: 225px;
  border-radius: var(--fana-radius-lg);
}

.remove-thumbnail-btn,
.remove-trailer-btn {
  position: absolute;
  top: var(--fana-space-2);
  right: var(--fana-space-2);
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  border-radius: var(--fana-radius-full);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.remove-thumbnail-btn:hover,
.remove-trailer-btn:hover {
  background: var(--fana-accent-red);
}

.thumbnail-dropzone,
.trailer-dropzone {
  width: 300px;
  height: 200px;
  border: 2px dashed var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  text-align: center;
  padding: var(--fana-space-4);
}

.thumbnail-dropzone:hover,
.trailer-dropzone:hover {
  border-color: var(--fana-primary);
  background: rgba(99, 102, 241, 0.05);
}

.thumbnail-dropzone svg,
.trailer-dropzone svg {
  font-size: 2rem;
  color: var(--fana-text-muted);
  margin-bottom: var(--fana-space-3);
}

.thumbnail-dropzone h4,
.trailer-dropzone h4 {
  font-size: var(--fana-text-base);
  font-weight: 600;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.thumbnail-dropzone p,
.trailer-dropzone p {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-2);
}

.thumbnail-dropzone small,
.trailer-dropzone small {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

/* Review Section */
.review-section {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-8);
}

.course-preview-card {
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-xl);
  padding: var(--fana-space-6);
  border: 1px solid var(--fana-border-color);
}

.preview-header {
  margin-bottom: var(--fana-space-6);
}

.preview-header h3 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.preview-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: var(--fana-space-6);
}

.preview-image img {
  width: 100%;
  height: 112px;
  object-fit: cover;
  border-radius: var(--fana-radius-lg);
}

.preview-badges {
  display: flex;
  gap: var(--fana-space-2);
  margin-bottom: var(--fana-space-3);
}

.badge {
  padding: var(--fana-space-1) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 600;
  text-transform: capitalize;
}

.badge.beginner {
  background: rgba(16, 185, 129, 0.1);
  color: var(--fana-accent-green);
}

.badge.intermediate {
  background: rgba(245, 158, 11, 0.1);
  color: var(--fana-accent-orange);
}

.badge.advanced {
  background: rgba(239, 68, 68, 0.1);
  color: var(--fana-accent-red);
}

.badge.free {
  background: var(--fana-accent-green);
  color: white;
}

.preview-title {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.preview-subtitle {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-3);
}

.preview-description {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--fana-space-4);
}

.preview-meta {
  display: flex;
  gap: var(--fana-space-4);
  margin-bottom: var(--fana-space-4);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-muted);
}

.preview-price .price.free {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-accent-green);
}

.preview-price .price.paid {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-primary);
}

/* Publish Options */
.publish-options h3 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.option-group {
  margin-bottom: var(--fana-space-4);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  cursor: pointer;
  font-size: var(--fana-text-base);
  color: var(--fana-text-primary);
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--fana-border-color);
  border-radius: var(--fana-radius-sm);
  position: relative;
  transition: all var(--fana-transition-base);
}

.checkbox-input:checked + .checkbox-custom {
  background: var(--fana-primary);
  border-color: var(--fana-primary);
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: space-between;
  gap: var(--fana-space-4);
  margin-top: var(--fana-space-8);
  padding-top: var(--fana-space-8);
  border-top: 1px solid var(--fana-border-color);
}

.btn-primary-large,
.btn-secondary-large {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-4) var(--fana-space-8);
  border-radius: var(--fana-radius-xl);
  font-size: var(--fana-text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  border: none;
}

.btn-primary-large {
  background: var(--fana-gradient-primary);
  color: white;
  margin-left: auto;
}

.btn-primary-large:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

.btn-primary-large:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary-large {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
}

.btn-secondary-large:hover {
  background: var(--fana-bg-tertiary);
  border-color: var(--fana-primary);
  color: var(--fana-primary);
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .preview-content {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-primary-large {
    margin-left: 0;
  }
}
</style>