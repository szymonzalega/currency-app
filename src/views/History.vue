<template>
  <div id="history">
    <Header data="HEADER COMPONENT" />
    <AccountHistory />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import AccountHistory from '@/components/AccountHistory.vue'
export default {
  name: 'Balance',
  components: {
    Header,
    AccountHistory
  }
}
</script>

<style lang="scss">
@import "../assets/css/fonts.scss";

  #history {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100wh;
    background-color: #2c3343;
    color: #fff;
    font-family: 'Roboto';
  }

</style>
