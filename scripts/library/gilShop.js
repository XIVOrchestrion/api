const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('gilShop', 'gil', {
  dest: 'library',
  fileName: 'gilShop',
  file: {
    name: 'Gil Shops',
    url: 'GilShop',
    columns: ['ID', 'Name_en', 'Name_de', 'Name_fr', 'Name_ja'],
  },
  format: (data) => {
    return {

    }
  },
})
