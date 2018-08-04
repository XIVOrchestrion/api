const fs = require('fs')
const buildMaps = require('./manualMaps')
const methodHelper = require('./methodHelper')

let songMaps
let manualMaps


module.exports = async function (fileDir) {
  // First figure out which songs are coming from
  // GilShops, SpecialShops, Quests...
  songMaps = await songMapping()


  // Then begin processing each song
  fs.readdir(fileDir, 'utf8', (err, files) => {
    files.forEach(file => {
      const filePath = `${fileDir}/${file}`
      buildFile(filePath)
    })
  })
}


/**
 * Read songMaps from the library and create a map to
 * the necessary content
 *
 * @returns {Object} - Mapped data with Song IDs as keys
 */
const songMapping = async () => {
  const songs = []
  const npcMap = JSON.parse(fs.readFileSync('./library/npcMap.json', 'utf8'))
  const questMap = JSON.parse(fs.readFileSync('./library/questMap.json', 'utf8'))

  const mapData = (data, type) => Object.entries(data).map(entry => {
    const key = entry[0]
    const val = entry[1]
    val.song.forEach(item => {
      const { song, ...noSong } = val
      type = type || entry.type
      songs.push({id: key, type: type, song: item, ...noSong})
    })
  })

  manualMaps = await buildMaps()
  mapData(npcMap, 'purchase')
  mapData(questMap, 'quest')
  mapData(manualMaps)


  // console.log(manualMaps)
  // console.log(songs)

  return songs
}


/**
 * Create a full data Object for each song
 *
 * @param {string} path - File path to read from
 */
function buildFile (path) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'))
  const orchestrionUi = JSON.parse(fs.readFileSync('./library/orchestrionUi.json', 'utf8'))
  const uiID = data.ItemAction.Data0

  const response = {
    id: orchestrionUi[uiID].id,
    itemId: data.ID,
    name: songNameObject(orchestrionUi[uiID].name.en, orchestrionUi[uiID].name.jp),
    method: createMethods(data, data.ID),
    sorting: {
      category: songUiParams(orchestrionUi, data.ItemAction.Data0, 'category'),
      order: songUiParams(orchestrionUi, data.ItemAction.Data0, 'order'),
      patch: data.GamePatch.ID,
    }
  }

  if (response.method.length < 1)
    console.log(response)

  return response
}


/**
 * Minify a song name
 *
 * @param {string} en - English Song name
 * @param {string} ja - Japanese Song name
 * @returns {Object} - Object containing all language variants
 */
const songNameObject = (en, ja) => {

  return {
    en: en,
    de: true,
    fr: true,
    ja: ja,
  }
}


/**
 * Fetch data from orchestrionUi
 *
 * @param {string} key - Key name to fetch data from
 * @param {string} value - Value to return from Object
 * @returns {Number} - Data value matching criteria
 */
const songUiParams = (source, key, value) => source[key][value]


const createMethods = (data, id) => {
  const songMethods = []
  songMaps.forEach(entry => {
    if (entry.song !== id)
      return

    songMethods.push(entry)
  })

  const res = songMethods.map(method => {
    return methodHelper[method.type](data, method)
  })

  // console.log(res)

  return res
}
