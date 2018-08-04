const fs = require('fs')
const { destLibra, destLibraMusic } = require ('../_consts')
const recursiveFetch = require('../helpers/recursiveFetch')
const writeMap = require('../helpers/writeMap')

let gilShops
let specialShops


module.exports = async function() {
  gilShops = JSON.parse(fs.readFileSync('./library/gilShop.json', 'utf8'))
  specialShops = JSON.parse(fs.readFileSync('./library/specialShop.json', 'utf8'))

  await getConnections()
    .then(data => compareNpcs(data))
    .then(res => fetchData(res, 'NPC', './library/npcs', 'ENpcResident'))
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

    // Filter out songs that are not obtained from Gil Shops, Special Shops
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
  const shopsToFetch = []
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

  // Check for empty NPC data in linksMap
  Object.keys(linksMap).forEach(item => {
    if (linksMap[item].npc)
      return

    let npc = npcOverride(item)
    if (npc === null)
      return

    linksMap[item].npc = npc

    // Ignore any NPC value that is less than 1000000
    // (the first ENpcResident), as a workaround for
    // Chachamun and any other potential Battle NPCs
    if (npc < 1000000)
      return

    !npcList.includes(npc) ? npcList.push(npc) : null
  })

  writeMap(linksMap, destLibra, 'npcMap')

  Object.keys(linksMap).forEach(key => shopsToFetch.push(Math.floor(key)))
  const gilShopsFetching = shopsToFetch.filter(id => gilShops.includes(id))
  const specialShopsFetching = shopsToFetch.filter(id => specialShops.includes(id))
  fetchData(gilShopsFetching, 'Gil Shop', './library/shops', 'GilShop')
  fetchData(specialShopsFetching, 'Special Shop', './library/shops', 'SpecialShop')

  return npcList
}


/**
 * Override empty NPC data to create links
 * ! Required for certain NPCs with unlinkable data through XIVDB
 *
 * @param {Object} linkMapItem - Data to match against and override
 */
function npcOverride(linkMapItem) {
  const dataLinks = {
    // 262406:  '/enemy/1245',
    262919:  1025763,
    1769577: 1012225,
    1769675: 1017338,
    1769786: 1019450,
    1769871: 1025848,
  }

  // Special handling for Chachamun
  if (linkMapItem === '262406') {
    fetchData([1245], 'NPC', './library/npcs', 'enemy')
    return 1245
  }

  if (dataLinks[linkMapItem])
    return dataLinks[linkMapItem]

  return null
}


/**
 * Recursively fetch NPC data for library
 *
 * @param {Array} data - NPC IDs to fetch
 * @param {string} name
 * @param {string} dest
 * @param {string} url
 */
function fetchData(data, name, dest, url) {

  recursiveFetch(data, name, (entry, all) => {
    return {
      dest: dest,
      fileName: entry,
      file: {
        url: `${url}/${entry}`,
      },
      format: (data, args) => data,
    }
  })
}
