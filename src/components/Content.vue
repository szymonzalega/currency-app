<template>
  <div class="content">
    <new-currency data="NEW CURRENCY COMPONENT" />
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
      userCurrencies: []
    };
  },
  created() {
    this.getCurrenciesFromStore();
    this.getUserCurrenciesFromStore();
  },
  components: {
    NewCurrency,
    CurrencyWidget
  },
  methods: {
    getCurrenciesFromStore() {
      this.$store.dispatch("currency/fetchCurrencies");
    },
    getUserCurrenciesFromStore() {
      //trzeba rozkminic firebase i zobaczyc ktore to jest userId i je tu pobrac ze stora
      const userId = "userId";

      this.$store.dispatch("currency/fetchUserCurrencies", userId);
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
