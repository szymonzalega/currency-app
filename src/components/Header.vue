<template>
  <div class="header">
    <div class="header__logoutButton" v-on:click="logout()">Logout</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    data: String
  },
  data: function() {
    return {
      isAuthorizedd: {}
    };
  },
  methods: {
    logout: function() {
      this.$gAuth
        .signOut()
        .then(data => {
          console.log(`Logged out ${data}`);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  height: 60px;
  background-color: #1d2432;

  &__logoutButton {
    width: 80px;
    padding: 1em 1em;
    border: 1px solid #00b4d1;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
  }
}
</style>
