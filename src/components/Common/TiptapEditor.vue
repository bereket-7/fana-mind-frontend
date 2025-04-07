<template>
    <div v-if="editor" class="tiptap-editor border rounded p-3">
      <!-- Menu Bar -->
      <div class="d-flex flex-wrap gap-1 mb-3 border-bottom pb-2">
        <BButton 
          @click="editor.chain().focus().toggleBold().run()" 
          variant="light" 
          size="sm"
          :pressed="editor.isActive('bold')"
        >
          <font-awesome-icon :icon="['fas', 'bold']" />
        </BButton>
        
        <BButton 
          @click="editor.chain().focus().toggleItalic().run()" 
          variant="light" 
          size="sm"
          :pressed="editor.isActive('italic')"
        >
          <font-awesome-icon :icon="['fas', 'italic']" />
        </BButton>
        
        <!-- Add more buttons as needed -->
      </div>
  
      <!-- Editor Content -->
      <editor-content :editor="editor" class="editor-content" />
    </div>
  </template>
  
  <script setup>
  import { useEditor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Image from '@tiptap/extension-image'
  import { onBeforeUnmount, watch } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])
  
  const editor = useEditor({
    content: props.modelValue,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true
      })
    ],
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML())
    }
  })
  
  watch(() => props.modelValue, (value) => {
    if (value !== editor.value.getHTML()) {
      editor.value.commands.setContent(value, false)
    }
  })
  
  onBeforeUnmount(() => {
    editor.value.destroy()
  })
  </script>
  
  <style scoped>
  .tiptap-editor {
    min-height: 200px;
    background: white;
  }
  
  .editor-content {
    min-height: 150px;
    outline: none;
  }
  
  .tiptap p.is-editor-empty:first-child::before {
    content: 'Write your course description here...';
    color: #adb5bd;
    float: left;
    height: 0;
    pointer-events: none;
  }
  </style>