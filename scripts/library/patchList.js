const fs = require('fs')
const LIBRARY = require('../helpers/library')


module.exports = new LIBRARY ('Patch List', 'Patches', {
  dest: 'library',
  fileName: 'patches',
  files: [
    {
      name: 'Patch List',
      url: 'patchlist'
    }
  ],
  checkLibVer: true
})
