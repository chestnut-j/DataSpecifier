<template>
  <div class="relation-panel">
    <div class="sub-title">Relation</div>
    <div class="data-content">
      <div  id="relation"></div>
      <!-- {{relationData}} -->
      <!-- <tr v-for="item in relationData" :key="item">
          {{ item }}
      </tr> -->
    </div>
    <link href="https://cdn.jsdelivr.net/npm/handsontable@8.3.1/dist/handsontable.full.min.css" rel="stylesheet" media="screen">
  </div>
  
</template>

<script>
  
import axios from 'axios'
import Handsontable from "handsontable";
// import '@handsontable/dist/handsontable.full.css'


export default {
  name: 'Realation',
  data () {
    return {
      relationData: []
    }
  },
  props:['rawData'],
  methods: {
    getMessage() {
      console.log('relation',this.rawData)
      const path = 'http://127.0.0.1:5000/relation';
      axios.get(path)
        .then((res) => {
          this.relationData = res.data;
          console.log(this.relationData) 
          this.showData();
        })
        .catch((error) => {
           // eslint-disable-next-line
          console.error(error);
        });

    },
    showData() {
      var container = document.getElementById('relation');
      var hot = new Handsontable(container, {
        // startRows: 8,
        startCols: 15,
        width: "100%",
        height: "100%",
        colWidths: 150,
        data: this.relationData,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        licenseKey: 'non-commercial-and-evaluation'
      });

    },
  },
  created() {
    // this.getMessage();
  },
  mounted() {
    this.getMessage();
    // this.showData();
  },
  watch: {
    rawData(val) { this.getMessage() }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.relation-panel {
    height: 500px;
    width: 95%;
    border: 3px solid black;
    border-radius: 10px;
    margin: 10px;
    margin-top: 40px;
}
.sub-title {
    height: 30px;
    font-size: 22px;
    font-weight: bolder;
    padding-top: 5px;
    /* border-bottom: 1px solid black; */
}
.data-content {
    height: 460px;    
    overflow: auto;
    text-align: left;
    padding-left: 20px;
}
</style>
