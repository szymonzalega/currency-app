<template>
  <div class="balance-dashboard">
    <view-name name="Historia operacji" />
  </div>
</template>

<script>
import ViewName from "./ViewName.vue";
export default {
  name: "AccountHistory",
  data: function() {
    return {
    };
  },
  props: {},
  components: {
    ViewName
  },
  computed: {},
  created() {
  },
  methods: {
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
