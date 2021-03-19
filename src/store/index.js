import { createStore } from 'vuex'
import axios from 'axios'
import {tickersHandlers, loadTickers} from '../api/tickersSubscribe'
export default createStore({
  state() {
    return {
      tickers: [],
      ticker: {},
      coins: [],
      isLoading: false,
      tickerData: {}
    }
  },
  getters: {
    tickers: state => state.tickers,
    ticker: state => index => state.tickers.find((t)=> t.name === name),
    coins: state => state.coins,
    tickerData: state => state.tickerData
  },
  mutations: {
    setTickerData(state,data) {
      state.tickerData = data
      console.log(data)
    },
    setTicker(state,ticker) {
      state.tickers.push(ticker)  
    },
    deleteTicker(state,index) {  
     state.tickers.splice(state.tickers.indexOf(state.ticker), 1)
    },
    setCoins(state,coins) {
      state.coins = coins
    }
  },
  actions: {
   async getTickerData({commit}) {
     try{
      return await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${newTicker.name}&tsyms=USD&api_key=0fbcbfa7a1c2c41a74370bf9c5e198600eec0ae9348174f7a063364bea20d080`)
      .then(data => {
        commit('setTickerData',data.data)
      })
     }catch(error) {
       console.log(error)
     }
    
    },
    addTicker({commit},ticker) {
      commit("setTicker",ticker)
    },
    removeTicker({commit}) {
      commit("deleteTicker")
    },
   async getCoins({commit}){
      try{
    return await axios.get('https://min-api.cryptocompare.com/data/all/coinlist?summary=true')
        .then((coins) => {
          commit('setCoins',coins.data.Data)
          return coins
        })
         
      }catch(error) {
        console.log(error)
      }
      
    }
  },
  modules: {}
})
