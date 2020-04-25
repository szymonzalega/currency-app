<template>
  <div id="newCurrency">
      {{ data }}
      //{{ currencies }}
  </div>
</template>

<script>
export default {
  name: 'NewCurrency',
  data() {
    return {
      currencies: []
    };
  },
  created() {
    this.getCurrenciesFromStore();
  },
  methods: {
    getCurrenciesFromStore() {
      this.$store.dispatch("currency/fetchCurrencies");
      this.currencies = this.$store.getters["currency/getCurrencies"];
    }
  },
  props: {
    data: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #newCurrency {
        height: 50px;
        width: 50vw;
        margin: 1em;
        background-color: #33394c;
    }

</style>
