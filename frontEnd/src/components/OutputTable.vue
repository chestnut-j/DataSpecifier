<template>
  <div class="table-panel">
    <div class="sub-title">Spreadsheet</div>
    <div id="output-table"></div>
  </div>
</template>

<script>
import Handsontable from 'handsontable'

export default {
  name: 'OutputTable',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      data0: [],
      realData: [],
      hot: {},
      colIsFill: [],
      rowIsFill: []
    }
  },
  props: [ 'data', 'endPos', 'dragIsEnd', 'isHover', 'hoverData', 'pos' ],
  methods: {
    initTable () {
      // var data0 = new Array('','','','','','','','','','')
      var data0 = []
      for (var i = 0; i < 260; i++) { // 一维长度为10
        // data0.push(['1', '2', '3', '4', '5', '6', '7', '8', '9']) // 在声明二维
        data0.push(['', '', '', '', '', '', '', '', '']) // 在声明二维
        this.rowIsFill.push(false)
      }
      this.colIsFill = [false, false, false, false, false, false, false, false, false]
      this.data0 = data0
      var container = document.getElementById('output-table')
      /* eslint-disable no-new */
      this.hot = new Handsontable(container, {
        data: this.data0,
        startRows: 80,
        colWidths: 150,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        columnSorting: true,
        headerTooltips: true,
        formulas: true,
        licenseKey: 'non-commercial-and-evaluation'
      })
    },
    fillData (row, col, data) {
      var i = row
      var j = col
      data.forEach((item) => {
        j = col
        item.forEach((element) => {
          this.hot.setDataAtCell(i, j, element)
          j = j + 1
        })
        i = i + 1
      })
    }
  },
  mounted () {
    this.initTable()
    // console.log(this.data, this.endPos)
  },
  watch: {
    endPos: function (val) {
      this.endPos = val
      var col = Math.floor((this.endPos.x - 980) / 150)
      var row = Math.floor((this.endPos.y - 150) / 22)
      // console.log(this.data[0], row, col)

      this.fillData(row, col, this.data[0])
      var isEmpty = true
      if ((this.colIsFill[col] && (!this.rowIsFill[row])) || ((!this.colIsFill[col]) && this.rowIsFill[row])) {
        isEmpty = false
      }
      this.colIsFill[col] = true
      this.rowIsFill[row] = true
      this.$emit('dragEnd', this.data[0], this.data0, isEmpty, {col: col, row: row})
      // this.hot.setDataAtCell(row, col, this.data[0][0][0])
    },
    // hoverData: function (val) {
    //   this.fillData(this.pos.row, this.pos.col, val)
    // },
    isHover: function (val) {
      // console.log(val)
      if (val === false) {
        // console.log(this.hoverData)

        var length = this.hoverData.length - 1
        if (length === 0) {
          length = this.hoverData[0].length - 1
        }
        // console.log(length)
        for (var i = 0; i < length; i++) {
          this.hot.undo()
        }
      } else {
        this.fillData(this.pos.row, this.pos.col, this.hoverData)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-panel {
    height: 1180px;
    /* width: 500px; */
    border: 3px solid black;
    border-radius: 10px;
    margin: 10px;
    /* text-align: center; */
}
.sub-title {
    height: 30px;
    font-size: 22px;
    font-weight: bolder;
    padding-top: 5px;
    text-align: center;
    /* border-bottom: 1px solid black; */
}
.table-content {
  height: 1000px;
  overflow: auto;
}
#output-table {
  height: 97%;
  /* width: 98%; */
  overflow: auto;
  margin: 5px;
}
</style>
