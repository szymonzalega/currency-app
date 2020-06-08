<template>
  <canvas ref="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'line-chart',
  props: {
    labels: Array,
    datasets: {
      type: Array,
      required: true
    },
    options: Object
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {      
    this.chart = new Chart(this.$refs.myChart, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });
  },
  beforeDestroy () {
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>

<style scoped lang="scss"> 

canvas {
  max-width: 100%;
}

</style>