const { destLibra, destLibraMusic } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')
const recursiveFetch = require('../helpers/recursiveFetch')


module.exports = new libraryFile ('Orchestrion Item References', 'Orchestrion Item References', {
  dest: destLibra,
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
  list: true,
  useCallback: true,
}, (data, args, resolve) => {
  const filtered = data.filter(entry => entry['ItemAction.Type'] === 5845)

  recursiveFetch(filtered, 'Orchestrion Roll', (entry, all) => {
    return {
      dest: destLibraMusic,
      fileName: entry.ID,
      file: {
        url: `Item/${entry.ID}`,
      },
      format: (data, args) => data,
    }
  }, resolve)
})
