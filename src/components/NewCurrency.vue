<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing> Dodaj walutę </b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Dodaj nową walutę"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nazwa waluty"
          label-for="currency-select"
        >
        <b-form-select 
          v-model="selected" 
          :options="options" 
          class="mb-3"> </b-form-select>
        </b-form-group>       
      
        <b-form-group
          label="Liczba dni"
          label-for="currency-perioid"
        >
        <b-form-input 
          v-model="timePerioid" 
          min="1" 
          max="255" 
          id="dayAmount" 
          size="sm"
          type="number"></b-form-input>
        </b-form-group>
        
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'NewCurrency',
  data() {
    return {
      currencies: {},
      options: [],
      selected: '',
      timePerioid: null
    };
  },
  created() {
    this.getCurrenciesFromStore();
  },
  methods: {
    getCurrenciesFromStore() {
      this.currencies = this.$store.getters["currency/getCurrencies"];
      this.getCurrenciesList();
    }, 
    getCurrenciesList() {
      console.log('abc');
      console.log(this.currencies.length)
      for(var i = 0; i < this.currencies.length; i++){
        var option = []
        for(var key in this.currencies[i]){
          if(key == "code"){
            option["value"] = this.currencies[i][key]
          }else if(key == "currency"){
            option["text"] = this.currencies[i][key]
          }
        }
      this. options.push(Object.assign({},option))
      }
    },
    resetModal() {
        this.selected = ''
        this.timePerioid = null
    },
    handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
    },
    handleSubmit() {
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
    }
  },
  props: {
    data: String
  }
}
</script>