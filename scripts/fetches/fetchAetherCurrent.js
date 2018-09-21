const { destLibra, destLibraCurrents } = require ('../_consts')
const fetchApi = require('../_helpers/fetchApi')
const recursiveFetch = require('../_helpers/recursiveFetch')


module.exports = new fetchApi (
  'Aether Current',
  {
    fileName: 'aetherCurrents',
    fileList: false,
    apiPath: 'AetherCurrent',
    apiColumns: [
      'ID',
    ],
    formatData: (data) => {
      return data.map(item => item.ID)
    },
    useCallback: true,
  }, (data, spinner, args, resolve) => {
    recursiveFetch(data, 'Aether Current', (entry, all) => {
      return {
        fileName: entry,
        fileDest: destLibraCurrents,
        fileList: false,
        apiPath: `AetherCurrent/${entry}`,
        spinner: spinner,
        recursive: true,
      }
    }, resolve, true)
  }
)
