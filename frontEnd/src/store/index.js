import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  relationData: [],
  spreadData: [],
  dataSet: [],
  dataCol: [],
  dataOrganization: [],
  colName: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
  selectionOptions: [],
  mappingOptions: [],
  predictionOptions: [],
  historySpreadData: [],
  historySuggestion: [],
  historyOperations: [],
  historySpec: [{rowHeading: '', colHeading: '', body: ''}],
  spreadTable: {}
}

const getters = {

}

const mutations = {
  changeSpreadTable (state, data) {
    state.spreadData = data
  },
  changeRelationData (state, data) {
    state.relationData = data
  },
  changeSpreadData (state, data) {
    state.spreadData = data
  },
  changeDataSet (state, data) {
    state.dataSet = data
  },
  changeDataCol (state, data) {
    state.dataCol = data
  },
  changeDataOrganization (state, data) {
    state.dataOrganization = data
  },
  changeSelectionOptions (state, data) {
    state.selectionOptions = data
  },
  changeMappingOptions (state, data) {
    state.mappingOptions = data
  },
  changePredictionOptions (state, data) {
    state.predictionOptions = data
  },
  spreadDataOperation (state, data) {
    state.historySpreadData.push(data)
  },
  suggeationOperation (state, data) {
    state.historySuggestion.push(data)
  },
  changeOperation (state, data) {
    state.historyOperations.push(data)
  },
  changeSpec (state, data) {
    state.historySpec.push(data)
  },
  lastOperation (state) {
    state.historyOperations.pop()
    state.historySpreadData.pop()
    state.historySuggestion.pop()
    state.historySpec.pop()
    state.spreadData = state.historySpreadData[state.historySpreadData.length - 1]
  }
}

const actions = {
  updateSpreadTable (context, data) {
    context.commit('changeSpreadTable', data)
  },
  setRelationData (context, data) {
    context.commit('changeRelationData', data)
  },
  setSpreadData (context, data) {
    context.commit('changeSpreadData', data)
  },
  setDataSet (context, data) {
    context.commit('changeDataSet', data)
  },
  setDataCol (context, data) {
    context.commit('changeDataCol', data)
  },
  setDataOrganization (context, data) {
    context.commit('changeDataOrganization', data)
  },
  setSelectionOptions (context, data) {
    context.commit('changeSelectionOptions', data)
  },
  setMappingOptions (context, data) {
    context.commit('changeMappingOptions', data)
  },
  setPredictionOptions (context, data) {
    context.commit('changePredictionOptions', data)
  },
  addDataOperation (context, data) {
    context.commit('spreadDataOperation', data)
  },
  addSuggestionState (context, data) {
    context.commit('suggeationOperation', data)
    console.log('add state')
  },
  addOperation (context, data) {
    context.commit('changeOperation', data)
  },
  addSpec (context, data) {
    context.commit('changeSpec', data)
  },
  backOperation (context) {
    context.commit('lastOperation')
  }

}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
