<template>
  <div>
    <line-chart
      :labels="labels"
      :datasets="displayedDatasets"
      :options="$options.options"
    ></line-chart>
  </div>
</template>

<script>
import LineChart from './LineChart';

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: false,
      }
    }]
  },
};

export default {
  name: 'currnecy-price',
  options,
  components: {
    LineChart
  },
  data() {
    return {
      currencyDataModel: {},
      labels: [],
      data: []
    };
  },
  props: {
    currencyData: {},
  },
  created() {
    this.currencyDataModel = { ...this.currencyData };
  },
  computed: {
    displayedDatasets() {
      this.parseData();
      return [{
    label: 'CENA W PLN',
    borderColor: 'rgba(255, 56, 96, 0.5)',
    backgroundColor: 'rgba(255, 56, 96, 0.1)',
    data: this.data
  }]
    },
  },
  methods: {
    parseData() {
      let cenyZlota = this.currencyDataModel.rates;
                    for (var cenaZlota of cenyZlota){
                        this.data.push(cenaZlota.mid);
                        this.labels.push(cenaZlota.effectiveDate);
                    }
    }
  }
}
</script>
