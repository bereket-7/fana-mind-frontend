<template>
  <div class="enrollment-chart">
    <canvas ref="chartCanvas" width="400" height="200"></canvas>
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

  // Dynamic import for Chart.js to reduce bundle size
  const { Chart, registerables } = await import('chart.js');
  Chart.register(...registerables);

  const ctx = chartCanvas.value.getContext('2d');

  // Destroy existing chart if it exists
  if (chart) {
    chart.destroy();
  }

  const labels = props.data.map(item => {
    const date = new Date(item.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const enrollmentData = props.data.map(item => item.enrollments);

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Daily Enrollments',
        data: enrollmentData,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#007bff',
          borderWidth: 1,
          cornerRadius: 6,
          displayColors: false,
          callbacks: {
            title: (context) => {
              const date = new Date(props.data[context[0].dataIndex].date);
              return date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
            },
            label: (context) => {
              return `${context.parsed.y} new enrollments`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6c757d',
            font: {
              size: 12
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)',
            drawBorder: false
          },
          ticks: {
            color: '#6c757d',
            font: {
              size: 12
            },
            stepSize: 1
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      elements: {
        point: {
          hoverBackgroundColor: '#007bff'
        }
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
.enrollment-chart {
  position: relative;
  height: 200px;
  width: 100%;
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>