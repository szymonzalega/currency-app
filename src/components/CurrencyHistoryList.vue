<template>
  <div class="currency-history">
    <view-name name="Historia operacji" />
    <div v-if="areDataLoaded">{{currencyData}}</div>
  </div>
</template>

<script>
import ViewName from "./ViewName.vue";
import userCurrencyService from "../service/userCurrencyService";

export default {
  name: "CurrencyHistory",
  data: function() {
    return {
        areDataLoaded: false,
        currencyData: {}
    };
  },
  props: {
    currency: {}
  },
  components: {
    ViewName
  },
  computed: {},
  created() {
    this.getCurrencyData();
  },
  methods: {
    getCurrencyData() {
      const user = this.$store.getters["user/user"];
      const userId = user.uid;
      userCurrencyService.getUserBoughtCurrency(userId, this.currency).then(data => {
          this.currencyData = data;
          this.areDataLoaded = true;
      }).catch(error => {
          console.error(error);
          this.areDataLoaded = true;
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.currency-history {
  &__button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  &__widget-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
