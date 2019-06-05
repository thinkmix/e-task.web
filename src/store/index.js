import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = () => {
  return {
    loadingGlobal: false
  }
}

const mutations = {
  SET_LOADING(state, off){
    state.loadingGlobal = off;
  }
}

const getters = {
  
}

const actions = {

}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})