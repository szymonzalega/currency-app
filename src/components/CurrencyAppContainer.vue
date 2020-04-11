<template>
  <div id="currency-app-container">
      <Header sample="header props" />
    <div>Currency App Container</div>
    <p>{{ sample }}</p>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  name: "CurrencyAppContainer",
  components: {
      Header
  },
  props: {
    sample: String
  }
};
</script>

<style scoped>
#currency-app-container{
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: #33394c;
  color: #fff;
}
</style>