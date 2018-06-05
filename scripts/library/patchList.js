const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Patch List', 'Patches', {
  dest: destLibra,
  fileName: 'patches',
  file: {
    url: 'PatchList',
  },
  checkLibVer: true,
  format: (data) => data,
})
