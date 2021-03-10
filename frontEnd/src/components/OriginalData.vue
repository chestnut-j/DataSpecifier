<template>
  <div class="origin-data-panel">
    <div class="sub-title">originalData</div>
    <div class="data-content">
        <!-- {{originData}} -->
        <!-- <tr v-for="items in originData" :key="items">
            <td v-for="item in items" :key="item">{{item}}</td>
        </tr> -->
        <!-- <textarea class="input-data" name="rawData" type="text"/> -->
        <textarea  v-model="rawData" class="input-data"  placeholder="请输入源数据" />
        <!-- <p>{{rawData}}</p> -->
        <!-- <button @click="extractRelation">relation extraction</button> -->
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import Input from 'ant-design-vue/lib/input';
// import 'ant-design-vue/dist/antd.css';
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
    height: 440px;
    width: 95%;
    overflow: auto;
    text-align: left;
}
</style>
