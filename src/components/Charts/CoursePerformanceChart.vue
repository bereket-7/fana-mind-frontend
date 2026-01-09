<template>
  <div class="course-performance-chart">
    <canvas ref="chartCanvas" width="300" height="300"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const chartCanvas = ref(null);
let chart = null;

const initChart = async () => {
  if (!chartCanvas.value || !props.data?.length) return;

  // Dynamic import for Chart.js
  const { Chart, registerables } = await import('chart.js');
  Chart.register(...registerables);

  const ctx = chartCanvas.value.getContext('2d');

  // Destroy existing chart if it exists
  if (chart) {
    chart.destroy();
  }

  const labels = props.data.map(item => item.course);
  const completionData = props.data.map(item => item.completion);
  const ratingData = props.data.map(item => item.rating * 20); // Scale rating to 0-100

  // Generate colors for each course
  const colors = [
    '#007bff', '#28a745', '#ffc107', '#dc3545', 
    '#6f42c1', '#fd7e14', '#20c997', '#6c757d'
  ];

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Completion Rate',
        data: completionData,
        backgroundColor: colors.slice(0, labels.length).map(color => color + '20'),
        borderColor: colors.slice(0, labels.length),
        borderWidth: 2,
        hoverBackgroundColor: colors.slice(0, labels.length).map(color => color + '40'),
        hoverBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            },
            color: '#495057'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#007bff',
          borderWidth: 1,
          cornerRadius: 6,
          displayColors: true,
          callbacks: {
            label: (context) => {
              const courseIndex = context.dataIndex;
              const course = props.data[courseIndex];
              return [
                `${context.label}: ${context.parsed}% completion`,
                `Rating: ${course.rating}/5.0`
              ];
            }
          }
        }
      },
      cutout: '60%',
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
        easing: 'easeOutQuart'
      },
      interaction: {
        intersect: false
      }
    }
  });
};

watch(() => props.data, () => {
  nextTick(() => {
    initChart();
  });
}, { deep: true });

onMounted(() => {
  nextTick(() => {
    initChart();
  });
});
</script>

<style scoped>
.course-performance-chart {
  position: relative;
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>