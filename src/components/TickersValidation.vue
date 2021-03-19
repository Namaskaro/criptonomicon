<template>
     <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap mt-4">
            <span 
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
            v-for="coin in filteredCoins.slice(0, 4)"
            :key="coin.id" 
            >
              {{coin}}
            </span>
            <div class="text-sm text-red-600" />                     
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
    formatPrice(price) {
      if (price === "-") {
        return price;
      }
      return price > 1 ? price.toFixed(2) : price.toPrecision(2);
    },
},
watch() {

},
mounted() {
    this.getCoins() 
},

}

</script>

<style lang="scss" scoped>

</style>