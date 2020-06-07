<template>
  <div>
    <b-button-group>
      <b-button class="addCurrency" v-b-modal.modal-prevent-closing>Dodaj walutę</b-button>
    </b-button-group>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Dodaj nową walutę"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Nazwa waluty" label-for="currency-select">
          <b-form-select
            v-model="$v.form.selected.$model"
            :options="data"
            :state="validateState('selected')"
            class="mb-3"
          ></b-form-select>
          <div class="invalid" v-if="!$v.form.selected.required">Pole jest wymagane</div>
        </b-form-group>

        <b-form-group label="Liczba dni" label-for="currency-perioid">
          <b-form-input
            v-model="$v.form.timePerioid.$model"
            min="1"
            max="255"
            id="dayAmount"
            size="sm"
            :state="validateState('timePerioid')"
            type="number"
          ></b-form-input>
          <div class="invalid" v-if="!$v.form.timePerioid.required">Pole jest wymagane</div>
          <div class="invalid" v-if="!$v.form.timePerioid.maxValue">Maksymalna liczba dni to 255</div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxValue } from "vuelidate/lib/validators";
import * as moment from "moment";

export default {
  mixins: [validationMixin],
  name: "NewCurrency",
  data() {
    return {
      form: {
        timePerioid: null,
        selected: null
      },
      options: [],
      selected: "",
      timePerioid: null
    };
  },
  validations: {
    form: {
      timePerioid: {
        required,
        maxValue: maxValue(255)
      },
      selected: {
        required
      }
    }
  },
  props: {
    data: {}
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetModal() {
      this.form.selected = "";
      this.form.timePerioid = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const timePerioid = this.form.timePerioid;
      const selected = this.form.selected;
      const user = this.$store.getters["user/user"].uid;
      const selectionType = "LAST_DAYS";
      this.$store.dispatch("currency/addUserCurrency", {
        selected,
        timePerioid,
        user,
        selectionType
      });

      let event = "Użytkownik dodał nową walutę" + selected;
      let time = moment().format("DD-MM-YYYY hh:mm:ss");
      this.$store.dispatch("audit/setAuditRecord", {
        event,
        user,
        time
      });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.invalid {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
.addCurrency {
  margin: 2rem;
  display: flex;
}
</style>
