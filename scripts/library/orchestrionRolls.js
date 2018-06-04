const { destLibra, destLibraMusic } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')
const recursiveFetch = require('../helpers/recursiveFetch')


module.exports = new libraryFile ('Orchestrion Item References', 'Orchestrion Item References', {
  dest: destLibraMusic,
  fileName: 'orchestrionItems',
  file: {
    url: 'Item',
    columns: [
      'ID',
      'Name',
      'ItemAction.ID',
      'ItemAction.Type'
    ],
  },
  pagination: true,
  format: (data, args) => {
    const filtered = data.filter(entry => entry['ItemAction.Type'] === 5845)
    console.log(filtered)

    return filtered.map(item => {
      return {
        id: item.ID,
        name: item.Name.replace(' Orchestrion Roll', ''),
        itemAction: item['ItemAction.ID']
      }
    })
  },
  useCallback: true,
}, (data, args) => {
  const filtered = data.filter(entry => entry['ItemAction.Type'] === 5845)

  recursiveFetch(filtered, 'Orchestrion Roll', (entry, all) => {
    return {
      dest: 'library/orchestrion',
      fileName: entry.ID,
      file: {
        url: `Item/${entry.ID}`,
      },
      format: (data, args) => data,
    }
  })
})
