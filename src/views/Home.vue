<template>
  <main-wrapper>
    <template #main>
      <base-wrapper>
        <template #base>
          <div class="mt-1 relative rounded-md shadow-md">
            <add-new-ticker />
            <ticker-validation/>
            <add-ticker-button @add-ticker="add"></add-ticker-button>
          </div>
          </template>
      </base-wrapper>
      <tickers-list v-if="tickers.length">
        <template #ticker>
         <ticker @click="select(t)"
         v-for="t in tickers" 
         :key="t.name"
         :name="t.name"
         :price="t.price"
         @remove-ticker="removeTicker(t)"
         :class="{
              'border-4': selectedTicker === t
            }"
         />
         </template>
         
       </tickers-list>
       <template v-if="selectedTicker">
      <bars-container 
      :selectedTicker="selectedTicker"
      :name="selectedTicker.name"
      @hide-graph="hideGraph"
      >
      <bar
      :price="selectedTicker.price"
       v-for="(bar, idx) in normalizedGraph"
            :key="idx"
            :style="{ height: `${bar}%` }"
      />
      </bars-container>
      </template>
      </template>
    </main-wrapper>
</template>

<script>
import {subscribeToTicker, unsubscribeFromTicker} from '../api/tickersSubscribe'
import Ticker from "../components/Ticker"
import BarsContainer from "../components/BarsContainer"
import Autocomplete from '../components/Autocomplete'
import AddNewTicker from '../components/AddNewTicker'
import BaseWrapper from '../components/BaseWrapper'
import MainWrapper from '../components/MainWrapper'
import TickersList from '../components/TickersList'
import AddTickerButton from '../components/AddTickerButton'
import Bar from '../components/Bar'
import TickersValidation from '../components/TickersValidation'
import {mapGetters, mapActions} from "vuex"

export default {
  name: "Home",
  components: {
    Ticker,
    TickersList,
    BarsContainer,
    Autocomplete,
    AddNewTicker,
    BaseWrapper,
    MainWrapper,
    Bar,
    AddTickerButton,
    TickersValidation
  },
  data() {
    return {
      selectedTicker: null,
      graph: [],
      page: 1
    }
  },
  computed: {
    ...mapGetters(["ticker","tickers","coins","tickerData"]),
    startIndex() {
      return (this.page - 1) * 6;
    },
    endIndex() {
      return this.page * 6;
    },
  

    normalizedGraph() {
      const maxValue = Math.max(...this.graph);
      const minValue = Math.min(...this.graph);
      
      if (maxValue === minValue) {
        return this.graph.map(() => 50);
      }

      return this.graph.map(
        price => 5 + ((price - minValue) * 95) / (maxValue - minValue)
       
      );  
    },
  },
  methods: {
    ...mapActions(["addTicker","getTickerData"]),
   add() {
      const currentTicker = {
        name: this.ticker,
        price: "-"
      };
      this.addTicker(currentTicker)
      // localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
      this.ticker = "";
      this.filter = "";
      subscribeToTicker(currentTicker.name, newPrice =>
        this.updateTicker(currentTicker.name, newPrice)
      );
    },
    updateTicker(tickerName, price) {
      this.tickers
        .filter(t => t.name === tickerName)
        .forEach(t => {
          if (t === this.selectedTicker) {
            this.graph.push(price);
          }
          t.price = price;
        });
    },
    select(ticker) {
      this.selectedTicker = ticker;
    },
    hideGraph() {
      this.selectedTicker = null
    },
    removeTicker(tickerToRemove) {
      this.tickers = this.tickers.filter(t => t !== tickerToRemove);
    }

  },
  
   watch: {
    selectedTicker() {
      this.graph = [];
    },
      tickers(newValue, oldValue) {
      // Почему не сработал watch при добавлении?
      console.log(newValue === oldValue);
      localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
    },


  },
  created() {
    const windowData = Object.fromEntries(
      new URL(window.location).searchParams.entries()
    );

    const VALID_KEYS = ["filter", "page"];

    VALID_KEYS.forEach(key => {
      if (windowData[key]) {
        this[key] = windowData[key];
      }
    });

    const tickersData = localStorage.getItem("cryptonomicon-list");

    if (tickersData) {
      this.tickers = JSON.parse(tickersData);
      this.tickers.forEach(ticker => {
        subscribeToTicker(ticker.name, newPrice =>
          this.updateTicker(ticker.name, newPrice)
        );
      });
    }

    setInterval(this.updateTickers, 5000);
  },
}
</script>

<style src="../assets/app.css"></style>

