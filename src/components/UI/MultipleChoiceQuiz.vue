<template>
    <div>
      <h2>{{ quizTitle }}</h2>
      <div v-for="(question, index) in questions" :key="question.id">
        <p>{{ index + 1 }}. {{ question.text }}</p>
        <div v-for="option in question.options" :key="option">
          <input type="radio" :name="'q' + index" :value="option" v-model="userAnswers[index]" />
          <label>{{ option }}</label>
        </div>
      </div>
      <button @click="submitQuiz">Submit</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const quizTitle = 'Basic JavaScript Quiz'
  const questions = ref([
    {
      id: 1,
      text: 'What is the output of 2 + 2?',
      options: ['3', '4', '22', 'undefined']
    },
    {
      id: 2,
      text: 'Which keyword declares a constant in JavaScript?',
      options: ['let', 'const', 'var', 'static']
    }
  ])
  
  const userAnswers = ref({})
  
  function submitQuiz() {
    console.log('User Answers:', userAnswers.value)
  }
  </script>
  