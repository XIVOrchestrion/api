const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Instances', 'Instances', {
  dest: destLibra,
  fileName: 'instance',
  file: {
    url: 'InstanceContent',
    columns: [
      'ID',
      'Name_en',
      'Name_de',
      'Name_fr',
      'Name_ja',
      'InstanceContentType.ID',
      'ContentFinderCondition.InstanceContent'
    ],
  },
  list: true,
  format: (data) => {
    const filtered = data.filter(item => {
      if (item['InstanceContentType.ID'] === 2 || item['InstanceContentType.ID'] === 4 || item['InstanceContentType.ID'] === 1) {
        return item
      }

      return
    })

    const response = filtered.map(item => {
      return {
        id: item.ID,
        name: {
          en: item.Name_en,
          de: item.Name_de,
          fr: item.Name_fr,
          jp: item.Name_ja,
        },
        type: item['InstanceContentType.ID'],
      }
    })

    return response
  },
})
