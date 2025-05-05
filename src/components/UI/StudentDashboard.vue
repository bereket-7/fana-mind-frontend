<template>
    <div class="p-4">
      <h2 class="mb-3">Welcome, {{ studentName }}</h2>
  
      <section class="mb-4">
        <h5 class="text-success">Completed Lessons</h5>
        <ul v-if="completedLessons.length">
          <li v-for="lesson in completedLessons" :key="lesson.id">
            ✅ {{ lesson.title }}
          </li>
        </ul>
        <p v-else>No lessons completed yet.</p>
      </section>
  
      <section>
        <h5 class="text-danger">Upcoming Deadlines</h5>
        <ul v-if="upcomingDeadlines.length">
          <li v-for="item in upcomingDeadlines" :key="item.id">
            📅 {{ item.title }} — due {{ item.dueDate }}
          </li>
        </ul>
        <p v-else>No upcoming deadlines.</p>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const studentName = 'John Doe';
  const completedLessons = ref([]);
  const upcomingDeadlines = ref([]);
  
  onMounted(() => {
    completedLessons.value = [
      { id: 1, title: 'Intro to Python' },
      { id: 2, title: 'OOP Basics' }
    ];
    upcomingDeadlines.value = [
      { id: 3, title: 'Quiz on Lists', dueDate: '2025-05-10' },
      { id: 4, title: 'Assignment: Loops', dueDate: '2025-05-12' }
    ];
  });
  </script>
  