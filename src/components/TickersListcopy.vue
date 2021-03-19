/* eslint-disable vue/no-unused-vars */
<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3"
>
    <ticker 
    v-for="t in tickers" 
    :key="t"
    :name="t.name"
    :price="t.price"
    @click="select(t)"
      :class="{
              'border-4': selectedTicker === t
            }"

    />
  </dl>
</template>

<script>
import Ticker from './Ticker'
import {mapGetters,mapActions} from 'vuex'
export default {
  props: {
    selectedTicker: {
      type: Object
    }
  },
  components: {
    Ticker
  },
  provide() {
    return {
      remove: this.removeTicker
    }
  },
  
  computed: {
    ...mapGetters(['tickers']),
  },
  methods: {
    select(ticker) {
      this.selectedTicker = ticker;
    },

     removeTicker(tickerToRemove) {
      this.tickers = this.tickers.filter(t => t !== tickerToRemove);
    }
}
    
  } 

</script>
