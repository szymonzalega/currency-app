<template>
  <div class="currency-history">
    <view-name name="Historia operacji" />
    <div v-if="areDataLoaded">
      <b-container>
        <b-row style="padding:30px">
          <b-col lg="6" class="my-1">
            <b-button @click="printToPDF">Wydrukuj do pdf</b-button>
          </b-col>
        </b-row>
        <!-- Main table element -->
        <b-table
          dark
          show-empty
          small
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</template>

<script>
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import * as moment from "moment";
import ViewName from "./ViewName.vue";
import userCurrencyService from "../service/userCurrencyService";

export default {
  name: "CurrencyHistory",
  data: function() {
    return {
      mapOperationType: { BUY: "KUPNO", SELL: "SPRZEDAŻ" },
      areDataLoaded: false,
      currencyData: {},
      items: [],
      fields: [
        {
          key: "actionDate",
          label: "Data",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "amount",
          label: "Ilość",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "mid", label: "Kurs", sortable: true, sortDirection: "desc" },
        {
          key: "operationType",
          label: "Operacja",
          sortable: true,
          sortDirection: "desc"
        },
        { key: "result", label: "Kwota", sortable: true, class: "text-center" }
      ],
      sortBy: "actionDate",
      sortDesc: false,
      sortDirection: "asc"
    };
  },
  props: {
    currency: {}
  },
  components: {
    ViewName
  },
  computed: {},
  created() {
    this.getCurrencyData();
  },
  methods: {
    getCurrencyData() {
      const user = this.$store.getters["user/user"];
      const userId = user.uid;
      userCurrencyService
        .getUserBoughtCurrency(userId, this.currency)
        .then(data => {
          this.currencyData = data;
          this.items = data.transactions.map(item => {
            return {
              operationType: this.mapOperationType[item.operationType],
              result: `${item.result} PLN`,
              mid: `${item.mid} PLN`,
              actionDate: item.actionDate,
              amount: item.amount
            };
          });

          console.log(data);

          this.areDataLoaded = true;
        })
        .catch(error => {
          console.error(error);
          this.areDataLoaded = true;
        });
    },
    printToPDF() {
      var body = [];
      this.items.forEach(function(ratae) {
        body.push({
          actionDate: ratae.actionDate,
          amount: ratae.amount,
          mid: ratae.mid,
          operationType: ratae.operationType,
          result: ratae.result
        });
      });

      var doc = new jsPDF();
      require("jspdf-autotable");

      doc.setFontSize(20);
      doc.setFontSize(8);
      doc.text("Zapis historii audytu", 14, 30);
      doc.setTextColor(100);

      doc.autoTable({
        head: [
          {
            actionDate: "Data",
            amount: "Ilość",
            mid: "Kurs",
            operationType: "Operacja",
            result: "Kwota"
          }
        ] /******** STAŁY NAGŁÓWEK DLA WYKRESÓW  ************/,
        body: body,
        startY: 40,
        showHead: "firstPage"
      });
      let date = moment().format("DD-MM-YYYY HH:mm:ss");
      let filename = "AccountHistory" + date + ".pdf";
      doc.save(filename);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.currency-history {
  &__button-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  &__widget-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
