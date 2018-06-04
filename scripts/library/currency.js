const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('gilShop', 'gil', {
  dest: 'library',
  fileName: 'currency',
  file: {
    name: 'Currency',
    url: 'Currency',
    columns: ['Item.ID', 'Item.Name_en', 'Item.Name_de', 'Item.Name_fr', 'Item.Name_ja', 'Item.Icon'],
  },
  format: (data) => {

  },
})
