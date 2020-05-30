<template>
    <div class="view__name">
      <h4>{{name}}</h4>
    </div>
</template>

<script>

export default {
  name: "ViewName",
  props: {
    name: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view {
    &__name {
        display: flex;
        margin: 2em 0 0 3em;
    }
}
</style>
