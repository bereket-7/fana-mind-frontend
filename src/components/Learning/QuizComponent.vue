<template>
  <div class="quiz-component">
    <div v-if="!quizStarted" class="quiz-intro">
      <div class="quiz-header">
        <font-awesome-icon :icon="['fas', 'question-circle']" class="quiz-icon" />
        <h3>{{ quiz.title || 'Knowledge Check' }}</h3>
        <p v-if="quiz.description">{{ quiz.description }}</p>
      </div>
      
      <div class="quiz-info">
        <div class="info-item">
          <font-awesome-icon :icon="['fas', 'list-ol']" />
          <span>{{ quiz.questions.length }} Questions</span>
        </div>
        <div class="info-item">
          <font-awesome-icon :icon="['fas', 'clock']" />
          <span>{{ quiz.timeLimit || 'No time limit' }}</span>
        </div>
        <div class="info-item">
          <font-awesome-icon :icon="['fas', 'trophy']" />
          <span>{{ quiz.passingScore || 70 }}% to pass</span>
        </div>
      </div>
      
      <button class="btn-primary-modern start-quiz-btn" @click="startQuiz">
        <font-awesome-icon :icon="['fas', 'play']" />
        Start Quiz
      </button>
    </div>

    <div v-else-if="!quizCompleted" class="quiz-active">
      <!-- Quiz Progress -->
      <div class="quiz-progress">
        <div class="progress-info">
          <span class="question-counter">
            Question {{ currentQuestionIndex + 1 }} of {{ quiz.questions.length }}
          </span>
          <div v-if="timeRemaining" class="time-remaining">
            <font-awesome-icon :icon="['fas', 'clock']" />
            {{ formatTime(timeRemaining) }}
          </div>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Current Question -->
      <div class="question-container">
        <div class="question-header">
          <h4>{{ currentQuestion.question }}</h4>
          <div v-if="currentQuestion.image" class="question-image">
            <img :src="currentQuestion.image" :alt="currentQuestion.question" />
          </div>
        </div>

        <!-- Multiple Choice -->
        <div v-if="currentQuestion.type === 'multiple-choice'" class="answer-options">
          <div 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            class="option-item"
            :class="{ selected: selectedAnswer === index }"
            @click="selectAnswer(index)"
          >
            <div class="option-indicator">
              <span>{{ String.fromCharCode(65 + index) }}</span>
            </div>
            <span class="option-text">{{ option }}</span>
          </div>
        </div>

        <!-- True/False -->
        <div v-else-if="currentQuestion.type === 'true-false'" class="answer-options">
          <div 
            class="option-item"
            :class="{ selected: selectedAnswer === true }"
            @click="selectAnswer(true)"
          >
            <div class="option-indicator">
              <font-awesome-icon :icon="['fas', 'check']" />
            </div>
            <span class="option-text">True</span>
          </div>
          <div 
            class="option-item"
            :class="{ selected: selectedAnswer === false }"
            @click="selectAnswer(false)"
          >
            <div class="option-indicator">
              <font-awesome-icon :icon="['fas', 'times']" />
            </div>
            <span class="option-text">False</span>
          </div>
        </div>

        <!-- Text Input -->
        <div v-else-if="currentQuestion.type === 'text'" class="text-answer">
          <textarea
            v-model="selectedAnswer"
            :placeholder="currentQuestion.placeholder || 'Enter your answer...'"
            class="answer-textarea"
          ></textarea>
        </div>
      </div>

      <!-- Navigation -->
      <div class="quiz-navigation">
        <button 
          v-if="currentQuestionIndex > 0"
          class="btn-secondary-modern"
          @click="previousQuestion"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
          Previous
        </button>
        
        <button 
          v-if="currentQuestionIndex < quiz.questions.length - 1"
          class="btn-primary-modern"
          :disabled="selectedAnswer === null"
          @click="nextQuestion"
        >
          Next
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
        
        <button 
          v-else
          class="btn-success-modern"
          :disabled="selectedAnswer === null"
          @click="submitQuiz"
        >
          <font-awesome-icon :icon="['fas', 'check']" />
          Submit Quiz
        </button>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-else class="quiz-results">
      <div class="results-header">
        <div class="score-circle" :class="{ passed: quizResults.passed }">
          <span class="score-percentage">{{ quizResults.percentage }}%</span>
        </div>
        <h3>{{ quizResults.passed ? 'Congratulations!' : 'Keep Learning!' }}</h3>
        <p>
          {{ quizResults.passed 
            ? 'You have successfully passed this quiz.' 
            : 'You can retake this quiz to improve your score.' 
          }}
        </p>
      </div>

      <div class="results-breakdown">
        <div class="result-item">
          <font-awesome-icon :icon="['fas', 'check-circle']" class="correct-icon" />
          <span>{{ quizResults.correct }} Correct</span>
        </div>
        <div class="result-item">
          <font-awesome-icon :icon="['fas', 'times-circle']" class="incorrect-icon" />
          <span>{{ quizResults.incorrect }} Incorrect</span>
        </div>
        <div class="result-item">
          <font-awesome-icon :icon="['fas', 'clock']" />
          <span>{{ formatTime(quizResults.timeSpent) }} spent</span>
        </div>
      </div>

      <div class="results-actions">
        <button 
          v-if="!quizResults.passed"
          class="btn-primary-modern"
          @click="retakeQuiz"
        >
          <font-awesome-icon :icon="['fas', 'redo']" />
          Retake Quiz
        </button>
        <button 
          class="btn-secondary-modern"
          @click="reviewAnswers"
        >
          <font-awesome-icon :icon="['fas', 'eye']" />
          Review Answers
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'text';
  options?: string[];
  correct: number | boolean | string;
  explanation?: string;
  image?: string;
  placeholder?: string;
}

