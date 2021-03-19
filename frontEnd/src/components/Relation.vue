<template>
  <div class="relation-panel">
    <div class="sub-title">Relation
      <a-button type="primary" @click="showDrawer">
      Open
      </a-button>
    </div>
    <div class="data-content">
      <a-tabs classs="tabs-content" default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="Tab 1">
          <div  id="relation-content"></div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2">
          <div  id="relation-content2">.</div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">
          <div  id="relation-content3"></div>
        </a-tab-pane>
      </a-tabs>
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
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
// import SuggestionListPanel from './SuggestionListPanel.vue'
// import '@handsontable/dist/handsontable.full.css'

export default {
  name: 'Relation',
  data () {
    return {
      relationData: this.$store.state.relationData,
      hot: {},
      selectedData: [],
      selectedPartIsShow: false
    }
  },
  components: {
    HotTable
    // SuggestionListPanel
  },
  props: [ 'rawData' ],
  methods: {
    getMessage () {
      const path = 'http://127.0.0.1:5000/relation'
      axios.get(path)
        .then((res) => {
          this.relationData = res.data
          this.showData()
          this.$store.dispatch('setRelationData', res.data)
          console.log(this.$store.state.relationData)
          this.$emit('getRelationData', this.relationData)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    showData () {
      var container = document.getElementById('relation-content')
      /* eslint-disable no-new */
      this.hot = new Handsontable(container, {
        // startRows: 8,
        // startCols: 15,
        width: '100%',
        height: 520,
        colWidths: 220,
        data: this.relationData,
        rowHeaders: true,
        colHeaders: true,
        filters: true,
        dropdownMenu: true,
        fillHandle: true,
        // manualRowMove: true,
        // manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation',
        afterDeselect: () => {
          // this.selectedPartIsShow = false
        },
        afterSelection: (row, column, row2, column2, preventScrolling, selectionLayerLevel) => {
          // setting if prevent scrolling after selection
          // preventScrolling.value = true
          var selected = this.hot.getSelected()
          var data = []
          for (var i = 0; i < selected.length; i += 1) {
            var item = selected[i]
            data.push(this.hot.getData.apply(this.hot, item))

            var startRow = Math.min(item[0], item[2])
            var endRow = Math.max(item[0], item[2])
            var startCol = Math.min(item[1], item[3])
            var endCol = Math.max(item[1], item[3])

            for (var rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
              for (var columnIndex = startCol; columnIndex <= endCol; columnIndex += 1) {
                this.hot.setCellMeta(rowIndex, columnIndex, 'className', 'selected-part')
              }
            }
          }
          // output.value = JSON.stringify(data);
          this.selectedData = data
          this.selectedPartIsShow = true
          // console.log(data, window.event)
          this.$emit('selectedData', {
            selectedData: data,
            x: window.event.clientX,
            y: window.event.clientY
          })
        }
      })
      // console.log('relation', this.relationData)
    },
    callback (key) {
      console.log(key)
    },
    getSelectedRange () {
      this.select = this.hot.getSelected()
      // console.log(this.select)
    },
    showDrawer () {
      this.$emit('openSuggestion')
    }
  },
  created () {
    // this.getMessage()
  },
  mounted () {
    this.getMessage()
    // this.dragElement(document.getElementById('drag-panel'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.relation-panel {
    height: 620px;
    width: 95%;
    border: 3px solid black;
    border-radius: 10px;
    margin: 10px;
    margin-top: 60px;
}
.sub-title {
    height: 30px;
    font-size: 22px;
    font-weight: bolder;
    padding-top: 5px;
    /* border-bottom: 1px solid black; */
}
.data-content {
    height: 580px;
    overflow: hidden;
    text-align: left;
    padding-left: 20px;
}
.table-content {
  height: 550px;
  overflow: scroll;
}
#relation-content {
  height: 550px;
  /* overflow: scroll; */
}
.suggestion-panel {
  margin-top: 60px;
}
.handsontable .wtBorder.area{
  cursor: move  !important;
}
.drag-panel {
  position: absolute;
  z-index: 1;
  background: #eeeeee;
  opacity: 0.8;
  cursor: move;
}
.select-col {
  width:220px;
  border: 1px solid #eeeeee;
}
</style>
