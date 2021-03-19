<template>
<div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
            >Тикер</label
          >
            <input
              v-model="ticker"
              @keypress.enter="add"
              type="text"
              class="block
              w-full pr-10 border-gray-300 text-gray-900 focus:outline-none
              focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              />
            
               <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap mt-4">
            <span 
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
            v-for="coin in filteredCoins.slice(0, 4)"
            :key="coin.id"
           
            >
              {{coin}}
            </span>
            <div class="text-sm text-red-600" />
               
               <add-ticker-button @add-ticker="add"></add-ticker-button>
               </div>
      </div>
</div>
</template>

<script>
import {subscribeToTicker, unsubscribeFromTicker} from '../api/tickersSubscribe'
import AddTickerButton from './AddTickerButton'
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {
    AddTickerButton
  },

 data() {
    return {
      ticker: '',
      selected: null,
      notValidatedTickers: false,
    }
  },
  computed: {
...mapGetters(["tickers","coins","tickerData"]),
symbols() {
  return Object.keys(this.coins)
},
filteredCoins() {
  return this.symbols.filter((str) => {
            return str.toLowerCase().indexOf(this.ticker) >= 0 ||
                  str.toUpperCase().indexOf(this.ticker) >= 0;
        });
},

  },
methods: {
    ...mapActions(["getCoins","addTicker"]),
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

    formatPrice(price) {
      if (price === "-") {
        return price;
      }
      return price > 1 ? price.toFixed(2) : price.toPrecision(2);
    },

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

},
watch() {

},
mounted() {
    this.getCoins()
    
},


}

</script>

