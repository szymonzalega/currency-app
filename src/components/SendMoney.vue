<template>
  <div>
    <b-button class="transferMoney" @click="openModal">Wyślij pieniądze</b-button>
    <b-modal
      id="transferMoney"
      ref="transferMoney"
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
            :max="this.form.userBalance"
            id="currencyAmount"
            size="sm"
            :state="validateState('currencyAmount')"
            type="number"
          />
          <div class="invalid" v-if="!$v.form.currencyAmount.required">Pole jest wymagane</div>
          <div class="invalid" v-if="!$v.form.currencyAmount.minValue">Minimalna kwota to 1 PLN</div>
          <div
            class="invalid"
            v-if="!$v.form.currencyAmount.enoughMoney"
          >Kwota całkowita przekracza dostępne środki</div>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import * as moment from "moment";

const enoughMoney = (value, vm) => {
  let amount = 0;
  if (vm.currencyAmount) {
    amount = parseInt(vm.currencyAmount);
  }
  return Math.round((amount + Number.EPSILON) * 100) / 100 < vm.userBalance;
};

export default {
  mixins: [validationMixin],
  name: "SendMoney",
  data() {
    return {
      form: {
        currencyAmount: null,
        receiver: null,
        userBalance: null
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
        enoughMoney
      },
      receiver: {
        required
      }
    }
  },
  methods: {
    openModal() {
      console.log(this.appUsers);
      this.form.userBalance = this.$store.getters["balance/getUserBalance"];
      this.$refs["transferMoney"].show();
    },
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
      const userToTransferMoney = this.usersData.find(
        x => x.displayName === this.form.receiver
      ).userId;
      let amount = this.form.currencyAmount;
      let actualAccountStatus = this.form.userBalance;
      let newAmount = parseInt(actualAccountStatus) - parseInt(amount);

      this.$store.dispatch("balance/transferMoney", {
        amount,
        user,
        userToTransferMoney,
        newAmount
      });

      let event =
        "Uzytkownik przeslal kwote " +
        this.form.currencyAmount +
        " zlotych uzytkownikowi " +
        this.form.receiver;
      let time = moment().format("DD-MM-YYYY HH:mm:ss");

      this.$store.dispatch("audit/setAuditRecord", {
        event,
        user,
        time
      });
      let currentuserName = this.$store.getters["user/user"].displayName;

      event =
        "Uzytkownik otrzymal kwotę " +
        this.form.currencyAmount +
        " zlotych od uzytkownika" +
        currentuserName;
      this.$store.dispatch("audit/setAuditRecord", {
        event,
        user: userToTransferMoney,
        time
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
