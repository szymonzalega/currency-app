<template>
  <b-form @submit.stop.prevent="onSubmit">
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
          <div class="in-row">
            <label for="dayAmount">Liczba dni:</label>
            <b-form-input
              id="last-days-input"
              :state="validateState('last')"
              v-model="$v.form.last.$model"
              name="last"
              value="LAST_DAYS"
              aria-describedby="last-days-input-feedback"
              size="sm"
              type="number"
            ></b-form-input>
          </div>
          <div class="invalid" v-if="!$v.form.last.required">Pole jest wymagane</div>
          <div class="invalid" v-if="!$v.form.last.maxValue">Maksymalna liczba dni to 255</div>
        </div>

        <div class="options options__dateScope" v-if="widgetSettingsModel.type === 'DATE_SCOPE'">
          <div class="dateField">
            <label for="dateFrom">Data od:</label>
            <b-form-input v-model="$v.form.dateFrom.$model" id="dateFrom" size="sm" type="date"></b-form-input>
          </div>
          <div class="dateField">
            <label for="dateTo">Data do:</label>
            <b-form-input v-model="$v.form.dateTo.$model" id="dateTo" size="sm" type="date"></b-form-input>
          </div>
        </div>
      </div>
    </div>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxValue } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "WidgetSettings",
  data() {
    return {
      form: {
        last: null,
        dateTo: null,
        dateFrom: null
      },
      widgetSettingsModel: {}
    };
  },
  validations: {
    form: {
      last: {
        required,
        maxValue: maxValue(255)
      },
      dateTo: {
        required
      },
      dateFrom: {
        required
      }
    }
  },
  props: {
    widgetOptions: {},
    widgetName: String
  },
  created() {
    this.form.last = this.widgetOptions.last;
    this.form.type = this.widgetOptions.type;
    this.form.dateTo = new Date();
    this.form.dateFrom = this.widgetOptions.dateFrom;
    this.widgetSettingsModel = { ...this.widgetOptions };
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    save() {
      this.$v.form.$touch();
      if (this.widgetSettingsModel.type == "LAST_DAYS") {
        if (this.$v.form.last.$anyError) {
          return;
        }
      }
      
      if (this.widgetSettingsModel.type == "DATE_SCOPE") {
        if (this.$v.form.dateTo.$anyError || this.$v.form.dateFrom.$anyError) {
          return;
        }
      }

      this.form.type = this.widgetSettingsModel.type

      
      console.log(this.form);
      this.$emit("saveSettings", this.form);
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

.invalid {
  font-size: 80%;
  color: #dc3545;
}

.in-row {
  display: flex;
  flex-direction: row;
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
    flex-direction: column;

    input {
      max-width: 90px;
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
