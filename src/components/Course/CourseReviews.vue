<template>
  <div class="course-reviews">
    <div class="reviews-header">
      <h3>Student Reviews</h3>
      <div class="rating-summary">
        <div class="overall-rating">
          <span class="rating-number">{{ rating.toFixed(1) }}</span>
          <div class="rating-stars">
            <font-awesome-icon 
              v-for="n in 5" 
              :key="n"
              :icon="['fas', 'star']"
              :class="{ filled: n <= Math.floor(rating) }"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div class="reviews-list">
      <div class="review-item" v-for="review in reviews" :key="review.id">
        <div class="review-header">
          <img :src="review.user.avatar" :alt="review.user.name" class="user-avatar" />
          <div class="review-info">
            <h4 class="user-name">{{ review.user.name }}</h4>
            <div class="review-rating">
              <font-awesome-icon 
                v-for="n in 5" 
                :key="n"
                :icon="['fas', 'star']"
                :class="{ filled: n <= review.rating }"
              />
            </div>
          </div>
          <span class="review-date">{{ formatDate(review.createdAt) }}</span>
        </div>
        <p class="review-content">{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  courseId: string;
  rating: number;
}

const props = defineProps<Props>();

// Mock reviews data
const reviews = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      avatar: '/api/placeholder/40/40'
    },
    rating: 5,
    comment: 'Excellent course! Very well structured and easy to follow.',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      avatar: '/api/placeholder/40/40'
    },
    rating: 4,
    comment: 'Great content, learned a lot. Would recommend to others.',
    createdAt: '2024-01-08'
  }
];

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.course-reviews {
  max-width: 100%;
}

.reviews-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-6);
}

.overall-rating {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
}

.rating-number {
  font-size: var(--fana-text-2xl);
  font-weight: 700;
  color: var(--fana-primary);
}

.rating-stars {
  display: flex;
  gap: var(--fana-space-1);
}

.rating-stars svg {
  color: var(--fana-gray-300);
}

.rating-stars svg.filled {
  color: var(--fana-accent-orange);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-6);
}

.review-item {
  padding: var(--fana-space-6);
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-xl);
  border: 1px solid var(--fana-border-color);
}

.review-header {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  margin-bottom: var(--fana-space-4);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--fana-radius-full);
  object-fit: cover;
}

.review-info {
  flex: 1;
}

.user-name {
  font-size: var(--fana-text-base);
  font-weight: 600;
  margin-bottom: var(--fana-space-1);
  color: var(--fana-text-primary);
}

.review-rating {
  display: flex;
  gap: var(--fana-space-1);
}

.review-rating svg {
  color: var(--fana-gray-300);
  font-size: var(--fana-text-sm);
}

.review-rating svg.filled {
  color: var(--fana-accent-orange);
}

.review-date {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-muted);
}

.review-content {
  color: var(--fana-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>