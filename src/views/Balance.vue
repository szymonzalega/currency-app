<template>
  <div id="balance">
    <Header data="HEADER COMPONENT" />
    <BalanceDashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import BalanceDashboard from '@/components/BalanceDashboard.vue'
export default {
  name: 'Balance',
  components: {
    Header,
    BalanceDashboard
  }
}
</script>

<style lang="scss">
@import "../assets/css/fonts.scss";

  #balance {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100wh;
    background-color: #2c3343;
    color: #fff;
    font-family: 'Roboto';
  }

</style>
