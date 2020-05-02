<template>
  <div id="home">
    <Header data="HEADER COMPONENT" />
    <Content data="CONTENT COMPONENT" />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Content from '@/components/Content.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Content
  }
}
</script>

<style lang="scss">
@import "../assets/css/fonts.scss";

  #home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100wh;
    background-color: #2c3343;
    color: #fff;
    font-family: 'Roboto';
  }

</style>
