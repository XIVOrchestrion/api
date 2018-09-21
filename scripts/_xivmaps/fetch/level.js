const fs = require('fs')
const fetchApi = require('../../_helpers/fetchApi')
const recursiveFetch = require('../../_helpers/recursiveFetch')
const { destLibra, libraMapsLevels } = require ('../../../_consts')

//
// const levels = new fetchApi (
//   'Aetheryte',
//   {
//     fileName: 'territoryType',
//     fileDest: destLibra,
//     fileList: true,
//     apiPath: 'Aetheryte',
//     apiColumns: [
//       'ID',
//       'IsAetheryte',
//       'AethernetName',
//       'PlaceName',
//       'PlaceNameRegion',
//       'PlaceNameZone',
//       'Aetheryte',
//     ],
//     formatData: (data) => {
//       return data.filter(entry => typeof entry.Map === 'object')
//     },
//   }
// )


module.exports = (resolve) => {
  // objKeys = ids.slice(0)
  const dataImport = JSON.parse(fs.readFileSync(`${destLibra}/territoryType.json`, 'utf8'))
  const data = dataImport[0].GameContentLinks.Level.Territory

  recursiveFetch(data, 'Level', (entry, all) => {
    return {
      fileName: entry,
      fileDest: libraMapsLevels,
      fileList: false,
      apiPath: `Level/${entry}`,
      recursive: true,
    }
  }, resolve)
}
