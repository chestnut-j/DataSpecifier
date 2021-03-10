<template>
  <div class="hello">
    <div class="left-column">
      <originalData @rawData='getRawData'></originalData>
      <relation :rawData='rawData'></relation>
    </div>
    <div class="right-column">
      <outputTable></outputTable>
    </div>
    <div class="suggestion-list" :style="{width:(suggestionListStatus?'800px':'20px')}">
      <suggestion-list-panel />
    </div>
  </div>
</template>

<script>
import Relation from './Relation.vue'
import OriginalData from './OriginalData.vue'
import OutputTable from './OutputTable.vue'
import SuggestionListPanel from './SuggestionListPanel.vue'

export default {
  name: 'DataSpecifier',
  data () {
    return {
      rawData: '',
      // msg: 'Welcome to Your Vue.js App'
      suggestionListStatus: true
    }
  },
  components: {
    OriginalData,
    Relation,
    OutputTable,
    SuggestionListPanel
  },
  methods: {
    getRawData (msg) {
      // this.rawData=msg
      // console.log('dataspecifier',this.rawData)
    },
    dataChange () {
      // console.log(this.rawData)
    }
  }
  // watch:{
  //   rawData: 'dataChange'
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-column {
  width: 36%;
  float: left;
  padding-left: 30px;

}
.right-column {
  width: 61%;
  float: left;
  padding-left: 20px;
}
.suggestion-list {
  background-color: #fff;
  border: 2px solid #eeeeee;
  height: 92%;
  overflow: hidden;
  position: absolute;
  right: 0;
  transition: width 0.3s;
  z-index: 350;
}
</style>
