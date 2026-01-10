<template>
  <div class="wishlist-course-card">
    <div class="course-image-container">
      <img :src="course.thumbnail" :alt="course.title" class="course-image" />
      <div v-if="course.isOnSale" class="sale-badge">
        {{ Math.round((1 - course.price / course.originalPrice) * 100) }}% OFF
      </div>
      <button class="remove-btn" @click="removeFromWishlist">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
    </div>

    <div class="course-content">
      <h3 class="course-title">{{ course.title }}</h3>
      <p class="course-instructor">by {{ course.instructor }}</p>

      <div class="course-rating">
        <div class="rating-stars">
          <font-awesome-icon 
            v-for="n in 5" 
            :key="n"
            :icon="['fas', 'star']"
            :class="{ filled: n <= Math.floor(course.rating) }"
          />
        </div>
        <span class="rating-text">{{ course.rating.toFixed(1) }}</span>
      </div>

      <div class="course-pricing">
        <div v-if="course.price === 0" class="price free">
          Free
        </div>
        <div v-else class="price-container">
          <span v-if="course.originalPrice && course.originalPrice > course.price" class="original-price">
            ${{ course.originalPrice }}
          </span>
          <span class="current-price">${{ course.price }}</span>
        </div>
      </div>

      <div class="course-actions">
        <button class="btn-primary-modern" @click="enrollInCourse">
          <font-awesome-icon :icon="['fas', 'plus']" />
          {{ course.price === 0 ? 'Enroll Free' : 'Enroll Now' }}
        </button>
      </div>

      <div class="course-meta">
        <span class="added-date">
          Added: {{ formatDate(course.addedDate) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WishlistCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  rating: number;
  addedDate: string;
  isOnSale: boolean;
}

interface Props {
  course: WishlistCourse;
}

interface Emits {
  (e: 'enroll', courseId: string): void;
  (e: 'remove', courseId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const enrollInCourse = () => {
  emit('enroll', props.course.id);
};

const removeFromWishlist = () => {
  emit('remove', props.course.id);
};
</script>

<style scoped>
.wishlist-course-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
  transition: all var(--fana-transition-base);
  border: 1px solid var(--fana-border-color);
}

.wishlist-course-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--fana-shadow-lg);
}

.course-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sale-badge {
  position: absolute;
  top: var(--fana-space-4);
  left: var(--fana-space-4);
  background: var(--fana-accent-red);
  color: white;
  padding: var(--fana-space-2) var(--fana-space-3);
  border-radius: var(--fana-radius-full);
  font-size: var(--fana-text-xs);
  font-weight: 700;
  text-transform: uppercase;
}

.remove-btn {
  position: absolute;
  top: var(--fana-space-4);
  right: var(--fana-space-4);
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: var(--fana-radius-full);
  cursor: pointer;
  transition: all var(--fana-transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: var(--fana-accent-red);
  transform: scale(1.1);
}

.course-content {
  padding: var(--fana-space-6);
}

.course-title {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin-bottom: var(--fana-space-2);
  line-height: 1.3;
}

.course-instructor {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-4);
}

.course-rating {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  margin-bottom: var(--fana-space-4);
}

.rating-stars {
  display: flex;
  gap: var(--fana-space-1);
}

.rating-stars svg {
  color: var(--fana-gray-300);
  font-size: var(--fana-text-sm);
}

.rating-stars svg.filled {
  color: var(--fana-accent-orange);
}

.rating-text {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-text-secondary);
}

.course-pricing {
  margin-bottom: var(--fana-space-6);
}

.price.free {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  color: var(--fana-accent-green);
}

.price-container {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
}

.original-price {
  font-size: var(--fana-text-base);
  color: var(--fana-text-muted);
  text-decoration: line-through;
}

.current-price {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  color: var(--fana-primary);
}

.course-actions {
  margin-bottom: var(--fana-space-4);
}

.btn-primary-modern {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  background: var(--fana-gradient-primary);
  color: white;
  border: none;
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.btn-primary-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-lg);
}

.course-meta {
  text-align: center;
}

.added-date {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
}
</style>