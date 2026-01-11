<template>
  <div class="certificate-card">
    <div class="certificate-preview">
      <img :src="certificate.thumbnail" :alt="`Certificate for ${certificate.courseTitle}`" class="certificate-image" />
      <div class="certificate-overlay">
        <div class="certificate-icon">
          <font-awesome-icon :icon="['fas', 'certificate']" />
        </div>
      </div>
    </div>

    <div class="certificate-content">
      <h3 class="certificate-title">Certificate of Completion</h3>
      <h4 class="course-title">{{ certificate.courseTitle }}</h4>
      <p class="instructor-name">by {{ certificate.instructor }}</p>

      <div class="completion-info">
        <div class="completion-date">
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          <span>Completed: {{ formatDate(certificate.completionDate) }}</span>
        </div>
      </div>

      <div class="certificate-actions">
        <button class="btn-primary-small" @click="downloadCertificate">
          <font-awesome-icon :icon="['fas', 'download']" />
          Download
        </button>
        <button class="btn-secondary-small" @click="shareCertificate">
          <font-awesome-icon :icon="['fas', 'share-alt']" />
          Share
        </button>
      </div>

      <div class="certificate-verification">
        <small>Certificate ID: {{ certificate.id }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Certificate {
  id: string;
  courseTitle: string;
  instructor: string;
  completionDate: string;
  certificateUrl: string;
  thumbnail: string;
}

interface Props {
  certificate: Certificate;
}

interface Emits {
  (e: 'download', certificateId: string): void;
  (e: 'share', certificateId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const downloadCertificate = () => {
  emit('download', props.certificate.id);
};

const shareCertificate = () => {
  emit('share', props.certificate.id);
};
</script>

<style scoped>
.certificate-card {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-2xl);
  overflow: hidden;
  box-shadow: var(--fana-shadow-sm);
  transition: all var(--fana-transition-base);
  border: 1px solid var(--fana-border-color);
}

.certificate-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--fana-shadow-lg);
}

.certificate-preview {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.certificate-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.certificate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
}

.certificate-icon {
  width: 80px;
  height: 80px;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  box-shadow: var(--fana-shadow-lg);
}

.certificate-content {
  padding: var(--fana-space-6);
}

.certificate-title {
  font-size: var(--fana-text-sm);
  font-weight: 600;
  color: var(--fana-primary);
  margin-bottom: var(--fana-space-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.course-title {
  font-size: var(--fana-text-lg);
  font-weight: 700;
  color: var(--fana-text-primary);
  margin-bottom: var(--fana-space-2);
  line-height: 1.3;
}

.instructor-name {
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
  margin-bottom: var(--fana-space-4);
}

.completion-info {
  margin-bottom: var(--fana-space-6);
}

.completion-date {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  font-size: var(--fana-text-sm);
  color: var(--fana-text-secondary);
}

.completion-date svg {
  color: var(--fana-accent-green);
}

.certificate-actions {
  display: flex;
  gap: var(--fana-space-2);
  margin-bottom: var(--fana-space-4);
}

.btn-primary-small,
.btn-secondary-small {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  border: none;
}

.btn-primary-small {
  background: var(--fana-gradient-primary);
  color: white;
}

.btn-primary-small:hover {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-sm);
}

.btn-secondary-small {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
}

.btn-secondary-small:hover {
  background: var(--fana-bg-tertiary);
  border-color: var(--fana-primary);
  color: var(--fana-primary);
}

.certificate-verification {
  text-align: center;
  padding-top: var(--fana-space-3);
  border-top: 1px solid var(--fana-border-color);
}

.certificate-verification small {
  font-size: var(--fana-text-xs);
  color: var(--fana-text-muted);
  font-family: var(--fana-font-family-mono);
}
</style>