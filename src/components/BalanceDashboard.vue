<template>
<div>
    <view-name name="Inwestycje" />
    <add-balance 
          v-bind:currentUser="user" 
    /> 
    <send-money 
          v-bind:appUsers="appUsers" 
          v-bind:usersData="usersData"
          v-bind:actualAmountStatus="actualAccountStatus"
          v-bind:currentUser="user"
    />
</div>
</template>

<script>
import AddBalance from "./AddBalance.vue";
import ViewName from "./ViewName.vue";
import SendMoney from "./SendMoney.vue"
export default {
  name: "BalanceDashboard",
  data: function() {
    return {
      appUsers: [],
      usersData: [],
      actualAccountStatus: {},
      user: {}
    };
  },
  props: {
  },
  components: {
    AddBalance,
    ViewName, 
    SendMoney
  },
  computed: {
  },
  created() {
    this.getApplicationUsers()
    this.setAppStatus()
  },
  methods: {
    getApplicationUsers() {
      this.usersData =this.$store.getters["user/appUsers"];
      this.usersData.forEach(element => {
        this.appUsers.push(element.displayName);
      });
    },
    setAppStatus(){
      this.actualAccountStatus= this.$store.getters["balance/getUserBalance"];
      this.user = this.$store.getters["user/user"].uid;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
