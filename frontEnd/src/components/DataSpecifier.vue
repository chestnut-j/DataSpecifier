<template>
  <div class="hello">
    <div class="left-column">
      <originalData @rawData='getRawData'></originalData>
      <relation :rawData='rawData' @selectedData='showPanel' @openSuggestion="showDrawer"></relation>
    </div>
    <div v-show="selectedPartIsShow" class="drag-panel" id="drag-panel">
      <!-- <a-card > -->
        <table >
          <tr class="select-row" v-for="(item,index) in data[0]" :key="index">
            <td class="select-col" v-for="element in item" :key="(item,element)">{{element}}</td>
          </tr>
        </table>
      <!-- </a-card> -->
    </div>
    <div class="right-column">
      <outputTable
        :data='data'
        :endPos='endPos'
        :isHover='isHover'
        :hoverData="hoverData"
        :pos="pos"
        :mappingPos="mappingPos"
        :mappingData="mappingData"
        @dragEnd='setDragEnd'
      ></outputTable>
    </div>
    <!-- <div class="suggestion-list" :style="{width:(suggestionListStatus?'800px':'20px')}">
      <suggestion-list-panel />
    </div> -->
    <a-drawer
      class="suggestion-panel"
      title="SuggestionList"
      placement="right"
      :maskClosable=false
      :mask=false
      :width=450
      :closable="true"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <suggestion-list-panel
        :selectData="selectData"
        :spreadSheet='spreadSheet'
        :isEmpty="isEmpty"
        :pos="pos"
        @mapping="getMappingData"
        @selectData="getSelectData"
        @hoverData="getHoverData"
        @cancelHoverData="cancelHoverData"
      />
    </a-drawer>
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
      visible: false,
      rawData: '',
      relationData: this.$store.state.relationData,
      selectData: [],
      spreadSheet: [],
      // msg: 'Welcome to Your Vue.js App'
      suggestionListStatus: true,
      selectedPartIsShow: false,
      data: [],
      endPos: { x: '', y: '' },
      dragIsEnd: false,
      isEmpty: true,
      pos: {row: '', col: ''},
      isSelected: false,
      isHover: false,
      hoverData: [],
      mappingData: [],
      mappingPos: ''
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
    getRelationData (val) {
      this.relationData = val
    },
    dataChange () {
      // console.log(this.rawData)
    },
    showPanel (data) {
      this.selectedPartIsShow = true
      this.dragIsEnd = false
      this.data = data.selectedData
      var elmnt = document.getElementById('drag-panel')
      elmnt.style.left = data.x + 'px'
      elmnt.style.top = data.y + 'px'
    },
    dragElement (elmnt) {
      var pos1 = 0
      var pos2 = 0
      var pos3 = 0
      var pos4 = 0
      var end = {}
      var _this = this
      if (document.getElementById(elmnt.id)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id).onmousedown = dragMouseDown
      } else {
      //   // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown
      }
      function dragMouseDown (e) {
        // this.selectedPartIsShow = true
        e = e || window.event
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }

      function elementDrag (e) {
        e = e || window.event
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
      }

      function closeDragElement (e) {
        // stop moving when mouse button is released:
        e = window.event
        end = { x: e.clientX, y: e.clientY }
        _this.selectedPartIsShow = false
        _this.endPos = end
        // console.log(_this.endPos)
        document.onmouseup = null
        document.onmousemove = null
      }
    },
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    setDragEnd (data, data2, isEmpty, pos) {
      this.dragIsEnd = true
      this.selectData = data
      this.spreadSheet = data2
      this.isEmpty = isEmpty
      this.pos = pos
    },
    getMappingData (data) {
      this.mappingData = data.data
      this.mappingPos = data.pos
    },
    getSelectData (data) {
      this.isSelected = true
    },
    getHoverData (data) {
      this.isHover = true
      this.isSelected = false
      this.hoverData = data
    },
    cancelHoverData () {
      if (!this.isSelected) {
        this.isHover = false
      }
    }
  },
  mounted () {
    this.dragElement(document.getElementById('drag-panel'))
  },
  watch: {
    endPos: function (val) {
      this.endPos = val
      // console.log(this.endPos)
    }
  }
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
  width: 62%;
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
#drag-panel {
  position: absolute;
  z-index: 1000000;
  background: #ffffff;
  opacity: 0.8;
  cursor: move;
}
.select-col {
  width:220px;
  border: 1px solid #eeeeee;
}
</style>
