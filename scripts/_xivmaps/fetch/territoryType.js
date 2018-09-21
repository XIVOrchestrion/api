const fetchApi = require('../../_helpers/fetchApi')
const { destLibra } = require ('../../../_consts')


module.exports = new fetchApi (
  'Territory',
  {
    fileName: 'territoryType',
    fileDest: destLibra,
    fileList: true,
    apiPath: 'TerritoryType',
    apiColumns: [
      'ID',
      'GameContentLinks',
      'Map',
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
