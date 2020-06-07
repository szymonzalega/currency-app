<template>
  <div>
    <b-button class="buyCurrency" v-b-modal.modal-buy-currency>Kup walutę</b-button>
    <b-modal
      id="modal-buy-currency"
      ref="modal"
      title="Kup walutę"
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

        <b-form-group label="Liczba jednostek" label-for="currency-amount">
          <b-form-input
            v-model="$v.form.amount.$model"
            min="1"
            id="amount"
            size="sm"
            :state="validateState('amount')"
            type="number"
          ></b-form-input>
          <div class="invalid" v-if="!$v.form.amount.required">Pole jest wymagane</div>
          <div
            class="invalid"
            v-if="!$v.form.amount.enoughMoney"
          >Kwota całkowita przekracza dostępne środki</div>
        </b-form-group>
        <span
          v-if="$v.form.selected.$model && $v.form.amount.$model"
        >Całkowita kwota: {{Math.round((result + Number.EPSILON) * 100) / 100}}PLN</span>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import * as moment from "moment";

const enoughMoney = (value, vm) => {
  let currencyMid = 0;
  let amount = 0;
  if (vm.selected && vm.amount) {
    currencyMid = vm.selected.mid;
    amount = parseInt(vm.amount);
  }
  let result = currencyMid * amount;
  return Math.round((result + Number.EPSILON) * 100) / 100 < vm.userBalance;
};

export default {
  mixins: [validationMixin],
  name: "BuyCurrency",
  data() {
    return {
      form: {
        amount: null,
        selected: null,
        userBalance: 0
      },
      options: [],
      selected: "",
      amount: null
    };
  },
  created() {
    this.getUserBalance();
  },
  computed: {
    result() {
      if (this.form.selected && this.form.amount) {
        return this.form.selected.mid * this.form.amount;
      }
      return null;
    }
  },
  validations: {
    form: {
      amount: {
        required,
        enoughMoney
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
      this.form.selected = {};
      this.form.amount = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    getTodayDate() {
      let today = new Date();
      return today.toISOString().substring(0, 10);
    },
    handleSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const amount = parseInt(this.form.amount);
      const code = this.form.selected.code;
      const table = this.form.selected.table;
      const mid = this.form.selected.mid;
      const user = this.$store.getters["user/user"].uid;
      const result = Math.round((this.result + Number.EPSILON) * 100) / 100;
      const newAmount = this.form.userBalance - result;
      console.log(table);

      this.$store.dispatch("userCurrency/addUserBoughtCurrency", {
        code,
        result,
        mid,
        amount,
        user,
        actionDate: this.getTodayDate()
      });

      this.$store.dispatch("balance/setUserBalance", {
        user,
        newAmount
      });

      let event =
        "Użytkownik sprzedał walutę" +
        code +
        "w ilości" +
        amount +
        "po cenie" +
        mid;
      let time = moment().format("DD-MM-YYYY hh:mm:ss");
      this.$store.dispatch("audit/setAuditRecord", {
        event,
        user,
        time
      });

      //TODO zrobic zapis tego i odjac od salda konta
      this.$nextTick(() => {
        this.$bvModal.hide("modal-buy-currency");
      });
    },
    getUserBalance() {
      this.form.userBalance = this.$store.getters["balance/getUserBalance"];
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
.buyCurrency {
  margin: 2rem;
  display: flex;
}
</style>
