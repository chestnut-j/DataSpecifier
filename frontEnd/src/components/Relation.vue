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
        <a-tab-pane key="2" tab="Tab 2" force-render>
          <div  id="relation-content2"></div>
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
    <a-drawer
      class="suggestion-panel"
      title="SuggestionList"
      placement="right"
      :width=800
      :closable="true"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
    <link href="https://cdn.jsdelivr.net/npm/handsontable@8.3.1/dist/handsontable.full.min.css" rel="stylesheet" media="screen">
  </div>

</template>

<script>

import axios from 'axios'
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
// import '@handsontable/dist/handsontable.full.css'

export default {
  name: 'Relation',
  data () {
    return {
      visible: false,
      relationData: []
    }
  },
  components: {
    HotTable
  },
  props: [ 'rawData' ],
  methods: {
    getMessage () {
      const path = 'http://127.0.0.1:5000/relation'
      axios.get(path)
        .then((res) => {
          this.relationData = res.data
          this.showData()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
        })
    },
    showData () {
      var container = document.getElementById('relation-content')
      /* eslint-disable no-new */
      new Handsontable(container, {
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
        manualRowMove: true,
        manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation'
      })
      console.log('relation', this.relationData)
    },
    callback (key) {
      console.log(key)
    },
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    }
  },
  created () {
    this.getMessage()
  },
  mounted () {
    this.getMessage()
    // this.showData();
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
#relation-content {
  height: 550px;
  /* overflow: scroll; */
}
.suggestion-panel {
  margin-top: 60px;
}
</style>
