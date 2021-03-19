<template>
  <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
            <span 
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
             v-for="coin in filteredCoins.slice(0,4)"
            :key="coin.id"
            >
              {{coin}} 
              
            </span>
          </div>
          <div class="text-sm text-red-600">Такой тикер уже добавлен</div>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
name: 'Autocomplete',
computed: {
...mapGetters(['coins']),
// filteredCoins() {
//   return this.symbols.filter((str) => {
//             return str.toLowerCase().indexOf(this.value) >= 0 ||
//                   str.toUpperCase().indexOf(this.value) >= 0;
//         });
// },
// symbols() {
//   return Object.keys(this.coins)
//   // return Object.values(this.coins)
//   // return Object.getOwnPropertySymbols(this.coins)
//   // return Object.entries(this.coins).map(([key, value]) => [key, value])
// },
},
methods: {
    ...mapActions(['getCoins'])
},
mounted() {
    this.getCoins()
}
}
</script>

<style>

</style>