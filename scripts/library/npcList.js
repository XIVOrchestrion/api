const fs = require('fs')
const { destLibra, destLibraMusic } = require ('../_consts')
const recursiveFetch = require('../helpers/recursiveFetch')


async function func() {
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
  const connections = []
  const links = {}

  fs.readdirSync(destLibraMusic, 'utf8').forEach(file => {
    const dest = `${destLibraMusic}/${file}`
    const data = JSON.parse( fs.readFileSync(dest, 'utf8') )
    if (!data.connections)
      return

    links[data.ID] = {}

    Object.keys(data.connections).forEach(key => {

      const linkArray = []
      Object.values(data.connections[key]).forEach(item => {
        linkArray.push({ type: key, value: item })

        if (key === 'GilShopItem')
          item = Math.floor(item.toString().split('.')[0])

        if (connections.includes(item))
          return

        connections.push(item)
      })

      links[data.ID] = { methods: linkArray }
    })
  })

  console.log(links)

  return connections
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
  const fileData = JSON.parse( fs.readFileSync(dest, 'utf8') )

  Object.keys(fileData).forEach((npc, i) => {
    npc = Math.floor(npc)
    const shopVals = Array.isArray(fileData[npc].shopVals) ? fileData[npc].shopVals : [fileData[npc].shopVals]
    data.forEach(item => {
      if (npcList.includes(npc))
        return

      shopVals.includes(item) ? npcList.push(npc) : null
    })
  })

  fs.writeFileSync(`${destLibra}/npcList.json`, npcList, 'utf8')

  return npcList
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


module.exports = func()
