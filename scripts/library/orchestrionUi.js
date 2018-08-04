const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Orchestrion UI', 'Orchestrion UI', {
  dest: destLibra,
  fileName: 'orchestrionUi',
  file: {
    url: 'Orchestrion',
    columns: [
      'ID',
      'OrchestrionUiparam.Order',
      'OrchestrionUiparam.OrchestrionCategory.ID',
      'Description',
      'Name_en',
      'Name_de',
      'Name_fr',
      'Name_ja',
    ],
  },
  list: true,
  format: (data) => {
    const response = {}

    // data.shift()
    data.forEach(item => {
      return response[item.ID] = {
        id: item.ID,
        name: {
          en: item.Name_en,
          de: item.Name_de,
          fr: item.Name_fr,
          jp: item.Name_ja,
        },
        description: item['Description'],
        category: item['OrchestrionUiparam.OrchestrionCategory.ID'],
        order: item['OrchestrionUiparam.Order'],
      }
    })

    return response
  },
})
