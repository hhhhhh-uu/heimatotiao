import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOUTTAO_TOUKEN')) || {}
    tokenObj: getToken() || {}
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.tokenObj = payload
      // localStorage.setItem('HEIMA_TOUTTAO_TOUKEN', JSON.stringify(payload))
      setToken(payload)
    }
  }
})
