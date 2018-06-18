const Helper         = require('../_helper')
const recursiveFetch = require('../_recursive')

const api          = 'item'
const dest         = 'orchestrion'
const name         = 'Orchestrion Roll'
const plural       = 'Orchestrion Rolls'
const string       = 'orchestrion'
const itemCategory = 94

module.exports = new Helper(name, plural, {
  api,
  dest,
  columns: [
    'id',
    'item_ui_category',
    'name_en',
  ],
  useCallback: true
}, (data, resolve) => {
  data = data.filter(entry => {
    if (entry.item_ui_category !== itemCategory)
      return false

    const nameStr = entry.name_en.toLowerCase()
    if (nameStr.includes('blank'))
      return false
    if (nameStr.includes(string))
      return true

    return false
  })

  recursiveFetch(data, name, (entry, all) => {
    return {
      api: `${api}/${entry.id}`,
      dest,
      format: (data) => {
        return result = {
          id: data.id,
          help: {
            de: data.help_de,
            en: data.help_en,
            fr: data.help_fr,
            jp: data.help_ja,
          },
          xivdb: data.url_xivdb,
        }
      }
    }
  }, resolve)
})