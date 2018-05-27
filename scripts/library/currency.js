const LIBRARY = require('../helpers/library')


let name = 'Currency'
let plural = 'Currencies'


module.exports = new LIBRARY (name, plural, {
  files: [
    {
      name: 'Currency',
      url: 'Currency',
      columns: ['Item.ID', 'Item.Name_en', 'Item.Name_de', 'Item.Name_fr', 'Item.Name_ja', 'Item.Icon'],
    },
    {
      name: 'Tomestone Items',
      url: 'TomestonesItem',
      columns: ['Item.ID', 'Item.Name_en', 'Item.Name_de', 'Item.Name_fr', 'Item.Name_ja', 'Item.Icon']
    }
  ]
})
