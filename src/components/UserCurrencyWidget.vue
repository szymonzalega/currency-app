<template>
  <div v-if="amount !== 0" class="userCurrencyWidget">
    <div class="optionIcon" v-if="isError">
      <b-icon v-on:click="removeWidget()" icon="trash-fill" font-scale="1.3"></b-icon>
    </div>
    <widget-error v-if="isError"></widget-error>

    <div v-if="areDataLoaded">
      <div class="userCurrencyWidget__titleRow">
        <div class="optionIcon">
          <sell-currency v-bind:data="data" v-bind:currencyAmount="amount" />

          <!-- <b-icon v-on:click="removeWidget()" icon="trash-fill" font-scale="1.3"></b-icon> -->
        </div>
        <div class="title">{{joinTitle}}</div>
        <div class="optionIcon"></div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Aktualny kurs:</div>
        <div class="exchangeRate--value">{{currency.rates[0].mid}}&nbsp;PLN</div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Zainwestowane pieniądze:</div>
        <div class="exchangeRate--value">{{spendMoney}}&nbsp;PLN</div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Posiadane jednostki:</div>
        <div class="exchangeRate--value">{{amount}}</div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Bilans na dzisiaj:</div>
        <div class="exchangeRate--value">{{balance}}&nbsp;PLN</div>
      </div>
      <!-- dane -->
      <currency-price v-bind:currencyData="currency"></currency-price>
    </div>
  </div>
</template>

<script>
import WidgetError from "./WidgetError.vue";
import CurrencyPrice from "./CurrencyPrice.vue";
import SellCurrency from "./SellCurrency.vue";
export default {
  name: "userCurrencyWidget",
  data: function() {
    return {
      currency: {},
      areDataLoaded: false,
      isError: false
    };
  },
  props: {
    data: {}
  },
  components: {
    WidgetError,
    CurrencyPrice,
    SellCurrency
  },
  computed: {
    joinTitle() {
      if (this.areDataLoaded) {
        let { currency, code } = this.currency;
        return `${code} (${currency[0].toUpperCase()}${currency.slice(1)})`;
      }
      return null;
    },
    spendMoney() {
      if (this.areDataLoaded) {
        let { transactions } = this.data;
        let spendMoney = 0;

        for (let transaction of transactions) {
          if (transaction.operationType === "BUY") {
            spendMoney += transaction.result;
          } else if (transaction.operationType === "SELL") {
            spendMoney -= transaction.result;
          }
        }
        return Math.round((spendMoney + Number.EPSILON) * 100) / 100;
      }
      return null;
    },
    balance() {
      let balance = (this.data.currentRates * this.amount) - this.spendMoney;
      return Math.round((balance + Number.EPSILON) * 100) / 100;
    },
    amount() {
      if (this.areDataLoaded) {
        let { transactions } = this.data;
        let amount = 0;

        for (let transaction of transactions) {
          if (transaction.operationType === "BUY") {
            amount += transaction.amount;
          } else if (transaction.operationType === "SELL") {
            amount -= transaction.amount;
          }
        }

        return amount;
      }
      return null;
    }
  },
  created() {
    this.fetchCurrencyData();
    this.fetchOneCurrency();
    this.calculateAllAmountAndMoney();
  },
  updated() {
    this.calculateAllAmountAndMoney();
  },
  methods: {
    calculateAllAmountAndMoney() {
      let { transactions } = this.data;
      let amount = 0;
      let spendMoney = 0;

      for (let transaction of transactions) {
        if (transaction.operationType === "BUY") {
          amount += transaction.amount;
          spendMoney += transaction.result;
        } else if (transaction.operationType === "SELL") {
          amount -= transaction.amount;
          spendMoney -= transaction.result;
        }
      }

      this.data.allAmount = amount;
      this.data.spendMoney = spendMoney;
    },
    fetchOneCurrency() {
      let { table, code } = this.data;
      fetch(
        `http://api.nbp.pl/api/exchangerates/rates/${table}/${code}/?format=json`
      )
        .then(r => r.json())
        .then(response => {
          this.data.currentRates = response.rates[0].mid;
        });
    },
    fetchCurrencyData() {
      const getUrl = () => {
        let { table, code } = this.data;
        let today = this.getParsedTodayDate();
        return `https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${this.data.transactions[0].actionDate}/${today}/?format=json`;
      };
      this.areDataLoaded = false;
      fetch(getUrl())
        .then(r => r.json())
        .then(response => {
          this.currency = response;
          this.areDataLoaded = true;
        })
        .catch(() => {
          this.isError = true;
        });
    },
    removeWidget() {
      this.$emit("removeWidget", this.data.id);
    },
    getParsedTodayDate() {
      let today = new Date();
      return today.toISOString().substring(0, 10);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userCurrencyWidget {
  height: 410[x];
  width: 530px;
  margin: 1em;
  padding: 10px;
  background-color: #33394c;
  display: flex;
  flex-direction: column;

  &__titleRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__icon {
    text-align: end;
    margin: 5px;
  }

  &__title {
    text-align: left;
    padding: 0 10px 10px 10px;
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__exchangeRate {
    display: flex;
    flex-direction: row;
    margin: 10px;
  }
}

.title {
  font-size: 1.2em;
  font-weight: 600;
}

.optionIcon:hover {
  color: #00b4d1;
  transition: 0.5s;
}

.exchangeRate {
  font-size: 0.8em;

  &--label {
    margin-right: 6px;
  }

  &--bold {
    font-weight: 500;
  }
}
</style>
