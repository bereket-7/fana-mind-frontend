<template>
    <div>
      <h2>Student Progress</h2>
      <table>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in progress" :key="record.quizId">
            <td>{{ record.quizTitle }}</td>
            <td>{{ record.date }}</td>
            <td>{{ record.score }}/{{ record.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const progress = ref([
    { quizId: 1, quizTitle: 'JavaScript Basics', date: '2025-05-01', score: 8, total: 10 },
    { quizId: 2, quizTitle: 'HTML Quiz', date: '2025-05-03', score: 6, total: 10 }
  ])
  </script>
  