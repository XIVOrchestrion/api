const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Special Shops', 'Special Shops', {
  dest: destLibra,
  fileName: 'specialShop',
  file: {
    url: 'SpecialShop',
    columns: ['ID'],
  },
  list: true,
  format: (data) => {
    const response = data.map(item => item.ID)
    return response
  },
})
