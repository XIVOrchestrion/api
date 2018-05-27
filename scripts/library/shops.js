const LIBRARY = require('../helpers/library')


let name = 'Shop'
let plural = 'Shops'


module.exports = new LIBRARY (name, plural, {
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
