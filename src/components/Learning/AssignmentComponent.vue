<template>
  <div class="assignment-component">
    <div v-if="!assignmentStarted" class="assignment-intro">
      <div class="assignment-header">
        <font-awesome-icon :icon="['fas', 'file-alt']" class="assignment-icon" />
        <h3>{{ assignment.title || 'Assignment' }}</h3>
        <p v-if="assignment.description">{{ assignment.description }}</p>
      </div>
      
      <div class="assignment-info">
        <div class="info-item">
          <font-awesome-icon :icon="['fas', 'calendar-alt']" />
          <span>Due: {{ formatDate(assignment.dueDate) }}</span>
        </div>
        <div class="info-item">
          <