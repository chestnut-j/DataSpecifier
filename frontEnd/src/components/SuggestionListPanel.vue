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
              <a-input style="width:60px"></a-input>
            </span>
            <span>) -></span>
          </div>
          <div class="body">
            <span>(</span>
            <span>
              <a-input value="C" style="width:60px"></a-input>
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
                  <a-radio-button v-for="item in selectionOptions" :key="item.key" :value="item.key"  @mouseenter="onSelectHover(item.data)" @mouseleave="onDeselectHover" :style="radioStyle" >
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="Mapping ambiguity">
                <a-radio-group v-model="mappingValue" button-style="solid" @change="onMappingChange">
                  <a-radio-button v-for="item in mappingOptions" :key="item.key" :value="item.key" :style="radioStyle" >
                    {{item.text}}
                  </a-radio-button>
                </a-radio-group>
              </a-collapse-panel>
            </a-collapse>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="Predicting subsequent specifications" >
            <a-collapse :bordered="false">
              <a-collapse-panel key="1" header="Incomplete table">
                  <p>1</p>
              </a-collapse-panel>
              <a-collapse-panel key="2" header="Heading organizations">
                  <p>1</p>
              </a-collapse-panel>
              <a-collapse-panel key="3" header="Pivot tables">
                  <p>1</p>
              </a-collapse-panel>
              <a-collapse-panel key="4" header="Nested cells">
                  <p>1</p>
              </a-collapse-panel>
              <a-collapse-panel key="5" header="Empty cells">
                  <p>1</p>
              </a-collapse-panel>
            </a-collapse>
          </a-collapse-panel>
        </a-collapse>
      </div>

      <a-divider />
      <div>
        <div class="subtitle">Provenance and preview</div>
      </div>
    </div>
</template>
<script>
const defaultMappingOptions = [{ key: 1, text: 'Intersection' }, {key: 2, text: 'Union'}, { key: 3, text: 'Mapping to rowheading' }, { key: 4, text: 'Mapping to colheading' }, { key: 5, text: 'Mapping to body' }]

export default {
  name: 'SuggestionListPanel',
  props: [ 'selectData', 'spreadSheet', 'isEmpty', 'pos' ],
  data () {
    return {
      rdata: [['Alabama', 2004, 4029.3], ['Alabama', 2005, 3900], ['Alabama', 2006, 3937], ['Alabama', 2007, 3974.9], ['Alabama', 2008, 4081.9]],
      relationData: this.$store.state.relationData,
      activeKey: [],
      colName: '',
      rowHeading: '',
      colHeading: '',
      body: '',
      selectionValue: '',
      mappingValue: '',
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      },
      mappingOptions: [],
      selectionOptions: []
    }
  },
  methods: {
    onMappingChange (e) {
      console.log('radio checked', e.target.value)
      switch (e.target.value) {
        case 3: this.rowHeading = this.colName
          break
        case 4: this.colHeading = this.colName
          break
        case 5: this.body = this.colName
          break
      }
    },
    onSelectChange (e) {
      console.log('radio checked', e.target.value)
      var data = this.selectionOptions[e.target.value - 1].data
      this.colName = this.selectionOptions[e.target.value - 1].col[0] + 'A'
      this.$emit('selectData', data)
    },
    onSelectHover (data) {
      // console.log(data)
      this.$emit('hoverData', data)
    },
    onDeselectHover () {
      // console.log('cancel')
      this.$emit('cancelHoverData')
    },
    updateList () {

    },
    updateMappingList () {
      this.mappingOptions = []
      this.mappingValue = ''
      // console.log(this.isEmpty)
      if (this.isEmpty) {
        defaultMappingOptions.forEach((item, index) => {
          if (index > 1 && index < 5) {
            this.mappingOptions.push(item)
          }
        })
      } else {
        this.mappingOptions = [{ key: 1, text: 'Intersection' }, {key: 2, text: 'Union'}]
      }
    },
    updateSelectList () {
      this.selectionOptions = []
      this.selectionValue = ''
      if (this.selectData.length === 1 && this.selectData[0].length === 1) {
        const content = this.selectData[0][0]
        let myCol
        let colData = []
        for (let i = 0; i < this.relationData.length; i++) {
          if (this.relationData[i].indexOf(content) > -1) {
            myCol = this.relationData[i].indexOf(content)
            this.selectionOptions.push({
              key: 1,
              text: 'Select the row (A×B),()->(C)',
              data: [this.relationData[i]],
              col: [0, 1, 2, 3, 4, 5, 6]
            })
            break
          }
        }

        this.relationData.forEach((item) => {
          colData.push([item[myCol]])
        })
        this.selectionOptions.push({
          key: 2,
          text: 'Select the col',
          data: colData,
          col: [myCol]
        })
        console.log(this.selectionOptions)

        this.updateMappingList()
      } else if (this.selectData.length === 1) {
        this.mappingOptions = []
      }
    }
  },
  watch: {
    activeKey: function (key) {
      console.log(key)
    },
    selectData: {
      handler (val) {
        // console.log('data in select', val)
        // console.log('relation', this.relationData)
        this.updateSelectList()
        // this.updateMappingList()
      },
      deep: true
    },
    spreadSheet: {
      handler (val) {
        // console.log('data in output', val)
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
