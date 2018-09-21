const { destLibra } = require ('../../_consts')
const fetchApi = require('../_helpers/fetchApi')
const populateName = require('../_helpers/populateName')


module.exports = new fetchApi (
  'Currency',
  {
    fileName: 'currencies',
    fileDest: destLibra,
    fileList: true,
    apiPath: 'Currency',
    apiColumns: [
      'ID',
      'Item.Name_en',
      'Item.Name_de',
      'Item.Name_fr',
      'Item.Name_ja',
      'Item.Plural_en',
      'Item.Plural_de',
      'Item.Plural_fr',
      'Item.Plural_ja',
    ],
    formatData: (data) => {
      return data.map(item => {
        return {
          id: item.ID,
          name: populateName(item['Item.Name_en'], item['Item.Name_de'], item['Item.Name_fr'], item['Item.Name_ja']),
          plural: populateName(item['Item.Plural_en'], item['Item.Plural_de'], item['Item.Plural_fr'], item['Item.Plural_ja']),
        }
      })
    },
  }
)
