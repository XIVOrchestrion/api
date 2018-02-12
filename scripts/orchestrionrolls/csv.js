const CsvHelper = require('../_csv')

const name     = 'orchestrion CSV'
const plural   = 'orchestrion CSVs'
const itemType = 5845

module.exports = new CsvHelper(name, plural, {
  dest:      'orchestrionUi',
  files: [
    {
      url:  'Orchestrion',
      headers: ['key', 'name', 'description']
    },
    {
      url:  'OrchestrionUiparam',
      headers: ['key', 'category', 'order']
    },
    {
      url: 'ItemAction',
    }
  ],
  format: (data, args) => {
    const orchestrion = data[0].slice(2)
    const uiParam     = data[1].slice(2)
    const itemAction  = data[2].slice(2)

    const filteredItems = itemAction.filter(item => {
      if (item['Type'] === itemType)
       return true

      return false
    }).map(item => {
      return item['#']
    })

    const map = new Map()

    filteredItems.forEach((item, k) => {
      const obj = {
        id:       item['Data[0]'],
        name:     orchestrion[k].name,
        help:     orchestrion[k].description,
        category: uiParam[k].category,
        order:    uiParam[k].order
      }
      map.set(item, obj)
    })

    function strMapToObj(strMap) {
      let obj = Object.create(null)
      for (let [k,v] of strMap) {
        obj[k] = v
      }

      return obj
    }

    return strMapToObj(map)
  }
})