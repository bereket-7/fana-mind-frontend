<template>
    <div>
      <BFormFile
        v-model="file"
        accept="image/*"
        placeholder="Choose thumbnail or drop here"
        drop-placeholder="Drop file here..."
        @change="handleFileChange"
        class="mb-2"
      />
      
      <div v-if="previewUrl" class="mt-2">
        <img 
          :src="previewUrl" 
          alt="Preview" 
          class="img-thumbnail"
          style="max-height: 200px;"
        >
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['file-changed'])
  const file = ref(null)
  const previewUrl = ref(null)
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      previewUrl.value = URL.createObjectURL(selectedFile)
      emit('file-changed', selectedFile)
    }
  }
  </script>