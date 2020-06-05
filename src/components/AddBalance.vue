<template>
  <div>
    <b-button class="addMoney" v-b-modal.modal-prevent-closing>Doładuj konto</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Doładuj konto"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Kwota doładowania" label-for="balance-amount">
          <b-form-input
            v-model="$v.form.currencyAmount.$model"
            min="1"
            id="currencyAmount"
            size="sm"
            :state="validateState('currencyAmount')"
            type="number"
          />
          <div class="invalid" v-if="!$v.form.currencyAmount.required">Pole jest wymagane</div>
          <div class="invalid" v-if="!$v.form.currencyAmount.minValue">Minimalna kwota to 1 PLN</div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import { datetimeNow } from "../shared/time";
export default {
  mixins: [validationMixin],
  name: "AddBalance",
  data() {
    return {
      form: {
        currencyAmount: null
      },
      currencyAmount: null
    };
  },
  validations: {
    form: {
      currencyAmount: {
        required,
        minValue: minValue(1)
      }
    }
  },
  props: {
    currentUser: {}
  },

  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetModal() {
      this.form.currencyAmount = null;
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
      let user = this.currentUser;
      const currentBalance = this.$store.getters["balance/getUserBalance"];
      let currencyAmount =
        parseInt(currentBalance) + parseInt(this.form.currencyAmount);
      this.$store.dispatch("balance/addUserBalance", {
        currencyAmount,
        user
      });
      let event =
        "Użytkownik doładował konto kwotą " +
        this.form.currencyAmount +
        " złotych";
      let time = datetimeNow();
      this.$store.dispatch("balance/setAuditRecord", {
        event,
        user,
        time
      });
      console.log(Date.now());
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
.addMoney {
  margin: 2rem;
  display: flex;
}
</style>
