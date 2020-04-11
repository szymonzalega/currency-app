<template>
  <div id="newCurrency">
      {{ data }}
  </div>
</template>

<script>
export default {
  name: 'NewCurrency',
  props: {
    data: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #newCurrency {
        height: 50px;
        width: 50vw;
        margin: 1em;
        background-color: #33394c;
    }

</style>
