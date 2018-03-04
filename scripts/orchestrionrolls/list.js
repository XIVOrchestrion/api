const Helper        = require('../_helper')
const createList    = require('../_list')
const obtainMethod  = require('../../filters/orchestrionrolls/obtainMethods')
const methodStrings = require('../../filters/orchestrionrolls/methodStrings')

const api          = 'item'
const name         = 'Orchestrion Roll'
const plural       = 'Orchestrion Rolls'
const string       = 'orchestrion'
const itemCategory = 94


module.exports = new Helper(name, plural, {
  api,
  columns: [
    'id',
    'item_ui_category',
    'item_action',
    'name_de',
    'name_en',
    'name_fr',
    'name_ja',
    'patch'
  ],
  list:   true,
  format: (data, args) => {
    return {
      methods: methodStrings,
      data: data.filter(entry => {
        if (entry.item_ui_category !== itemCategory)
          return false

        const nameStr = entry.name_en.toLowerCase()
        if (nameStr.includes('blank'))
          return false

        if (nameStr.includes(string))
          return true

        return false
      }).map(entry => {
        const ui   = args[0]
        let method = obtainMethod(entry)

        if (method && !(method instanceof Array))
          method = [method]

        const nameEn = entry.name_en.replace(' Orchestrion Roll', '')
        const nameJp = entry.name_ja.replace('オーケストリオン譜:', '')
       
        return {
          id:   entry.id,
          name: {
            de: nameEn,
            en: nameEn,
            fr: nameEn,
            jp: nameJp,
          },
          category: ui[entry.item_action].category,
          order:    ui[entry.item_action].order,
          patch:    entry.patch,
          ref:      method
        }
      })
    }
  }
}, (data, dest, _helperCreateJSONFn) => {
  createList('orchestrionrolls', data, dest, _helperCreateJSONFn)
})
