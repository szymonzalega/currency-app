<template>
  <div id="balance">
    <Header data="HEADER COMPONENT" />
    Balance
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
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
