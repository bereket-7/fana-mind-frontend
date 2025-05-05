<template>
    <div class="p-4">
      <h2 class="mb-4">Instructor Dashboard</h2>
  
      <section class="mb-4">
        <h5 class="text-primary">Enrolled Students</h5>
        <ul v-if="students.length">
          <li v-for="student in students" :key="student.id">
            👤 {{ student.name }} — {{ student.course }}
          </li>
        </ul>
        <p v-else>No students enrolled yet.</p>
      </section>
  
      <section>
        <h5 class="text-success">Performance Overview</h5>
        <ul>
          <li v-for="stat in performanceStats" :key="stat.courseId">
            📊 {{ stat.course }} — Avg Score: {{ stat.avgScore }}%
          </li>
        </ul>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const students = ref([]);
  const performanceStats = ref([]);
  
  onMounted(() => {
    students.value = [
      { id: 1, name: 'Alice', course: 'Java Basics' },
      { id: 2, name: 'Bob', course: 'Python for Beginners' }
    ];
    performanceStats.value = [
      { courseId: 1, course: 'Java Basics', avgScore: 84 },
      { courseId: 2, course: 'Python for Beginners', avgScore: 91 }
    ];
  });
  </script>
  