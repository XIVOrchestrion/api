const fs = require('fs')
const { destLibra, destLibraMusic } = require ('../_consts')
const recursiveFetch = require('../helpers/recursiveFetch')


module.exports = async function() {
  await getConnections()
    .then(data => compareNpcs(data))
    .then(res => fetchData(res))
}


/**
 * Read all Orchestrion Files and fetch Connection data
 *
 * @returns {Array}
 */
async function getConnections() {
  let connections = []
  const links = {}

  fs.readdirSync(destLibraMusic, 'utf-8').forEach(file => {
    const dest = `${destLibraMusic}/${file}`
    const data = JSON.parse( fs.readFileSync(dest, 'utf-8') )

    if (!data.GameContentLinks.GilShopItem && !data.GameContentLinks.SpecialShop)
      return

    Object.keys(data.GameContentLinks).forEach(key => {

      if (data.GameContentLinks[key].length === 0)
        return

      Object.values(data.GameContentLinks[key]).forEach(array => {

        array.forEach(item => {
          if (item % 1 != 0)
            item = Math.floor(item.toString().split('.')[0])


          links[item] ? links[item].song.push(data.ID) : links[item] = { song: [data.ID], npc: '' }
          connections.push(item)
        })
      })
    })
  })

  const res = [...new Set(connections)].sort()

  return [res, links]
}



/**
 * Compare NPC Data against list of linked songs
 *
 * @param {Array} data - Connection data from songs
 * @returns {Array}
 */
function compareNpcs(data) {

  const npcList = []
  const dest = `${destLibra}/npcResidents.json`
  const fileData = JSON.parse( fs.readFileSync(dest, 'utf-8') )
  const dataKeys = data[0]
  const linksMap = data[1]
  const npcKeys = Object.keys(fileData).map((npc, i) => Math.floor(npc))

  npcKeys.forEach(npc => {

    dataKeys.forEach(item => {
      if (!fileData[npc].values.includes(item))
        return

      linksMap[item].npc = npc

      !npcList.includes(npc) ? npcList.push(npc) : null
    })
  })

  writeMap(linksMap)

  return npcList
}


/**
 * Write out the data map
 *
 * @param {Object} data
 */
function writeMap(data) {
  const dest = `${destLibra}/npcMap.json`

  if (fs.existsSync(dest)) {
    const existingData = fs.readFileSync(dest, 'utf-8')

    if (existingData === JSON.stringify(data))
      return console.log(`${dest} unchanged.`)

    fs.writeFileSync(dest, JSON.stringify(data), 'utf-8')
    return console.log(`${dest} updated.`)
  }

  fs.writeFileSync(`${destLibra}/npcMap.json`, JSON.stringify(data), 'utf-8')
  return console.log(`${dest} created.`)
}


/**
 * Recursively fetch NPC data for library
 *
 * @param {Array} data - NPC IDs to fetch
 */
function fetchData(data) {

  recursiveFetch(data, 'NPC', (entry, all) => {
    return {
      dest: './library/npcs',
      fileName: entry,
      file: {
        url: `ENpcResident/${entry}`,
      },
      format: (data, args) => data,
    }
  })
}
