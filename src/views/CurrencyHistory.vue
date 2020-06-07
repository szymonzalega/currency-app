<template>
  <div id="currencyHistory">
    <Header data="HEADER COMPONENT" />
    <CurrencyHistoryList v-bind:currency="id" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import CurrencyHistoryList from "@/components/CurrencyHistoryList.vue";
export default {
  name: "Balance",
  components: {
    Header,
    CurrencyHistoryList
  },
  data () {
      return {
          id: null
      }
  },
  created() {
    this.id = this.$route.params.id;
  }
};
</script>

<style lang="scss">
@import "../assets/css/fonts.scss";

#currencyHistory {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100wh;
  background-color: #2c3343;
  color: #fff;
  font-family: "Roboto";
}
</style>
