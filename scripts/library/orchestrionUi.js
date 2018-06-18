const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Orchestrion UI', 'Orchestrion UI', {
  dest: destLibra,
  fileName: 'orchestrionUi',
  file: {
    url: 'OrchestrionUiparam',
    columns: [
      'ID',
      'Order',
      'OrchestrionCategory.ID',
    ],
  },
  list: true,
  format: (data) => {
    const response = {}

    data.shift()
    data.forEach(item => {
      return response[item.ID] = {
        id: item.ID,
        category: item['OrchestrionCategory.ID'],
        order: item.Order,
      }
    })

    return response
  },
})
