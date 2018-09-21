const fs = require('fs')
const fetchApi = require('../../_helpers/fetchApi')
const { destLibra } = require ('../../../_consts')


module.exports = new fetchApi (
  'Aetheryte',
  {
    fileName: 'territoryType',
    fileDest: destLibra,
    fileList: true,
    apiPath: 'Aetheryte',
    apiColumns: [
      'ID',
      'IsAetheryte',
      'AethernetName',
      'PlaceName',
      'PlaceNameRegion',
      'PlaceNameZone',
      'Aetheryte',
    ],
    formatData: (data) => {
      return data.filter(entry => typeof entry.Map === 'object')
    },
  }
)