interface Quiz {
  id: string;
  title?: string;
  description?: string;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  passingScore?: number; // percentage
}

interface Props {
  quiz: Quiz;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  complete: [results: any];
}>();

// Reactive state
const quizStarted = ref(false);
const quizCompleted = ref(false);
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const userAnswers = ref<any[]>([]);
const timeRemaining = ref(0);
const startTime = ref(0);
const timer = ref(null);

// Computed properties
const currentQuestion = computed(() => props.quiz.questions[currentQuestionIndex.value]);

const quizResults = computed(() => {
  if (!quizCompleted.value) return null;
  
  let correct = 0;
  userAnswers.value.forEach((answer, index) => {
    const question = props.quiz.questions[index];
    if (question.type === 'text') {
      // For text questions, we'd need more sophisticated checking
      // For now, just mark as correct if not empty
      if (answer && answer.trim().length > 0) correct++;
    } else {
      if (answer === question.correct) correct++;
    }
  });
  
  const percentage = Math.round((correct / props.quiz.questions.length) * 100);
  const passed = percentage >= (props.quiz.passingScore || 70);
  const timeSpent = Date.now() - startTime.value;
  
  return {
    correct,
    incorrect: props.quiz.questions.length - correct,
    percentage,
    passed,
    timeSpent
  };
});

// Methods
const startQuiz = () => {
  quizStarted.value = true;
  startTime.value = Date.now();
  userAnswers.value = new Array(props.quiz.questions.length).fill(null);
  
  if (props.quiz.timeLimit) {
    timeRemaining.value = props.quiz.timeLimit * 60; // convert to seconds
    startTimer();
  }
};

const startTimer = () => {
  timer.value = setInterval(() => {
    timeRemaining.value--;
    if (timeRemaining.value <= 0) {
      submitQuiz();
    }
  }, 1000);
};

const selectAnswer = (answer: any) => {
  selectedAnswer.value = answer;
};

const nextQuestion = () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
    currentQuestionIndex.value++;
    selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] || null;
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
    currentQuestionIndex.value--;
    selectedAnswer.value = userAnswers.value[currentQuestionIndex.value] || null;
  }
};

const submitQuiz = () => {
  if (selectedAnswer.value !== null) {
    userAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
  }
  
  if (timer.value) {
    clearInterval(timer.value);
  }
  
  quizCompleted.value = true;
  emit('complete', quizResults.value);
};

const retakeQuiz = () => {
  quizStarted.value = false;
  quizCompleted.value = false;
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  userAnswers.value = [];
  timeRemaining.value = 0;
  
  if (timer.value) {
    clearInterval(timer.value);
  }
};

const reviewAnswers = () => {
  // In a real app, this would show a detailed review
  console.log('Review answers:', userAnswers.value);
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60000);
  const secs = Math.floor((seconds % 60000) / 1000);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Lifecycle
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
});
</script>

<style scoped>
.quiz-component {
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-lg);
  padding: var(--fana-space-8);
  margin-bottom: var(--fana-space-8);
}

/* Quiz Intro */
.quiz-intro {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.quiz-header {
  margin-bottom: var(--fana-space-8);
}

.quiz-icon {
  font-size: 3rem;
  color: var(--fana-accent-orange);
  margin-bottom: var(--fana-space-4);
}

.quiz-header h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-3);
  color: var(--fana-text-primary);
}

.quiz-header p {
  color: var(--fana-text-secondary);
  line-height: 1.6;
}

.quiz-info {
  display: flex;
  justify-content: center;
  gap: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: var(--fana-text-secondary);
  font-size: var(--fana-text-sm);
}

.start-quiz-btn {
  font-size: var(--fana-text-base);
  padding: var(--fana-space-4) var(--fana-space-8);
}

/* Quiz Active */
.quiz-progress {
  margin-bottom: var(--fana-space-8);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--fana-space-3);
}

