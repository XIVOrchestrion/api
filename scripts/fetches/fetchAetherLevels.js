const { destLibraLevels } = require ('../../_consts')
const fetchApi = require('../_helpers/fetchApi')
const recursiveFetch = require('../_helpers/recursiveFetch')

let objKeys
const levels = new fetchApi (
  'Aether Level',
  {
    fileList: true,
    apiPath: 'Level',
    apiColumns: [
      'ID',
      'ObjectKey'
    ],
    formatData: (data) => {
      const filtered = data.filter(item => objKeys.includes(item.ObjectKey))
      return filtered.map(item => item.ID)
    },
    useCallback: true,
  }, (data, spinner, args, resolve) => {
    recursiveFetch(data, 'Level', (entry, all) => {
      return {
        fileName: entry,
        fileDest: destLibraLevels,
        fileList: false,
        apiPath: `Level/${entry}`,
        spinner: spinner,
        recursive: true,
      }
    }, resolve)
  }
)

module.exports = (ids, resolve) => {
  objKeys = ids.slice(0)
  levels.fetch(resolve)
}
