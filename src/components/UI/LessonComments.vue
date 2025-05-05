<template>
  <div class="p-4 border rounded">
    <h5 class="mb-3">💬 Comments & Discussion</h5>

    <!-- New comment box -->
    <div class="mb-3">
      <textarea v-model="newComment" class="form-control" rows="3" placeholder="Add a comment..."></textarea>
      <button @click="postComment" class="btn btn-primary mt-2">Post Comment</button>
    </div>

    <!-- List of comments -->
    <div v-if="comments.length">
      <div v-for="comment in comments" :key="comment.id" class="mb-4">
        <div class="border p-2 rounded">
          <strong>{{ comment.author }}</strong> <small class="text-muted">({{ comment.role }})</small>
          <p>{{ comment.text }}</p>
          
          <!-- Instructor reply -->
          <div v-if="isInstructor" class="ms-3">
            <input v-model="comment.replyText" class="form-control form-control-sm" placeholder="Reply..." />
            <button class="btn btn-sm btn-outline-success mt-1" @click="replyToComment(comment)">Reply</button>
          </div>

          <!-- Display reply -->
          <div v-if="comment.reply" class="ms-3 mt-2 p-2 bg-light border-start border-success">
            <strong>{{ comment.reply.author }}</strong> <small class="text-muted">(Instructor)</small>
            <p class="mb-0">{{ comment.reply.text }}</p>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No comments yet. Be the first to ask a question!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isInstructor = false // Set to true if logged-in user is instructor
const newComment = ref('')
const comments = ref([
  {
    id: 1,
    author: 'Student A',
    role: 'Student',
    text: 'Can you explain the second example again?',
    reply: null,
    replyText: ''
  },
  {
    id: 2,
    author: 'Student B',
    role: 'Student',
    text: 'Where can I find the assignment link?',
    reply: {
      author: 'Instructor Jane',
      text: 'It’s in the Resources section.'
    },
    replyText: ''
  }
])

function postComment() {
  if (newComment.value.trim() === '') return
  comments.value.push({
    id: Date.now(),
    author: 'You',
    role: 'Student',
    text: newComment.value,
    reply: null,
    replyText: ''
  })
  newComment.value = ''
}

function replyToComment(comment) {
  if (comment.replyText.trim() === '') return
  comment.reply = {
    author: 'You',
    text: comment.replyText
  }
  comment.replyText = ''
}
</script>
