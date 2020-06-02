<template>
  <div class="header">
    <div class="header__logo" v-on:click="goToHomeView()">$</div>
    <div class="header__userInfo" v-if="user">
      <img class="header__userPhoto" :src="user.photoURL" />
      <span class="header__userName">{{user.displayName}}</span>
      <div class="header__balance" v-on:click="goToBalanceView()" v-if="user">
        <span>Saldo:</span>
        <span>{{balance}}PLN</span>
      </div>
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
  created() {
    this.getUserBalanceFromStore();
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
    balance() {
      const balance = this.$store.getters["balance/getUserBalance"];
      return Math.round((balance + Number.EPSILON) * 100) / 100
    }
  },
  methods: {
    goToHomeView() {
      this.$router.push("/");
    },
    goToBalanceView() {
      this.$router.push("/balance");
    },
    getUserBalanceFromStore() {
      const user = this.$store.getters["user/user"];
      const userId = user.uid;

      this.$store.dispatch("balance/getUserBalance", userId);
      const balance = this.$store.getters["balance/getUserBalance"];
      this.balance = Math.round((balance + Number.EPSILON) * 100) / 100
    },
    logout() {
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

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    color: #1d2432;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin: 10px;
    font-weight: 700;
    font-size: 22px;
    cursor: pointer;
    transition: 200ms;

    &:hover {
      background-color: #626f8f;
      transform: scale(1.1);
    }
  }

  &__userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5em;
  }

  &__balance {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5em;
    border: 1px solid transparent;
    transition: 200ms;
    cursor: pointer;

    &:hover {
      border: 1px solid #fff;
    }
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