.question-counter {
  font-weight: 600;
  color: var(--fana-text-primary);
}

.time-remaining {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: var(--fana-accent-orange);
  font-weight: 600;
}

.progress-bar {
  height: 8px;
  background: var(--fana-bg-secondary);
  border-radius: var(--fana-radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--fana-gradient-primary);
  border-radius: var(--fana-radius-full);
  transition: width var(--fana-transition-base);
}

.question-container {
  margin-bottom: var(--fana-space-8);
}

.question-header h4 {
  font-size: var(--fana-text-lg);
  font-weight: 600;
  margin-bottom: var(--fana-space-4);
  color: var(--fana-text-primary);
  line-height: 1.5;
}

.question-image {
  margin-bottom: var(--fana-space-4);
}

.question-image img {
  max-width: 100%;
  height: auto;
  border-radius: var(--fana-radius-md);
}

.answer-options {
  display: flex;
  flex-direction: column;
  gap: var(--fana-space-3);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-3);
  padding: var(--fana-space-4);
  background: var(--fana-bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--fana-radius-lg);
  cursor: pointer;
  transition: all var(--fana-transition-base);
}

.option-item:hover {
  background: var(--fana-bg-tertiary);
  border-color: var(--fana-primary);
}

.option-item.selected {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--fana-primary);
}

.option-indicator {
  width: 32px;
  height: 32px;
  background: var(--fana-bg-card);
  border-radius: var(--fana-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--fana-text-primary);
  flex-shrink: 0;
}

.option-item.selected .option-indicator {
  background: var(--fana-primary);
  color: white;
}

.option-text {
  flex: 1;
  color: var(--fana-text-primary);
  line-height: 1.5;
}

.text-answer {
  margin-top: var(--fana-space-4);
}

.answer-textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--fana-space-4);
  border: 2px solid var(--fana-border-color);
  border-radius: var(--fana-radius-lg);
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  font-size: var(--fana-text-base);
  line-height: 1.6;
  resize: vertical;
  transition: border-color var(--fana-transition-base);
}

.answer-textarea:focus {
  outline: none;
  border-color: var(--fana-primary);
}

.quiz-navigation {
  display: flex;
  justify-content: space-between;
  gap: var(--fana-space-4);
}

/* Quiz Results */
.quiz-results {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.results-header {
  margin-bottom: var(--fana-space-8);
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--fana-accent-red);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--fana-space-4);
  position: relative;
}

.score-circle.passed {
  background: var(--fana-accent-green);
}

.score-percentage {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  color: white;
}

.results-header h3 {
  font-size: var(--fana-text-xl);
  font-weight: 700;
  margin-bottom: var(--fana-space-3);
  color: var(--fana-text-primary);
}

.results-header p {
  color: var(--fana-text-secondary);
  line-height: 1.6;
}

.results-breakdown {
  display: flex;
  justify-content: center;
  gap: var(--fana-space-6);
  margin-bottom: var(--fana-space-8);
  flex-wrap: wrap;
}

.result-item {
  display: flex;
  align-items: center;
  gap: var(--fana-space-2);
  color: var(--fana-text-secondary);
  font-size: var(--fana-text-sm);
}

.correct-icon {
  color: var(--fana-accent-green);
}

.incorrect-icon {
  color: var(--fana-accent-red);
}

.results-actions {
  display: flex;
  justify-content: center;
  gap: var(--fana-space-4);
  flex-wrap: wrap;
}

/* Button Styles */
.btn-primary-modern,
.btn-secondary-modern,
.btn-success-modern {
  display: inline-flex;
  align-items: center;
  gap: var(--fana-space-2);
  padding: var(--fana-space-3) var(--fana-space-4);
  border-radius: var(--fana-radius-lg);
  font-size: var(--fana-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--fana-transition-base);
  border: none;
  text-decoration: none;
}

.btn-primary-modern {
  background: var(--fana-gradient-primary);
  color: white;
}

.btn-secondary-modern {
  background: var(--fana-bg-secondary);
  color: var(--fana-text-primary);
  border: 1px solid var(--fana-border-color);
}

.btn-success-modern {
  background: var(--fana-accent-green);
  color: white;
}

.btn-primary-modern:disabled,
.btn-secondary-modern:disabled,
.btn-success-modern:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary-modern:hover:not(:disabled),
.btn-secondary-modern:hover:not(:disabled),
.btn-success-modern:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--fana-shadow-sm);
}

/* Responsive Design */
@media (max-width: 768px) {
  .quiz-info {
    flex-direction: column;
    align-items: center;
    gap: var(--fana-space-3);
  }
  
  .quiz-navigation {
    flex-direction: column;
  }
  
  .results-breakdown {
    flex-direction: column;
    align-items: center;
    gap: var(--fana-space-3);
  }
  
  .results-actions {
    flex-direction: column;
  }
}
</style>