const { destLibra, destLibraTracks } = require ('../_consts')
const fetchApi = require('../_helpers/fetchApi')


module.exports = new fetchApi (
  'Orchestrion Roll',
  {
    fileName: 'orchestrionMap',
    fileDest: destLibra,
    fileList: true,
    apiPath: 'Orchestrion',
    apiColumns: [
      'ID',
      'Description',
      'GameContentLinks',
      'Name',
      'OrchestrionUiparam.ID',
      'OrchestrionUiparam.OrchestrionCategory.ID',
      'OrchestrionUiparam.Order',
    ],
    formatData: (data) => {
      return data.map(item => {
        return {
          id:         item.ID,
          name:       item.Name,
          info: {
            desc:     item.Description,
            uiId:     item['OrchestrionUiparam.ID'],
            uiCat:    item['OrchestrionUiparam.OrchestrionCategory.ID'],
            uiOrder:  item['OrchestrionUiparam.Order'],
          },
          links:      item.GameContentLinks,
        }
      })
    },
  }
)
