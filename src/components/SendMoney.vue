<template>
  <div>
    <b-button-group>
      <b-button class="transferMoney" v-b-modal.transferMoney>Wyślij pieniądze</b-button>
    </b-button-group>
    <b-modal
      id="transferMoney"
      ref="modal"
      title="Wyślij pieniądze"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
         <b-form-group label="Odbiorca" label-for="currency-select">
          <b-form-select
            v-model="$v.form.receiver.$model"
            :options="appUsers"
            :state="validateState('receiver')"
            class="mb-3"
          ></b-form-select>
          <div class="invalid" v-if="!$v.form.receiver.required">Pole jest wymagane</div>
        </b-form-group>


        <b-form-group label="Kwota przelewu" label-for="balance-amount">
          <b-form-input
            v-model="$v.form.currencyAmount.$model"
            min="1"
            :max="actualAmountStatus"
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

export default {
  mixins: [validationMixin],
  name: "SendMoney",
  data() {
    return {
      form: {
        currencyAmount: null,
        receiver: null
      },
      currencyAmount: null,
      receiver: null
    };
  },
  props: {
    appUsers: {},
    usersData: {},
    actualAmountStatus: Number,
    currentUser: {}
  },
  validations: {
    form: {
      currencyAmount: {
        required,
        minValue: minValue(1),
      },
      receiver: {
          required
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetModal() {
      this.form.currencyAmount = null;
      this.form.receiver = null;
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
      const user = this.currentUser;
      const userToTransferMoney= this.usersData.find(x => x.displayName === this.form.receiver).userId;
      let amount = this.form.currencyAmount;
      let newAmount = parseInt(this.actualAmountStatus) - parseInt(amount)
      this.$store.dispatch("balance/transferMoney", {
        amount,
        user,
        userToTransferMoney,
        newAmount
      });
      let event = 'Użytkownik przesłał kwotę ' + this.form.currencyAmount + ' złotych użytkownikowi' + this.form.receiver;
      this.$store.dispatch("balance/setAuditRecord", {
        event,
        user
      });   
      event = 'Użytkownik otrzymał kwotę ' + this.form.currencyAmount + ' złotych od użytkownika' + this.currentUser.displayName;
      this.$store.dispatch("balance/setAuditRecord", {
        event,
        userToTransferMoney
      });         
      this.$nextTick(() => {
        this.$bvModal.hide("transferMoney");
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
.transferMoney {
  margin: 2rem;
  display: flex;
}
</style>
