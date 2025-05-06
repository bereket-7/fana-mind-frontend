<template>
    <div>
      <h2>Quiz Results</h2>
      <p>Score: {{ score }}/{{ total }}</p>
      <p v-if="score >= passingScore">✅ Passed</p>
      <p v-else>❌ Failed</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const correctAnswers = ['4', 'const']
  const userAnswers = ['4', 'let']
  const total = correctAnswers.length
  const passingScore = 2
  
  const score = computed(() => {
    return correctAnswers.filter((ans, idx) => userAnswers[idx] === ans).length
  })
  </script>
  