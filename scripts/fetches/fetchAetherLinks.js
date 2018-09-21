const fs = require('fs')
const { destLibra, destLibraCurrents } = require ('../../_consts')
const fetchApi = require('../_helpers/fetchApi')
const recursiveFetch = require('../_helpers/recursiveFetch')

let aetherIds
let npcIds
const eObj = new fetchApi (
  'AetherEObj',
  {
    fileName: 'aetherCurrentObjs',
    fileDest: destLibra,
    fileList: false,
    apiPath: 'EObj',
    apiColumns: [
      'ID',
      'Data'
    ],
    formatData: (data) => {
      const filtered = data.filter(item => {
        if (aetherIds.includes(item.Data))
          return item
      })
      return filtered
    },
  }, (data, spinner, args, resolve) => {
    spinner.succeed(`Preprocessing for Aether Objects complete.`)
    const result = data.map(item => item.ID)
    const res = result.concat(npcIds)

    resolve( res )
  }
)


const getFileData = async () => {
  const fileNames = fs.readdirSync(destLibraCurrents)
  npcIds = fileNames.filter(file => {
    const fileData = JSON.parse(fs.readFileSync(`${destLibraCurrents}/${file}`, 'utf8'))
    if (typeof fileData.Quest !== 'object')
      return false

    return true
  }).map(file => {
    const fileData = JSON.parse(fs.readFileSync(`${destLibraCurrents}/${file}`, 'utf8'))
    return fileData.Quest.ENpcResidentStart.ID
  })
}


module.exports = async (ids, resolve) => {
  aetherIds = ids.slice(0)
  await getFileData()
    .then(() => eObj.fetch(resolve))
}
