<template>
  <div class="error-view">
    <span>{{errorMessage}}</span>
  </div>
</template>

<script>
export default {
  name: "WidgetError",
  data() {
    return {
      errorMessage: null
    };
  },
  props: {
    message: String
  },
  created() {
    this.errorMessage =
      this.message || "Wystąpił problem z załadowaniem widgetu";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error-view {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  color: rgba(256,256,256,0.5);
  height: 100%;
}
</style>
