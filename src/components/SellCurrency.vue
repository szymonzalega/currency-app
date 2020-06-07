<template>
  <div>
    <!-- <b-button class="sellCurrency" @click="$bvModal.show(`${modalId}`)">Sprzedaj walutę</b-button> -->
    <b-icon @click="$bvModal.show(`${modalId}`)" icon="graph-down" font-scale="1.3"></b-icon>

    <b-modal
      v-bind:id="modalId"
      ref="modal"
      title="sprzedaj walutę"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
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
            v-if="!$v.form.amount.enoughAmount"
          >Kwota całkowita przekracza dostępne środki</div>
        </b-form-group>
        <span
          v-if="$v.form.amount.$model"
        >Całkowita kwota: {{Math.round((result + Number.EPSILON) * 100) / 100}}PLN</span>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import * as moment from "moment";

const enoughAmount = (value, vm) => {
  return vm.amount <= vm.allAmount;
};

export default {
  mixins: [validationMixin],
  name: "SellCurrency",
  data() {
    return {
      form: {
        amount: null,
        allAmount: this.currencyAmount
      },
      modalId: null,
      options: [],
      amount: null
    };
  },
  mounted() {
    this.modalId = `modal-sell-currency${this.data.id}`;
  },
  created() {
    this.getUserBalance();
  },
  updated() {
    this.form.allAmount = this.currencyAmount;
  },
  computed: {
    result() {
      if (this.form.amount) {
        return this.data.currentRates * this.form.amount;
      }
      return null;
    }
  },
  validations: {
    form: {
      amount: {
        required,
        enoughAmount
      }
    }
  },
  props: {
    data: {},
    currencyAmount: Number
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
      const code = this.data.code;
      const table = this.data.table;
      const mid = this.data.currentRates;
      const user = this.$store.getters["user/user"].uid;
      const result = Math.round((this.result + Number.EPSILON) * 100) / 100;
      const newAmount = this.form.userBalance + result;
      console.log(table);

      this.$store.dispatch("userCurrency/sellUserBoughtCurrency", {
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

      let event = `Użytkownik sprzedał walutę ${code} w ilości ${amount} po cenie ${mid}`;
      let time = moment().format("DD-MM-YYYY HH:mm:ss");
      this.$store.dispatch("audit/setAuditRecord", {
        event,
        user,
        time
      });

      //TODO zrobic zapis tego i odjac od salda konta
      this.$nextTick(() => {
        this.$bvModal.hide(this.modalId);
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
