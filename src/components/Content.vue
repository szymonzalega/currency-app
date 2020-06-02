<template>
  <div class="content">
    <view-name name="Obserwowane waluty" />
    <new-currency 
      v-bind:data="currencies" 
    />
    <div class="content__widgetRow">
      <currency-widget
        v-for="currency of userCurrencies"
        v-bind:key="currency.id"
        v-bind:data="currency"
        v-on:removeWidget="removeWidget($event)"
      />
    </div>
  </div>
</template>

<script>
import NewCurrency from "./NewCurrency.vue";
import CurrencyWidget from "./CurrencyWidget.vue";
import ViewName from "./ViewName.vue";

export default {
  name: "Content",
  data() {
    return {
      userCurrencies: [], 
      currencies: [],
    };
  },
  created() {
    this.getUserCurrenciesFromStore();
    this.fetchCurrencies();
  },
  components: {
    NewCurrency,
    CurrencyWidget,
    ViewName
  },
  methods: {
    getCurrenciesCodes() {
      this.currencies = this.$store.getters["currency/getCurrenciesCodes"];
    },
    getUserCurrenciesFromStore() {
      const user = this.$store.getters["user/user"];
      const userId = user.uid;

      this.$store.dispatch("currency/fetchUserCurrencies", userId);
      this.userCurrencies = this.$store.getters["currency/getUserCurrencies"];
    },
    fetchCurrencies() {
    const getAllCurrenciesCode = (currencies) => {
      return currencies
        .map((currency) => currency[0].rates)
        .reduce((a, b) => [...a, ...b])
        .map(({ code, currency }) => {
          return {
            code,
            currency,
          };
        });
    };
    const getCurrenciesList = (currencies) => {
      let options = []
      for(var i = 0; i < currencies.length; i++){
        var option = []
        for(var key in currencies[i]){
          if(key == "code"){
            option["value"] = currencies[i][key]
          }else if(key == "currency"){
            option["text"] = currencies[i][key]
          }
        }
        options.push(Object.assign({},option))
      }
      return options;
    };

    const APIUrls = [
      "https://api.nbp.pl/api/exchangerates/tables/A/?format=json",
      "https://api.nbp.pl/api/exchangerates/tables/B/?format=json"
    ];
 
    Promise.all(APIUrls.map((url) => fetch(url)))
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((currencies) => {
        const currenciesCodes = getAllCurrenciesCode(currencies);
        this.$store.dispatch("currency/storeCurrencies", currencies );
        this.currencies = getCurrenciesList(currenciesCodes);
        this.$store.dispatch("currency/storeCurrenciesCodes", currenciesCodes );

      });
  },
    removeWidget(data) {
      const id = data;
      this.$store.dispatch("currency/deleteCurrencyWidget", {id});
      this.userCurrencies = this.$store.getters["currency/getUserCurrencies"];
    }
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
