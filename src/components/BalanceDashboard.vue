<template>
  <div class="balance-dashboard">
    <view-name name="Inwestycje" />
    <div class="balance-dashboard__button-row">
      <add-balance v-bind:currentUser="user" />
      <send-money
        v-bind:appUsers="appUsers"
        v-bind:usersData="usersData"
        v-bind:actualAmountStatus="actualAccountStatus"
        v-bind:currentUser="user"
      />
      <buy-currency v-bind:data="currencies" />
      <b-button class="history" @click="navigateToHistoryView"> Historia operacji </b-button>
    </div>
    <view-name name="Twoje waluty" />
    <div class="balance-dashboard__widget-row" v-if="userBoughtCurrencies">
      <user-currency-widget
        v-for="currency of userBoughtCurrencies"
        v-bind:key="currency.id"
        v-bind:data="currency"
      />
    </div>
  </div>
</template>

<script>
import AddBalance from "./AddBalance.vue";
import BuyCurrency from "./BuyCurrency.vue";
import ViewName from "./ViewName.vue";
import SendMoney from "./SendMoney.vue";
import UserCurrencyWidget from "./UserCurrencyWidget.vue";
export default {
  name: "BalanceDashboard",
  data: function() {
    return {
      currencies: [],
      appUsers: [],
      usersData: [],
      actualAccountStatus: {},
      user: {},
      userBoughtCurrencies: []
    };
  },
  props: {},
  components: {
    AddBalance,
    BuyCurrency,
    ViewName,
    SendMoney,
    UserCurrencyWidget
  },
  computed: {},
  created() {
    this.setAppStatus();
    this.fetchCurrencies();
    this.getUserBoughtCurrenciesFromStore();
    this.getApplicationUsers();
  },
  methods: {
    getUserBoughtCurrenciesFromStore() {
      const user = this.$store.getters["user/user"];
      const userId = user.uid;

      this.$store
        .dispatch("userCurrency/fetchUserBoughtCurrencies", userId)
        .then(() => {
          this.userBoughtCurrencies = this.$store.getters[
            "userCurrency/getUserBoughtCurrencies"
          ];
        });
    },
    getApplicationUsers() {
      this.usersData = this.$store.getters["user/appUsers"];
      this.appUsers = [];
      this.usersData.forEach(element => {
        if(element.userId !== this.user){
          this.appUsers.push(element.displayName);
        }
      });
    },
    setAppStatus() {
      this.actualAccountStatus = this.$store.getters["balance/getUserBalance"];
      this.user = this.$store.getters["user/user"].uid;
    },
    fetchCurrencies() {
      const getAllCurrenciesCode = currencies => {
        return currencies
          .map(currency => currency[0].rates)
          .reduce((a, b) => [...a, ...b])
          .map(({ code, currency, mid }) => {
            return {
              code,
              currency,
              mid
            };
          });
      };

      const getCurrenciesList = currencies => {
        return currencies.map(currency => {
          return {
            value: { code: currency.code, mid: currency.mid },
            text: `${currency.currency} (${currency.mid})`
          };
        });
      };

      const APIUrls = [
        "https://api.nbp.pl/api/exchangerates/tables/A/?format=json",
        "https://api.nbp.pl/api/exchangerates/tables/B/?format=json"
      ];

      Promise.all(APIUrls.map(url => fetch(url)))
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(currencies => {
          const currenciesCodes = getAllCurrenciesCode(currencies);
          this.$store.dispatch("currency/storeCurrencies", currencies);
          this.currencies = getCurrenciesList(currenciesCodes);
          this.$store.dispatch(
            "currency/storeCurrenciesCodes",
            currenciesCodes
          );
        });
      this.getApplicationUsers();
      this.setAppStatus();
    },
    navigateToHistoryView(){
      this.$router.push(`/accountHistory`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.balance-dashboard {
  &__button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  &__widget-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.history {
  margin: 2rem;
  display: flex;
}
</style>
