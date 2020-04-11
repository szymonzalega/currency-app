<template>
  <div id="app">
    <CurrencyAppContainer sample="props" />
  </div>
</template>

<script>
import CurrencyAppContainer from "./components/CurrencyAppContainer.vue";

export default {
  name: "App",
  components: {
    CurrencyAppContainer
  }
};
</script>

<style>
#app {
  margin: 0;
}
</style>
