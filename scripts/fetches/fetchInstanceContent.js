const { destLibra, destLibraTracks } = require ('../../_consts')
const fetchApi = require('../_helpers/fetchApi')
const populateName = require('../_helpers/populateName')


module.exports = new fetchApi (
  'Instance',
  {
    fileName: 'instances',
    fileDest: destLibra,
    fileList: true,
    apiPath: 'InstanceContent',
    apiColumns: [
      'ID',
      'Name_en',
      'Name_de',
      'Name_fr',
      'Name_ja',
      'InstanceContentType.ID',
      'ContentFinderCondition.ClassJobLevelRequired'
    ],
    formatData: (data) => {
      return data.map(item => {
        return {
          id:         item.ID,
          name:       populateName(item.Name_en, item.Name_de, item.Name_fr, item.Name_ja),
          type:       item['InstanceContentType.ID'],
          jobLevel:   item['ContentFinderCondition.ClassJobLevelRequired'],
        }
      })
    },
  }
)
