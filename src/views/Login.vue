<template>
  <div class="login">
    <!-- <div class="login__button" v-on:click="login()">Zaloguj się</div> -->
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "@/auth";

export default {
  name: "Login",
  mounted() {
      auth.authForm('#firebaseui-auth-container')
    },
  methods: {
    login: function() {
      this.$gAuth
        .signIn()
        .then(data => {
          console.log(`Correct sign in ${data}`);
          this.$router.push("./");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/fonts.scss";
@import "../../node_modules/firebaseui/dist/firebaseui.css";

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100wh;
  background-color: #2c3343;
  color: #fff;
  font-family: "Roboto";

  &__button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 180px;
    padding: 1em 0.5em;
    text-transform: uppercase;
    border: 1px solid #00b4d1;
    font-weight: 800;

    &:hover {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 180px;
      padding: 1em 0.5em;
      text-transform: uppercase;
      background-color: white;
      color: #2c3343;
      font-weight: 800;
      transition: 300ms;
    }
  }
}
</style>
