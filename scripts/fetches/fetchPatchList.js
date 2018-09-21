const { destLibra, destLibraTracks } = require ('../../_consts')
const fetchApi = require('../_helpers/fetchApi')
const populateName = require('../_helpers/populateName')


module.exports = new fetchApi (
  'Patch List',
  {
    fileName: 'patchList',
    fileDest: destLibra,
    fileList: true,
    apiPath: 'PatchList',
  }
)
