const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Gil Shops', 'Gil Shops', {
  dest: destLibra,
  fileName: 'gilShop',
  file: {
    url: 'GilShop',
    columns: ['ID'],
  },
  list: true,
  format: (data) => {
    const response = data.map(item => item.ID)
    return response
  },
})
