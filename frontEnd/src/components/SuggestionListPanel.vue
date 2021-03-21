<template>
    <div class="panel">
      <div class="spec-board">
        <div class="subtitle">spec board</div>
        <a-card class="model-panel">
          <div class="row-heading">
            <span>(</span>
            <span>
              <a-input v-model="rowHeading"  style="width:60px"></a-input>
            </span>
            <span>) ,</span>
          </div>
          <div class="column-heading">
            <span>(</span>
            <span>
              <a-input v-model="colHeading" style="width:60px"></a-input>
            </span>
            <span>) -></span>
          </div>
          <div class="body">
            <span>(</span>
            <span>
              <a-input v-model="body"  style="width:60px"></a-input>
            </span>
            <span>)</span>
          </div>
        </a-card>
      </div>
      <a-divider />
      <div class="recommend-algorithm">
        <div class="subtitle">recommend algorithm</div>
        <a-collapse v-model="activeKey" :bordered="false">
          <a-collapse-panel key="1" header="Resolving current ambiguity">
            <a-collapse :bordered="false">
              <a-collapse-panel key="1" header="Selection ambiguity">
                <a-radio-group v-model="selectionValue" button-style="solid" @change="onSelectChange">
                  <a-radio-button v-for="item in selectionOptions" :key="item.key" :value="item.key"   :style="radioStyle" @mouseenter="onSelectHover(item)" @mouseleave="outSelectHover(item)">
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="Mapping ambiguity">
                <a-radio-group v-model="mappingValue" button-style="solid" @change="onMappingChange">
                  <a-radio-button v-for="item in mappingOptions" :key="item.key" :value="item.key" :style="radioStyle" @mouseenter="onHover(item)" @mouseleave="outHover(item)" >
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
            </a-collapse>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Predicting subsequent specifications" >
            <a-collapse :bordered="false">
              <a-collapse-panel key="1" header="Incomplete table">
                <a-radio-group  button-style="solid" @change="onOrganizationChange">
                  <a-radio-button v-for="item in incompleteOptions" :key="item.key" :value="item.key"  :style="radioStyle" @mouseenter="onOrganizationHover(item)" @mouseleave="outHover(item)">
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="Heading organizations">
                <a-radio-group  button-style="solid" @change="onOrganizationChange">
                  <a-radio-button v-for="item in organizationOptions" :key="item.key" :value="item.key"  :style="radioStyle" @mouseenter="onOrganizationHover(item)" @mouseleave="outHover(item)">
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="Pivot tables">
                <a-radio-group  button-style="solid" @change="onPivotChange">
                  <a-radio-button v-for="item in pivotOptions" :key="item.key" :value="item.key"  :style="radioStyle" >
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
              <a-collapse-panel key="4" header="Nested cells">
                <a-radio-group  button-style="solid" @change="onChange">
                  <a-radio-button v-for="item in nestedOptions" :key="item.key" :value="item.key"  :style="radioStyle" >
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
              <a-collapse-panel key="5" header="Empty cells">
                <a-radio-group  button-style="solid" @change="onChange">
                  <a-radio-button v-for="item in emptyOptions" :key="item.key" :value="item.key"  :style="radioStyle" >
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
            </a-collapse>
          </a-collapse-panel>
        </a-collapse>
      </div>

      <a-divider />
      <div>
        <div class="subtitle">Provenance and preview</div>
        <div>
          <div class="subtitle">
            History specifications
            <a-button type="primary" @click="backOperation">
            back
            </a-button>
          </div>
          <ol>
            <li v-for="item in historyOperations" :key="item.key" >{{item.text}}</li>
          </ol>
        </div>
      </div>
    </div>
