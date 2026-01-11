<template>
  <div class="course-instructor">
    <div class="instructor-profile">
      <img :src="instructor.avatar" :alt="instructor.name" class="instructor-avatar" />
      <div class="instructor-info">
        <h3 class="instructor-name">{{ instructor.name }}</h3>
        <p class="instructor-title">{{ instructor.title }}</p>
        <div class="instructor-stats">
          <div class="stat-item">
            <font-awesome-icon :icon="['fas', 'star']" />
            <span>{{ instructor.rating }} Instructor Rating</span>
          </div>
          <div class="stat-item">
            <font-awesome-icon :icon="['fas', 'users']" />
            <span>{{ formatNumber(instructor.studentCount) }} Students</span>
          </div>
          <div class="stat-item">
            <font-awesome-icon :icon="['fas', 'play-circle']" />
            <span>{{ instructor.courseCount }} Courses</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="instructor-bio">
      <h4>About the Instructor</h4>
      <p>{{ instructor.bio }}</p>
    </div>
    
    <div class="instructor-courses">
      <h4>More Courses by {{ instructor.name }}</h4>
      <div class="courses-grid">
        <div v-for="course in instructor.otherCourses" :key="course.id" class="course-item">
          <img :src="course.thumbnail" :alt="course.title" class="course-thumbnail" />
          <div class="course-details">
            <h5 class="course-title">{{ course.title }}</h5>
            <div class="course-meta">
              <span class="course-rating">
                <font-awesome-icon :icon="['fas', 'star']" />
                {{ course.rating }}
              </span>
              <span class="course-price">${{ course.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  studentCount: number;
  courseCount: number;
  otherCourses: Array<{
    id: string;
    title: string;
    thumbnail: string;
    rating: number;
    price: number;
  }>;
}

interface Props {
  instructor: Instructor;
}

const props = defineProps<Props>();

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};
</script>

<style scoped>
.course-instructor {
  max-width: 100%;
}

.instructor-profile {
  display: flex;
  gap: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
  padding: var(--fana-space-6);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-xl);
}

.instructor-avatar {
  width: 120px;
  height: 120px;
  border-radius: var(--fana-radius-full);
  object-fit: cover;
}

.instructor-name {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
}

.instructor-title {
  font-size: var(--fana-text-base);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-4);
}

.instructor-stats {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.stat-item svg {
  color: var(--fana-primary);
}

.instructor-bio {
  margin-bottom: var(--fana-space-8);
}

.instructor-bio h4 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
}

.instructor-bio p {
  color: var(--fana-text-secondary);
  line-height: 1.7;
}

.instructor-courses h4 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-6);
  color: var(--fana-text-primary);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--fana-space-4);
}

.course-item {
  display: flex;
  gap: var(--fana-space-3);
  padding: var(--fana-space-4);
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-lg);
  border: 1px solid var(--fana-border-color);
  transition: all var(--fana-transition-base);
}

.course-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-sm);
}

.course-thumbnail {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--fana-radius-md);
}

.course-title {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  margin-bottom: var(--fana-space-2);
  color: var(--fana-text-primary);
  line-height: 1.3;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-rating {
  display: flex;
  align-items: center;
  gap: var(--fana-space-1);
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}

.course-rating svg {
  color: var(--fana-accent-orange);
}

.course-price {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-primary);
}

@media (max-width: 768px) {
  .instructor-profile {
    flex-direction: column;
    text-align: center;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>