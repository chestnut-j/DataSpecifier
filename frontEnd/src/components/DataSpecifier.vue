<template>
  <div class="hello">
    <div class="left-column">
      <originalData @rawData='getRawData'></originalData>
      <relation :rawData='rawData'></relation>
    </div>
    <div class="right-column">
      <outputTable></outputTable>
    </div>
    <div class="suggestion-list" :style="{width:suggestionListStatus?'600px':'20px'}">
      <suggestion-list-panel />
    </div>
  </div>
</template>

<script lang="ts">
import OriginalData from '../components/OriginalData.vue'
import Relation from '../components/Relation.vue'
import OutputTable from '../components/OutputTable.vue'
// import 

export default {
  name: 'DataSpecifier',
  data () {
    return {
      rawData: ''
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    originalData: OriginalData,
    relation: Relation,
    outputTable: OutputTable
  },
  methods: {
    getRawData(msg) {
      // this.rawData=msg
      // console.log('dataspecifier',this.rawData)
    },
    dataChange(){
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
  width: 35%;
  float: left;
  padding-left: 30px;

}
.right-column {
  width: 60%;
  float: left;
  padding-left: 20px;
}
</style>
