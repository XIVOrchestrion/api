const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


let name = 'Shop'
let plural = 'Shops'


module.exports = new libraryFile (name, plural, {
  file: {
    name: 'Special Shops',
    url: 'SpecialShop',
    columns: ['ID', 'Name_en', 'Name_de', 'Name_fr', 'Name_ja'],
  },
  files: [
    {
      name: 'Special Shops',
      url: 'SpecialShop',
      columns: ['ID', 'Name_en', 'Name_de', 'Name_fr', 'Name_ja'],
    },
    {
      name: 'Gil Shops',
      url: 'GilShop',
      columns: ['ID', 'Name_en', 'Name_de', 'Name_fr', 'Name_ja'],
    },
  ]
})
