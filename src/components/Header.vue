<template>
  <div class="header">
    <div class="header__userInfo" v-if="user">
      <img class="header__userPhoto" :src="user.photoURL" />
      <span class="header__userName">{{user.displayName}}</span>
    </div>
    <div class="header__logoutButton" v-on:click="logout()">
      <span>Wyloguj</span>
    </div>
  </div>
</template>

<script>
import auth from "@/auth";

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
  computed: {
    user() {
      return this.$store.getters["user/user"];
    }
  },
  methods: {
    logout: function() {
      auth.logout();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  background-color: #1d2432;

  &__userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5em;
  }

  &__userPhoto {
    border-radius: 50%;
    height: 30px;
  }

  &__userName {
    margin: 0.4em;
  }

  &__logoutButton {
    display: flex;
    align-items: center;
    margin-right: 0.5em;
    text-transform: uppercase;
    color: #00b4d1;
    cursor: pointer;
  }
}
</style>
