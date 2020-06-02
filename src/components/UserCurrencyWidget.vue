<template>
  <div class="userCurrencyWidget">
    <div class="optionIcon" v-if="isError">
      <b-icon v-on:click="removeWidget()" icon="trash-fill" font-scale="1.3"></b-icon>
    </div>
    <widget-error v-if="isError"></widget-error>

    <div v-if="areDataLoaded">
      <pre>{{data}}</pre>
      <div class="userCurrencyWidget__titleRow">
        <div class="optionIcon">
          <b-icon v-on:click="removeWidget()" icon="trash-fill" font-scale="1.3"></b-icon>
        </div>
        <div class="title">{{joinTitle}}</div>
        <div class="optionIcon"></div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Aktualny kurs:</div>
        <div class="exchangeRate--value">{{currency.rates[0].mid}}&nbsp;PLN</div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Liczba jednostek:</div>
        <div class="exchangeRate--value">{{data.amount}}</div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Zainwestowana wartość</div>
        <div class="exchangeRate--value">{{data.result}}&nbsp;PLN</div>
      </div>
      <div class="userCurrencyWidget__exchangeRate exchangeRate">
        <div class="exchangeRate--label">Bilans na dziś</div>
        <div class="exchangeRate--value">{{(currency.rates[0].mid * data.amount) - data.result}}&nbsp;PLN</div>
      </div>
      <!-- dane -->
      <currency-price v-bind:currencyData="currency"></currency-price>
    </div>
  </div>
</template>

<script>
import WidgetError from "./WidgetError.vue";
import CurrencyPrice from "./CurrencyPrice.vue";
export default {
  name: "userCurrencyWidget",
  data: function() {
    return {
      currency: {},
      widgetOption: "LAST_DAYS",
      widgetSettingsModel: {},
      areDataLoaded: false,
      isError: false
    };
  },
  props: {
    data: {}
  },
  components: {
    WidgetError,
    CurrencyPrice
  },
  computed: {
    joinTitle() {
      if (this.areDataLoaded) {
        let { currency, code } = this.currency;
        return `${code} (${currency[0].toUpperCase()}${currency.slice(1)})`;
      }
      return null;
    }
  },
  created() {
    this.widgetSettingsModel = this.data.options;
    this.fetchCurrencyData();
  },
  methods: {
    fetchCurrencyData() {
      const getUrl = () => {
        let { table, code } = this.data;
        return `https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/2020-05-02/${this.data.boughtDate}/?format=json`;
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.userCurrencyWidget {
  height: 350px;
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
