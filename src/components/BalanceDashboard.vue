<template>
  <div>
    <view-name name="Inwestycje" />
    <add-balance />
    <buy-currency v-bind:data="currencies" />
  </div>
</template>

<script>
import AddBalance from "./AddBalance.vue";
import BuyCurrency from "./BuyCurrency.vue";
import ViewName from "./ViewName.vue";

export default {
  name: "BalanceDashboard",
  data: function() {
    return {
      currencies: [],
      userBalance: 0
    };
  },
  props: {},
  components: {
    AddBalance,
    BuyCurrency,
    ViewName
  },
  computed: {},
  created() {
    this.fetchCurrencies();
  },
  methods: {
    fetchCurrencies() {
      const getAllCurrenciesCode = currencies => {
        return currencies
          .map(currency => currency[0].rates)
          .reduce((a, b) => [...a, ...b])
          .map(({ code, currency, mid }) => {
            return {
              code,
              currency,
              mid
            };
          });
      };
      // const getCurrenciesList = currencies => {
      //   let options = [];
      //   for (var i = 0; i < currencies.length; i++) {
      //     var option = [];
      //     for (var key in currencies[i]) {
      //       if (key == "code") {
      //         option["value"] = currencies[i][key];
      //       } else if (key == "currency") {
      //         option["text"] = currencies[i][key];
      //       }
      //     }
      //     options.push(Object.assign({}, option));
      //   }
      //   return options;
      // };

      const getCurrenciesList2 = currencies => {
        return currencies.map(currency => {
          return {
            value: { code: currency.code, mid: currency.mid },
            text: `${currency.currency} (${currency.mid})`
          };
        });
      };

      const APIUrls = [
        "https://api.nbp.pl/api/exchangerates/tables/A/?format=json",
        "https://api.nbp.pl/api/exchangerates/tables/B/?format=json"
      ];

      Promise.all(APIUrls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(currencies => {
          const currenciesCodes = getAllCurrenciesCode(currencies);
          this.$store.dispatch("currency/storeCurrencies", currencies);
          this.currencies = getCurrenciesList2(currenciesCodes);
          this.$store.dispatch(
            "currency/storeCurrenciesCodes",
            currenciesCodes
          );
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