</template>
<script>
const defaultMappingOptions = [{ key: 1, text: 'Intersection' }, {key: 2, text: 'Union'}, { key: 3, text: 'Mapping to rowheading' }, { key: 4, text: 'Mapping to colheading' }, { key: 5, text: 'Mapping to body' }, { key: 6, text: 'Accept the default spec' }]
const defaultIncompleteOptions = [{ key: 1, text: '(A×B),()->(C)' }, { key: 2, text: '(),(A×B)->(C)' }, { key: 3, text: '(A),(B)->(C)' }, { key: 4, text: '(B),(A)->(C)' }]
export default {
  name: 'SuggestionListPanel',
  props: [ 'selectData', 'isEmpty', 'pos' ],
  data () {
    return {
      rdata: [['Alabama', 2004, 4029.3], ['Alabama', 2005, 3900], ['Alabama', 2006, 3937], ['Alabama', 2007, 3974.9], ['Alabama', 2008, 4081.9]],
      relationData: this.$store.state.relationData,
      spreadData: this.$store.state.spreadData,
      dataSet: this.$store.state.dataSet,
      spreadTable: this.$store.state.spreadTable,
      hoverData: [],
      mappingData: [],
      activeKey: [],
      colName: '',
      rowHeading: '',
      colHeading: '',
      body: '',
      rowData: [],
      colData: [],
      bodyData: [],
      selectionValue: '',
      mappingValue: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      mappingOptions: [],
      selectionOptions: [],
      incompleteOptions: [],
      organizationOptions: [{ key: 1, text: '(A×B),()->(C)' }, { key: 2, text: '(),(A×B)->(C)' }, { key: 3, text: '(A),(B)->(C)' }, { key: 4, text: '(B),(A)->(C)' }],
      pivotOptions: [{ key: 1, text: 'sum' }, { key: 2, text: 'average' }],
      nestedOptions: [{ key: 1, text: 'expand the nested cell' }],
      emptyOptions: [{ key: 1, text: 'fill as last cell' }],
      historySuggestion: this.$store.state.historySuggestion,
      historyOperations: this.$store.state.historyOperations
    }
  },
  methods: {
    onChange (e) {
      console.log('radio checked', e.target.value)
    },
    onMappingChange (e) {
      console.log('radio checked', e.target.value)
      const key = this.$store.state.historyOperations.length
      const text = defaultMappingOptions[this.mappingValue - 1].text
      this.$store.dispatch('addOperation', {key: key, text: text})
      this.updateList()
      var colIndex
      if (e.target.value > 2 && e.target.value < 6) {
        this.$store.state.dataSet.forEach((item, index) => {
          if (item.has(this.mappingData[0][0])) {
            colIndex = index
          }
        })
        this.colName = this.$store.state.colName[colIndex]
      }

      switch (e.target.value) {
        case 3:
          if (this.rowHeading === '') {
            this.rowHeading = this.colName
          } else {
            this.rowHeading += '×' + this.colName
          }
          // var data = []
          // this.mappingData[0].forEach(item => {
          //   data.push([item])
          // })
          // this.rowData = this.mappingData[0]
          // this.$emit('mapping', {data: [this.mappingData], pos: 'row'})
          this.$store.dispatch('setSpreadData', this.hoverData)
          this.$store.dispatch('addDataOperation', this.hoverData)
          break
        case 4:
          if (this.colHeading === '') {
            this.colHeading = this.colName
          } else {
            this.colHeading += '×' + this.colName
          }
          // this.colData = this.mappingData
          // this.$emit('mapping', {data: [this.mappingData], pos: 'col'})
          this.$store.dispatch('setSpreadData', this.hoverData)
          this.$store.dispatch('addDataOperation', this.hoverData)
          break
        case 5:
          this.body = this.colName
          if (this.rowHeading === 'A' && this.colHeading === 'B' && this.body === 'C') {
            this.$store.dispatch('setSpreadData', this.$store.state.dataOrganization[2])
            this.$store.dispatch('addDataOperation', this.$store.state.dataOrganization[2])
            this.mappingOptions = []
          }
          if (this.rowHeading === 'B' && this.colHeading === 'A' && this.body === 'C') {
            this.$store.dispatch('setSpreadData', this.$store.state.dataOrganization[3])
            this.$store.dispatch('addDataOperation', this.$store.state.dataOrganization[3])
            this.mappingOptions = []
          }
          break
        case 6:
          console.log('enter 6')
          this.$store.dispatch('setSpreadData', this.$store.state.dataOrganization[0])
          this.$store.dispatch('addDataOperation', this.$store.state.dataOrganization[0])
          this.mappingOptions = []
          this.rowHeading = this.$store.state.colName[0]
          const length = this.$store.state.dataSet.length - 1
          this.$store.state.colName.forEach((item, index) => {
            if (index < length && index > 0) {
              this.rowHeading += '×' + item
            }
          })
          this.colHeading = ''
          this.body = this.$store.state.colName[length]
          break
      }
      this.$emit('cancelHoverData')
    },
    onSelectChange (e) {
      console.log('radio checked', e.target.value)

      switch (e.target.value) {
        case 1:
          this.$store.dispatch('setSpreadData', this.relationData)
          this.$store.dispatch('addDataOperation', this.relationData)
          this.mappingOptions = []
          const key = this.$store.state.historyOperations.length
          const text = this.selectionOptions[e.target.value - 1].text
          this.rowHeading = this.$store.state.colName[0]
          const length = this.$store.state.dataSet.length - 1
          this.$store.state.colName.forEach((item, index) => {
            if (index < length && index > 0) {
              this.rowHeading += '×' + item
            }
          })
          this.colHeading = ''
          this.body = this.$store.state.colName[length]
          this.$store.dispatch('addOperation', {key: key, text: text})
          break
        case 2:
          var data = this.selectionOptions[e.target.value - 1].data
          console.log(data)
          this.mappingData = data
          this.$emit('selectData', data)
          break
        default:
          break
      }
      this.$emit('selectData', data)
    },
    onOrganizationChange (e) {
      console.log('radio checked', e.target.value)
      switch (e.target.value) {
        case 1:
          this.$store.dispatch('setSpreadData', this.relationData)
          this.$store.dispatch('addDataOperation', this.relationData)
          this.mappingOptions = []
          const key = this.$store.state.historyOperations.length
          const text = this.organizationOptions[e.target.value - 1].text
          this.rowHeading = this.$store.state.colName[0]
          const length = this.$store.state.dataSet.length - 1
          this.$store.state.colName.forEach((item, index) => {
            if (index < length && index > 0) {
              this.rowHeading += '×' + item
            }
          })
          this.colHeading = ''
          this.body = this.$store.state.colName[length]
          this.$store.dispatch('addOperation', {key: key, text: text})
          break
        case 2:
          this.$store.dispatch('setSpreadData', this.$store.state.dataCol)
          this.$store.dispatch('addDataOperation', this.$store.state.dataCol)
          this.mappingOptions = []
          const key2 = this.$store.state.historyOperations.length
          const text2 = this.organizationOptions[e.target.value - 1].text
          this.colHeading = this.$store.state.colName[0]
          const length2 = this.$store.state.dataSet.length - 1
          this.$store.state.colName.forEach((item, index) => {
            if (index < length2 && index > 0) {
              this.colHeading += '×' + item
            }
          })
          this.rowHeading = ''
          this.body = this.$store.state.colName[length2]
          this.$store.dispatch('addOperation', {key: key2, text: text2})
          break
        case 3:
          // console.log(this.$store.state.dataOrganization[2])
          this.$store.dispatch('setSpreadData', this.$store.state.dataOrganization[2])
          this.$store.dispatch('addDataOperation', this.$store.state.dataOrganization[2])
          this.mappingOptions = []
          const key3 = this.$store.state.historyOperations.length
          const text3 = this.organizationOptions[e.target.value - 1].text
          this.rowHeading = this.$store.state.colName[0]
          this.colHeading = this.$store.state.colName[1]
          this.body = this.$store.state.colName[2]
          this.$store.dispatch('addOperation', {key: key3, text: text3})
          break
        case 4:
          // console.log(this.$store.state.dataOrganization[2])
          this.$store.dispatch('setSpreadData', this.$store.state.dataOrganization[3])
          this.$store.dispatch('addDataOperation', this.$store.state.dataOrganization[3])
          this.mappingOptions = []
          const key4 = this.$store.state.historyOperations.length
          const text4 = this.organizationOptions[e.target.value - 1].text
          this.colHeading = this.$store.state.colName[0]
          this.rowHeading = this.$store.state.colName[1]
          this.body = this.$store.state.colName[2]
          this.$store.dispatch('addOperation', {key: key4, text: text4})
          break
        default:
          break
      }
    },
    onPivotChange (e) {
      console.log('radio checked', e.target.value)
      const key = this.$store.state.historyOperations.length
      const text = this.pivotOptions[e.target.value - 1].text
      this.$store.dispatch('addOperation', {key: key, text: text})
      switch (e.target.value) {
        case 1:
          break
        case 2:
          break
        default:
          break
      }
    },
    onHover (item) {
      console.log('radio hover', item.key)
      var hoverData = []
      var colIndex
      if (item.key > 2 && item.key < 6) {
        this.$store.state.dataSet.forEach((element, index) => {
          if (element.has(this.mappingData[0][0])) {
            colIndex = index
          }
        })
        this.colName = this.$store.state.colName[colIndex]
      }
      switch (item.key) {
        case 3:
          if (this.rowHeading === '' && this.colName === 'A' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[4]
          }
          if (this.rowHeading === '' && this.colName === 'B' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[6]
          }
          if (this.rowHeading === '' && this.colName === 'A' && this.colHeading === 'B') {
            hoverData = this.$store.state.dataOrganization[8]
          }
          if (this.rowHeading === '' && this.colName === 'B' && this.colHeading === 'A') {
            hoverData = this.$store.state.dataOrganization[9]
          }
          if (this.rowHeading === 'A' && this.colName === 'B' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[10]
          }
          break
        case 4:
          if (this.rowHeading === '' && this.colName === 'A' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[5]
          }
          if (this.rowHeading === '' && this.colName === 'B' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[7]
          }
          if (this.rowHeading === 'B' && this.colName === 'A' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[9]
          }
          if (this.rowHeading === 'A' && this.colName === 'B' && this.colHeading === '') {
            hoverData = this.$store.state.dataOrganization[8]
          }
          break
        case 5:
          if (this.rowHeading === 'A' && this.colHeading === 'B') {
            hoverData = this.$store.state.dataOrganization[2]
          }
          if (this.rowHeading === 'B' && this.colHeading === 'A') {
            hoverData = this.$store.state.dataOrganization[3]
          }
          break
        case 6:
          hoverData = this.$store.state.dataOrganization[0]
          break
      }
      this.hoverData = hoverData
      this.$emit('hoverData', hoverData)
    },
    outHover (item) {
      console.log('radio end hover', item.key)
      this.$emit('cancelHoverData')
    },
    onSelectHover (item) {
      console.log('radio hover', item.key)
      var hoverData = []
      switch (item.key) {
        case 1:
          hoverData = this.$store.state.dataOrganization[0]
          break
        default:
          this.$emit('cancelHoverData')
          break
      }
      this.$emit('hoverData', hoverData)
    },
    outSelectHover (item) {
      console.log('radio end hover', item.key)
      this.$emit('cancelHoverData')
    },
    onOrganizationHover (item) {
      console.log('radio hover', item.key)
      var hoverData = []
      switch (item.key) {
        case 1:
          hoverData = this.$store.state.dataOrganization[0]
          break
        case 2:
          hoverData = this.$store.state.dataOrganization[1]
          break
        case 3:
          hoverData = this.$store.state.dataOrganization[2]
          break
        case 4:
          hoverData = this.$store.state.dataOrganization[3]
          break
        default:
          this.$emit('cancelHoverData')
          break
      }
      this.$emit('hoverData', hoverData)
    },
    onIncompleteHover (item) {
      console.log('radio hover', item.key)
      var hoverData = []
      switch (item.key) {
        case 1:
          hoverData = this.$store.state.dataOrganization[0]
          break
        case 2:
          hoverData = this.$store.state.dataOrganization[1]
          break
        case 3:
          hoverData = this.$store.state.dataOrganization[2]
          break
        case 4:
          hoverData = this.$store.state.dataOrganization[3]
          break
        default:
          this.$emit('cancelHoverData')
          break
      }
      this.$emit('hoverData', hoverData)
    },
    onDeselectHover () {
      // console.log('cancel')
      // this.$emit('cancelHoverData')
    },
    updateList () {
      this.updateSelectList()
      this.updateMappingList()
      this.updatePredictionList()
      this.updateIncompleteList()
      const list = {
        selection: this.selectionOptions,
        mapping: this.mappingOptions,
        prediction: this.predictionOptions
      }
      this.$store.dispatch('addSuggestionState', list)
      console.log(this.$store.state.historySuggestion)
    },
    updateMappingList () {
      this.mappingOptions = []
      this.mappingValue = ''
      // console.log(this.isEmpty)
      if (this.isEmpty || !this.isEmpty) {
        defaultMappingOptions.forEach((item, index) => {
          if (index > 1 && index < 5) {
            this.mappingOptions.push(item)
          }
        })
      } else {
        this.mappingOptions = [{ key: 1, text: 'Intersection' }, {key: 2, text: 'Union'}]
      }
      if (this.selectData.length === 1 && this.selectData[0].length !== 1) {
        this.mappingOptions = [defaultMappingOptions[5]]
      }
      // this.$store.dispatch('setMappingOptions', mappingOptions)
      console.log(this.mappingOptions)
    },
    updateSelectList () {
      this.selectionOptions = []
      this.selectionValue = ''
      if (this.selectData.length === 1 && this.selectData[0].length === 1) {
        const content = this.selectData[0][0]
        let myCol
        let colData = []

        // row
        for (let i = 0; i < this.relationData.length; i++) {
          if (this.relationData[i].indexOf(content) > -1) {
            myCol = this.relationData[i].indexOf(content)
            this.selectionOptions.push({
              key: 1,
              text: 'Select the row ' + 'spec: ' + '(A×B),()->(C)',
              data: [this.relationData[i]],
              col: [0, 1, 2, 3, 4, 5, 6]
            })
            break
          }
        }

        // column
        console.log(this.$store.state.dataSet)
        this.dataSet.forEach((item) => {
          if (item.has(content)) {
            colData = item
          }
        })
        this.selectionOptions.push({
          key: 2,
          text: 'Select the col',
          data: [[...colData]],
          col: [myCol]
        })
        console.log(this.selectionOptions)

        // conditions
      } else if (this.selectData[0].length === 1) {
        this.selectionOptions = []
      }
    },
    updatePredictionList () {

    },
    updateIncompleteList () {
      this.incompleteOptions = []
      if (this.body === '') {
        if (this.rowHeading === '' && this.colHeading === '') {
          this.incompleteOptions = defaultIncompleteOptions
        }
        if (this.rowHeading === '' && this.colHeading === 'A') {
          this.incompleteOptions.push(defaultIncompleteOptions[1])
          this.incompleteOptions.push(defaultIncompleteOptions[3])
        }
        if (this.rowHeading === '' && this.colHeading === 'B') {
          this.incompleteOptions.push(defaultIncompleteOptions[1])
          this.incompleteOptions.push(defaultIncompleteOptions[2])
        }
        if (this.rowHeading === 'A' && this.colHeading === '') {
          this.incompleteOptions.push(defaultIncompleteOptions[0])
          this.incompleteOptions.push(defaultIncompleteOptions[2])
        }
        if (this.rowHeading === 'B' && this.colHeading === '') {
          this.incompleteOptions.push(defaultIncompleteOptions[0])
          this.incompleteOptions.push(defaultIncompleteOptions[3])
        }
        if (this.rowHeading === 'A×B' && this.colHeading === '') {
          this.incompleteOptions.push(defaultIncompleteOptions[0])
        }
        if (this.rowHeading === '' && this.colHeading === 'A×B') {
          this.incompleteOptions.push(defaultIncompleteOptions[1])
        }
        if (this.rowHeading === 'A' && this.colHeading === 'B') {
          this.incompleteOptions.push(defaultIncompleteOptions[2])
        }
        if (this.rowHeading === 'B' && this.colHeading === 'A') {
          this.incompleteOptions.push(defaultIncompleteOptions[3])
        }
      }
    },
    backOperation () {
      this.$store.dispatch('backOperation')
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
  watch: {
    activeKey: function (key) {
      console.log(key)
    },
    selectionValue: function (key) {
      // console.log(this.$store.state.spreadData)
    },
    selectData: {
      handler (val) {
        // console.log('data in select', val)
        // console.log('relation', this.relationData)
        this.updateList()
        // this.updateMappingList()
      },
      deep: true
    },
    spreadData: {
      handler (val) {
        console.log('data in output', val)
        this.updateList()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.model-panel {
  height:80px;
  width: 100%;
}
.column-heading {
  float: left;
  padding: 5px;
}
.row-heading {
  padding: 5px;
  float: left;
}
.body {
  padding: 5px;
  float: left;
}
.recommend-table {
  height:200px;
  width: 100%;
}
.subtitle {
  font-size:18px;
  text-align: left;
  font-weight: bold;
}
.table-content {
  text-align: center;
  width:100%;
}
td {
  border: 1px solid #8d8d8d;
}
tr {
  border: 1px solid #8d8d8d;
}
.panel {
    height:100%;
    width:100%;
}
</style>
