<template>
  <div class="currencyWidget">
    <div v-if="isSettingsMode">
      <widget-settings
        v-bind:widgetOptions="widgetSettingsModel"
        v-bind:widgetName="joinTitle"
        v-on:closeSettings="closeSettings($event)"
        v-on:saveSettings="saveSettings($event)"
      ></widget-settings>
    </div>
    <div v-if="!isSettingsMode">
      <div v-if="areDataLoaded">
        <div class="currencyWidget__titleRow">
          <div class="optionIcon">
            <b-icon v-on:click="removeWidget()" icon="trash-fill" font-scale="1.3"></b-icon>
          </div>
          <div class="title">{{joinTitle}}</div>
          <div class="optionIcon">
            <b-icon v-on:click="openSettings()" icon="gear" font-scale="1.3"></b-icon>
          </div>
        </div>
        <div class="currencyWidget__exchangeRate exchangeRate">
          <div class="exchangeRate--label">Aktualny kurs:</div>
          <div class="exchangeRate--value">{{currency.rates[0].mid}}&nbsp;PLN</div>
        </div>
        <!-- dane -->
        <currency-price
          v-bind:currencyData="currency">
        </currency-price>
      </div>
    </div>
  </div>
</template>

<script>
import WidgetSettings from "./WidgetSettings.vue";
import CurrencyPrice from "./CurrencyPrice.vue";
export default {
  name: "CurrencyWidget",
  data: function() {
    return {
      currency: {},
      isSettingsMode: false,
      widgetOption: "LAST_DAYS",
      widgetSettingsModel: {
        type: "LAST_DAYS",
        last: 20
      },
      areDataLoaded: false
    };
  },
  props: {
    data: {}
  },
  components: {
    WidgetSettings,
    CurrencyPrice
  },
  computed: {
    joinTitle() {
      if(this.areDataLoaded) {
        let { currency, code } = this.currency;
        return `${code} (${currency[0].toUpperCase()}${currency.slice(1)})`;
      }
      return null
    }
  },
  created() {
    this.widgetSettingsModel = this.data.options;
    this.fetchCurrencyData(this.widgetSettingsModel);
  },
  methods: {
    openSettings() {
      this.isSettingsMode = true;
    },
    closeSettings() {
      this.isSettingsMode = false;
    },
    saveSettings(data) {
      this.widgetSettingsModel = data;
      this.fetchCurrencyData(data);
      this.closeSettings();
      this.updateUserCurrency(data)
    },
    fetchCurrencyData(options) {
      const getUrl = options => {
        let { table, code } = this.data;

        if (options.type === "LAST_DAYS") {
          return `https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/last/${options.last}/?format=json`;
        } else if (options.type === "DATE_SCOPE") {
          return `https://api.nbp.pl/api/exchangerates/rates/${table}/${code}/${options.dateFrom}/${options.dateTo}/?format=json`;
        }
      };
          this.areDataLoaded = false;
      fetch(getUrl(options))
        .then(r => r.json())
        .then(response => {
          this.currency = response;
          this.areDataLoaded = true
          });
    },
    updateUserCurrency(options){
      const user =  this.$store.getters["user/user"].uid;

       let {table, code, id} = this.data;

       this.$store.dispatch("currency/updateUserCurrencySetting", {user, table, code, options, id});
    },
    removeWidget() {
      console.log('id', this.data.id);
      this.$emit("removeWidget", this.data.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.currencyWidget {
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
