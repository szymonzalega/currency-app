<template>
  <div id="header">
    <div>Header</div>
    <p>{{ sample }}</p>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    sample: String
  }
};
</script>

<style lang="sass" scoped>
#header {
  height: 60px;
  background-color: #1d2432;
  padding: 3px;
  border: 2px dashed #fff;
  color: #fff;
}
</style>