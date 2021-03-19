
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  relationData: [],
  dataSet: [],
  colName: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
}

const getters = {

}

const mutations = {
  changeRelationData (state, data) {
    state.relationData = data
  }
}

const actions = {
  setRelationData (context, data) {
    context.commit('changeRelationData', data)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
