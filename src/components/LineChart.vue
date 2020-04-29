<template>
  <canvas ref="myChart" width="300px"></canvas>
</template>

<script>
import Chart from 'chart.js';

export default {
  name: 'line-chart',
  props: {
    // The chart's data.labels
    labels: Array,

    // The chart's data.datasets
    datasets: {
      type: Array,
      required: true
    },

    // The chart's options.
    options: Object
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    datasets(newDatasets) {
      // Replace the datasets and call the update() method on Chart.js
      // instance to re-render the chart.
      console.log()
      this.chart.data.datasets = newDatasets;
      this.chart.update();
    }
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
    // Don't forget to destroy the Chart.js instance.
    if (this.chart) {
      this.chart.destroy()
    }
  }
}
</script>
