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
      if (item['Type'] === itemType) {
        // console.log(item)
        return true
     }

      return false
    }).map(item => {
      return item
    })

    const map = new Map()

    filteredItems.forEach((item, k) => {
      let itemActionKey = item['#']
      let itemID = item['Data[0]']
      let itemIDKey = itemID - 1
      const obj = {
        id:       itemID,
        name:     orchestrion[itemIDKey].name,
        help:     orchestrion[itemIDKey].description,
        category: uiParam[itemIDKey].category,
        order:    uiParam[itemIDKey].order
      }
      map.set(itemActionKey, obj)
    })


    function strMapToObj(strMap) {
      let obj = Object.create(null)
      for (let [k,v] of strMap) {
        obj[k] = v
      }

      console.log(obj)

      return obj
    }

    return strMapToObj(map)
  }
})
