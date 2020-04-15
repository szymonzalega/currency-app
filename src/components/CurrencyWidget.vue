<template>
  <div id="currencyWidget">
      <div>{{ data.name }}</div>
      <div>{{ data.value }}</div>
  </div>
</template>

<script>
export default {
  name: 'CurrencyWidget',
  props: {
    data: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #currencyWidget {
        height: 350px;
        width: 270px;
        margin: 1em;
        background-color: #33394c;
    }

</style>
