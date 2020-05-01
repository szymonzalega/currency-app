<template>
  <div class="content">
    <new-currency 
      v-bind:data="options" 
    />
    <div class="content__widgetRow">
      <currency-widget
        v-for="currency of userCurrencies"
        v-bind:key="currency.id"
        v-bind:data="currency"
      />
    </div>
  </div>
</template>

<script>
import NewCurrency from "./NewCurrency.vue";
import CurrencyWidget from "./CurrencyWidget.vue";

export default {
  name: "Content",
  data() {
    return {
      userCurrencies: [], 
      currencies: {},
      options: []
    };
  },
  created() {
    this.getCurrenciesFromStore();
    this.getUserCurrenciesFromStore();
    this.getCurrenciesCodes();
  },
  components: {
    NewCurrency,
    CurrencyWidget
  },
  methods: {
    getCurrenciesFromStore() {
      this.$store.dispatch("currency/fetchCurrencies");
    },
    getCurrenciesCodes() {
      this.$store.dispatch("currency/fetchCurrenciesCodes");
      this.currencies = this.$store.getters["currency/getCurrenciesCodes"];
      this.getCurrenciesList();
    },
    getUserCurrenciesFromStore() {
      //trzeba rozkminic firebase i zobaczyc ktore to jest userId i je tu pobrac ze stora
      const userId = "userId";

      this.$store.dispatch("currency/fetchUserCurrencies", userId);
      this.userCurrencies = this.$store.getters["currency/getUserCurrencies"];
      console.log('user currencies', this.userCurrencies)
    },
    getCurrenciesList() {
      console.log('getting currencies');
      console.log
      for(var i = 0; i < this.currencies.length; i++){
        var option = []
        for(var key in this.currencies[i]){
          if(key == "code"){
            option["value"] = this.currencies[i][key]
          }else if(key == "currency"){
            option["text"] = this.currencies[i][key]
          }
        }
      this. options.push(Object.assign({},option))
      }
    },
  },
  props: {
    data: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
  height: auto;

  &__widgetRow {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
