<template>
<div>
    <view-name name="Inwestycje" />
    <add-balance /> 
</div>
</template>

<script>
import AddBalance from "./AddBalance.vue";
import ViewName from "./ViewName.vue";

export default {
  name: "BalanceDashboard",
  data: function() {
    return {
    };
  },
  props: {
  },
  components: {
    AddBalance,
    ViewName
  },
  computed: {
  },
  created() {
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
