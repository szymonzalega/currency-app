<template>
  <div class="login">
    <div class="login__appName">Currency App</div>
    <div class="login__box">
      <div class="login__box__logo">$</div>
      <span class="login__box__text">Witaj w naszej aplikacji!</span>
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "@/auth";

export default {
  name: "Login",
  mounted() {
    auth.authForm("#firebaseui-auth-container");
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
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  width: 100wh;
  background-color: #2c3343;
  color: #fff;
  font-family: "Roboto";

  &__appName {
    font-size: 2.3em;
    font-weight: 600;
  }

  &__box {
    display: flex;
    width: 90vw;
    max-width: 400px;
    height: 320px;
    flex-direction: column;
    justify-content: center;
    border-radius: 2px;
    padding: 0.5em;
    background-color: #1d2432;
    align-items: center;
    position: relative;
    padding-top: 4em;

    &__logo {
      position: absolute;
      top: -92px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 7px solid #2c3343;
      color: #1d2432;
      font-size: 5em;
      font-weight: 600;
    }

    &__text {
      margin-bottom: 1em;
    }
  }

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
