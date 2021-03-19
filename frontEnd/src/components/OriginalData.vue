<template>
  <div class="origin-data-panel">
    <div class="sub-title">Raw Data</div>
    <div class="data-content">
        <!-- <textarea  v-model="rawData" class="input-data"  placeholder="请输入源数据" /> -->
        <a-textarea  class="input-data" placeholder="请输入源数据" :rows="4" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'OriginalData',
  data () {
    return {
      originData: [],
      rawData: '',
      dataArray: []
    }
  },
  methods: {
    getMessage () {
    },
    extractRelation () {
      let arr = []
      this.rawData.split('\n').forEach(item => arr.push(`${item.trim()}`))
      this.dataArray = arr
      // console.log(this.dataArray)
      this.$emit('rawData', this.dataArray)
    }
  },
  created () {
    // this.getMessage();
  },
  mounted () {
    this.getMessage()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.origin-data-panel {
    height: 500px;
    width: 95%;
    border: 3px solid black;
    border-radius: 10px;
    margin: 10px;
    margin-bottom: 40px;
}
.sub-title {
    height: 30px;
    font-size: 22px;
    font-weight: bolder;
    padding-top: 5px;
}
.data-content {
    height: 480px;
    overflow: auto;
    text-align: left;
    /* padding-left: 20px; */
    padding: auto;
    text-align: center;

}
td {
    border-bottom: 1px solid black;
    width: 50%;
}
.input-data {
    margin-top:20px;
    height: 420px;
    width: 95%;
    overflow: auto;
    text-align: left;
}
</style>
