<template>
  <div id="content">
      <new-currency data="NEW CURRENCY COMPONENT" />
      <currency-widget data="CURRENCY WIDGET COMPONENT" />
  </div>
</template>

<script>
import NewCurrency from './NewCurrency.vue'
import CurrencyWidget from './CurrencyWidget.vue'

export default {
  name: 'Content',
  components: {
      NewCurrency,
      CurrencyWidget
  },
  props: {
    data: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #content {
        height: auto;
    }

</style>
