<template>
            <input
              :value="_value"
              @input="$emit('input', $event.target.value)"
              @keypress.enter="$emit('add-ticker')"
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
            @click="selected = ticker"
            >
              {{coin}}
            </span>
            <div class="text-sm text-red-600">Такой тикер уже добавлен</div>
          </div>  
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  name: "InputAutocomplete",
  props: {
    value: {
      type:String
    }
  },
  data() {
    return {
      ticker: '',
      selected: null,
      _value: ''
    }
  },
  computed: {
...mapGetters(['coins']),
symbols() {
  return Object.keys(this.coins)
  // return Object.values(this.coins)
  // return Object.getOwnPropertySymbols(this.coins)
  // return Object.entries(this.coins).map(([key, value]) => [key, value])
},
filteredCoins() {
  return this.symbols.filter((str) => {
            return str.toLowerCase().indexOf(this._value) >= 0 ||
                  str.toUpperCase().indexOf(this._value) >= 0;
        });
  //  coins = this.coins.filter( c => c.Symbol.toLowerCase.indexOf(this.modelValue.toLowerCase()) ||
  //  c.FullName.toLowerCase.indexOf(this.modelValue.toLowerCase()
                  
   
                  //  return this.symbols.filter(c => 
                  //   c.toLowerCase().indexOf(this.modelValue.toLowerCase()) >=0 ||
                  //   c.toLowerCase().indexOf(this.modelValue.toLowerCase()) >=0)
                    
  //  return this.symbols.Object.Symbol
  //  return this.coins.Symbol.toLowerCase().indexOf(this.modelValue.toLowerCase()) 
//  return Object.fromEntries(
//     Object.entries(this.coins).filter(([key,value]) => value.toLowerCase() === this.modelValue.toLowerCase())
//  ) 

},
  },
methods: {
    ...mapActions(['getCoins']),
   
},
mounted() {
    this.getCoins()
    
}

}
</script>