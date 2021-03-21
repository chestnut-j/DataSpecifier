<template>
  <div class="table-panel">
    <div class="sub-title">Spreadsheet</div>
    <div id="output-table"></div>
    <div class="preview" v-show="isHover">
      <table>
        <tr class="select-row" v-for="(item,index) in hoverData" :key="(item,index)">
          <td class="select-col" v-for="(element,index) in item" :key="(element,index)">{{element}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Handsontable from 'handsontable'

var data0 = []
export default {
  name: 'OutputTable',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
      data0: [],
      realData: [],
      hot: {},
      colIsFill: [],
      rowIsFill: [],
      intervalId: null,
      spreadData: this.$store.state.spreadData
    }
  },
  props: [ 'data', 'endPos', 'dragIsEnd', 'isHover', 'hoverData', 'pos', 'mappingPos', 'mappingData' ],
  methods: {
    initTable () {
      // var data0 = new Array('','','','','','','','','','')

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
      this.$store.dispatch('setSpreadData', this.hot.getData())
      this.$store.dispatch('addDataOperation', this.hot.getData())
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
      // this.$store.dispatch('updateSpreadTable', this.hot)
    },
    dataRefreh () {
      if (this.intervalId != null) {
        return
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.spreadData = this.$store.state.spreadData
      }, 50)
    }
  },
  created () {
    this.dataRefreh()
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
      this.$store.dispatch('setSpreadData', this.hot.getData())
      this.$store.dispatch('addDataOperation', this.hot.getData())
      const key = this.$store.state.historyOperations.length
      const text = 'drag'
      this.$store.dispatch('addOperation', {key: key, text: text})
      var isEmpty = true
      if ((this.colIsFill[col] && (!this.rowIsFill[row])) || ((!this.colIsFill[col]) && this.rowIsFill[row])) {
        isEmpty = false
      }
      this.colIsFill[col] = true
      this.rowIsFill[row] = true
      this.$emit('dragEnd', this.data[0], this.data0, isEmpty, {col: col, row: row})
      // this.hot.setDataAtCell(row, col, this.data[0][0][0])
    },
    spreadData: {
      handler (val) {
        console.log('spreadData Change')
        this.hot.loadData(this.$store.state.spreadData)
        // this.$store.dispatch('addDataOperation', this.hot.getData())
        // this.updateList()
      },
      deep: true
    },
    // hoverData: function (val) {
    //   this.fillData(this.pos.row, this.pos.col, val)
    // },
    mappingData: {
      handler (val) {
        console.log('mappingdata', this.mappingData)
        if (this.mappingPos === 'body') {
          this.fillData(1, 1, this.mappingData[0])
        } else {
          this.fillData(this.pos.row, this.pos.col, this.mappingData[0])
        }
        this.$store.dispatch('addDataOperation', this.hot.getData())
        // this.updateList()
      },
      deep: true
    },
    isHover: function (val) {
      // console.log(val)
      // if (val === false) {
      //   // console.log(this.hoverData)

      //   var length = this.hoverData.length - 1
      //   if (length === 0) {
      //     length = this.hoverData[0].length - 1
      //   }
      //   // console.log(length)
      //   // for (var i = 0; i < length; i++) {
      //   //   this.hot.undo()
      //   // }
      // } else {
      //   // this.fillData(this.pos.row, this.pos.col, this.hoverData)
      // }
      // this.hot.data = data0
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
.select-row {
  height: 16px;
}
.select-col {
  width:150px;
  border: 1px solid #eeeeee;
}
.preview {
  z-index: 20000;
  max-height: 1000px;
  max-width: 800px;
  float: left;
  position: absolute;
  top: 145px;
  left: 950px;
  overflow: hidden;
  background: #d5e6fc;
  opacity: 0.7;
}
</style>
