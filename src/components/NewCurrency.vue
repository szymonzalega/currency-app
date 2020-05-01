<template>
  <div>
    <b-button-group>
      <b-button class = "addCurrency" v-b-modal.modal-prevent-closing > Dodaj walutę </b-button>
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
        <b-form-group
          label="Nazwa waluty"
          label-for="currency-select"
        >
        <b-form-select 
          v-model="selected" 
          :options="data" 
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
      options: [],
      selected: '',
      timePerioid: null
    };
  },
  props: {
    data: {}
  },
  methods: {
    resetModal() {
        this.selected = ''
        this.timePerioid = null
    },
    handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
    },
    handleSubmit() {
        const timePerioid = this.timePerioid
        const selected = this.selected
        this.$store.dispatch("currency/addUserCurrency", {selected, timePerioid} );
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addCurrency {
  margin: 2rem;
  display: flex;
}
</style>
