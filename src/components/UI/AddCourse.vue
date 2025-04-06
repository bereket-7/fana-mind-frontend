<template>
    <BCard no-body class="course-creation-card shadow-sm">
      <BCardHeader class="bg-white border-bottom-0">
        <h4 class="mb-0">Create New Course</h4>
      </BCardHeader>
      
      <BCardBody>
        <BForm @submit.prevent="handleSubmit">
          <!-- Course Title -->
          <BFormGroup label="Course Title" label-for="title" class="mb-4">
            <BFormInput
              id="title"
              v-model="form.title"
              placeholder="e.g., Advanced Web Development"
              required
            />
          </BFormGroup>
  
          <!-- Course Category -->
          <BFormGroup label="Category" label-for="category" class="mb-4">
            <BFormSelect
              id="category"
              v-model="form.category"
              :options="categories"
              required
            />
          </BFormGroup>
  
          <!-- Course Description -->
          <BFormGroup label="Description" label-for="description" class="mb-4">
            <TiptapEditor v-model="form.description" />
          </BFormGroup>
  
          <!-- Course Thumbnail Upload -->
          <BFormGroup label="Thumbnail" class="mb-4">
            <ImageUploader @file-changed="handleThumbnailUpload" />
            <small class="text-muted">Recommended size: 800x450 pixels</small>
          </BFormGroup>
  
          <!-- Course Price -->
          <BFormGroup label="Price" label-for="price" class="mb-4">
            <BInputGroup>
              <BInputGroupText>$</BInputGroupText>
              <BFormInput
                id="price"
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </BInputGroup>
          </BFormGroup>
  
          <!-- Course Visibility -->
          <BFormGroup label="Visibility" class="mb-4">
            <BFormRadioGroup
              v-model="form.isPublic"
              :options="[
                { value: true, text: 'Public (Listed in catalog)' },
                { value: false, text: 'Private (Only accessible via link)' }
              ]"
            />
          </BFormGroup>
  
          <div class="d-flex justify-content-end gap-3 mt-5">
            <BButton variant="outline-secondary" @click="resetForm">
              Reset
            </BButton>
            <BButton
              type="submit"
              variant="primary"
              :disabled="loading"
              class="px-4"
            >
              <BSpinner small v-if="loading" class="me-2" />
              {{ loading ? 'Creating...' : 'Create Course' }}
            </BButton>
          </div>
        </BForm>
      </BCardBody>
    </BCard>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  //import TiptapEditor from "src/components/Common/TiptapEditor.vue";
  //import ImageUploader from "src/components/Common/ImageUploader.vue";

import TiptapEditor from '../Common/TiptapEditor.vue'
import ImageUploader from '../Common/ImageUploader.vue'
  
  const loading = ref(false);
  const form = ref({
    title: '',
    category: null,
    description: '',
    thumbnail: null,
    price: 0,
    isPublic: true
  });
  
  const categories = [
    { value: 'web-dev', text: 'Web Development' },
    { value: 'data-science', text: 'Data Science' },
    { value: 'business', text: 'Business' },
    { value: 'design', text: 'Design' },
    { value: 'marketing', text: 'Marketing' }
  ];
  
  const handleThumbnailUpload = (file) => {
    form.value.thumbnail = file;
  };
  
  const handleSubmit = async () => {
    loading.value = true;
    try {
      // API call to create course
      console.log('Creating course:', form.value);
      // await createCourse(form.value);
      // redirect to course edit page
    } catch (error) {
      console.error('Course creation failed:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const resetForm = () => {
    form.value = {
      title: '',
      category: null,
      description: '',
      thumbnail: null,
      price: 0,
      isPublic: true
    };
  };
  </script>
  
  <style scoped>
  .course-creation-card {
    border-radius: 0.75rem;
    border: none;
  }
  
  :deep(.tiptap-editor) {
    min-height: 200px;
    border-radius: 0.5rem;
    border: 1px solid #dee2e6;
  }
  /* ProseMirror specific styles */
.ProseMirror {
  padding: 0.5rem;
  min-height: 150px;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror p {
  margin-bottom: 1rem;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
  </style>