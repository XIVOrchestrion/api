const fs = require('fs')

const orchestrionUi = JSON.parse(fs.readFileSync('./library/orchestrionUi.json', 'utf8'))
const npcMap = JSON.parse(fs.readFileSync('./library/npcMap.json', 'utf8'))



module.exports = function (fileDir) {
  fs.readdir(fileDir, 'utf8', (err, files) => {
    files.forEach(file => {
      const filePath = `${fileDir}/${file}`
      buildFile(filePath)
    })
  })
}


/**
 * Create a full data Object for each song
 *
 * @param {string} path - File path to read from
 */
function buildFile (path) {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'))

  const response = {
    id: data.ID,
    name: songNameObject(data.Name_en, data.Name_ja),
    method: createMethods(data.GameContentLinks, data.Name_en),
    sorting: {
      category: songUiParams(data.ItemAction.Data0, 'category'),
      order: songUiParams(data.ItemAction.Data0, 'order'),
      patch: data.GamePatch.ID,
    }
  }

  // console.log( response )
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
  en = en.replace(' Orchestrion Roll', '')
  ja = ja.replace('オーケストリオン譜:', '')

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
const songUiParams = (key, value) => orchestrionUi[key][value]


const createMethods = (contentLinks, trackName) => {

  if (contentLinks.length <= 0)
    return

  const keys = Object.keys(contentLinks)

  // Fetch NPC Data to help create Method data
  const fetchNpcData = shopID => {
    const npc = npcMap[shopID].npc

    const npcResidentData = JSON.parse(fs.readFileSync(`./library/npcs/${npc}.json`, 'utf8'))
    const npcName = {
      en: npcResidentData.Name_en,
      de: npcResidentData.Name_de === npcResidentData.Name_en ? true : npcResidentData.Name_de,
      fr: npcResidentData.Name_fr === npcResidentData.Name_en ? true : npcResidentData.Name_fr,
      ja: npcResidentData.Name_ja === npcResidentData.Name_en ? true : npcResidentData.Name_ja
    }

    return npcName
  }

  keys.forEach(key => {
    if (key === 'GilShopItem') {
      contentLinks[key].Item.forEach(item => {
        const shopID = item.toString().split('.')[0]
        const shopItem = item.toString().split('.')[1]
        const npcData = fetchNpcData(shopID)
        const shopData = JSON.parse(fs.readFileSync(`./library/shops/${shopID}.json`, 'utf8'))

        console.log(shopID, shopItem, trackName)
        console.log(shopData.Items[shopItem])
      })


    }

    console.log(key, contentLinks[key])
  })
}
