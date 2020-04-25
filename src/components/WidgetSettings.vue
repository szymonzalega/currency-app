<template>
  <div class="widgetSettings">
    <div class="widgetSettings__titleRow">
      <div class="title">{{this.widgetName}}</div>

      <div>
        <b-icon v-on:click="save()" class="optionIcon" icon="check" font-scale="1.4"></b-icon>
        <b-icon v-on:click="close()" class="optionIcon" icon="x" font-scale="1.5"></b-icon>
      </div>
    </div>

    <div class="widgetSettings__optionRow">
      <div class="radioOption">
        <b-form-radio
          v-model="widgetSettingsModel.type"
          name="some-radios"
          value="LAST_DAYS"
        >Ostatnie dni</b-form-radio>
        <b-form-radio
          v-model="widgetSettingsModel.type"
          name="some-radios"
          value="DATE_SCOPE"
        >Zakres dat</b-form-radio>
      </div>
      <div class="options options__lastDays" v-if="widgetSettingsModel.type === 'LAST_DAYS'">
        <label for="dayAmount">Liczba dni:</label>
        <b-form-input v-model="widgetSettingsModel.last" max="255" id="dayAmount" size="sm" type="number"></b-form-input>
      </div>
      <div class="options options__dateScope" v-if="widgetSettingsModel.type === 'DATE_SCOPE'">
        <div class="dateField">
          <label for="dateFrom">Data od:</label>
          <b-form-input v-model="widgetSettingsModel.dateFrom" id="dateFrom" size="sm" type="date"></b-form-input>
        </div>
        <div class="dateField">
          <label for="dateTo">Data do:</label>
          <b-form-input v-model="widgetSettingsModel.dateTo" id="dateTo" size="sm" type="date"></b-form-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WidgetSettings",
  data() {
    return {
      widgetSettingsModel: {}
    };
  },
  props: {
    widgetOptions: {},
    widgetName: String
  },
  created() {
    this.widgetSettingsModel = { ...this.widgetOptions };
  },
  methods: {
    save() {
      this.$emit("saveSettings", this.widgetSettingsModel);
    },
    close() {
      this.$emit("closeSettings");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.widgetSettings {
  display: flex;
  flex-direction: column;

  &__titleRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__optionRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px;
    flex-wrap: wrap;
  }
}

.title {
  font-size: 1.2em;
  font-weight: 600;
}

.radioOption {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 70px;
  justify-content: space-between;
  margin-bottom: 30px;
}

.options {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &__lastDays {
    flex-direction: row;

    input {
      max-width: 70px;
    }

    label {
      margin-bottom: 0;
      margin-right: 10px;
    }
  }
  &__dateScope {
    flex-direction: column;
    height: 76px;
  }
}

.dateField {
  display: flex;
  flex-direction: row;

  input {
    max-width: 140px;
  }

  label {
    margin-bottom: 0;
    margin-right: 10px;
  }
}

.optionIcon:hover {
  color: #00b4d1;
  transition: 0.5s;
}
</style>
