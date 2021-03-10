<template>
  <div class="table-panel">
    <h2>outputTable</h2>
    <div id="output-table"></div>
  </div>
</template>

<script>
import Handsontable from "handsontable";

export default {
  name: 'OutputTable',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      data: [['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','',''],
      ['','','','','','','','','','']]
    }
  },
  methods : {
    initTable() {
      // var data0 = new Array('','','','','','','','','','')
      var data = []
      for(var i=0;i<37;i++){        //一维长度为10
        data.push(['','','','','','','','','','']);    //在声明二维
      }
      var container = document.getElementById('output-table');
      var hot = new Handsontable(container, {
        data: data,
        startRows: 80,
        colWidths: 150,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        licenseKey: 'non-commercial-and-evaluation'
      });
    }
  },
  mounted() {
    this.initTable()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-panel {
    height: 940px;
    /* width: 500px; */
    border: 3px solid black;
    border-radius: 10px;
    margin: 10px;
    /* text-align: center; */
}
#output-table {
  height: 100%;
  /* width: 98%; */
  overflow: auto;
  margin: 5px;
}
</style>
