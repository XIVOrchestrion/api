const fs = require('fs')
const { destLibra, destLibraCurrents, destLibraLevels } = require ('../_consts')
const populateName = require('../_helpers/populateName')


module.exports = async function () {
  // Go through Aether Current Data
  // Find matching Level data
  // Build necessary data source

  // Get all Current IDs
  const currentObjs = JSON.parse(fs.readFileSync(`${destLibra}/aetherCurrents.json`, 'utf8'))
  const fileNames = fs.readdirSync(destLibraCurrents)

  const res = currentObjs.map(file => {
    const current = JSON.parse(fs.readFileSync(`${destLibraCurrents}/${file.current}.json`, 'utf8'))
    const level = JSON.parse(fs.readFileSync(`${destLibraLevels}/${file.level}.json`, 'utf8'))

    if (current.Quest === 0) {
      return aetherMap(current, level)
    } else {
      return aetherQuest(current, level)
    }

    return
  })

  const results = {}
  res.forEach(item => {
    const currentGroups = {
      1: 211,
      2: 212,
      3: 213,
      4: 214,
      5: 215,
      6: 216,
      7: 367,
      8: 368,
      9: 369,
      10: 371,
      11: 354,
      12: 372,
    }
    const group = item.currentGroup
    const mapId = currentGroups[group]

    if (!results[mapId])
      results[mapId] = []

    results[mapId].push(item)
  })


  fs.writeFileSync('./docs/aetherCurrents.json', JSON.stringify(results), 'utf8')
}


/**
 * Handle non-Quest related Aether Currents
 *
 *
 */
function aetherMap(data, level) {
  const X = toMapCoord(level.Map.SizeFactor, level.X, level.Map.OffsetX)
  const Y = toMapCoord(level.Map.SizeFactor, level.Z, level.Map.OffsetY)

  const currentKey = Object.keys(data.GameContentLinks.AetherCurrentCompFlgSet)
  const res = {
    id:     data.ID,
    type:   1,
    order:  currentKey[0].replace('AetherCurrent', '') - 5,
    currentGroup: data.GameContentLinks.AetherCurrentCompFlgSet[currentKey][0],
    map: {
      id: level.Map.PlaceName.ID,
      mapId: level.Map.ID,
      regionId: level.Map.PlaceNameRegion.ID,
      name: populateName(level.Map.PlaceName.Name_en, level.Map.PlaceName.Name_de, level.Map.PlaceName.Name_fr, level.Map.PlaceName.Name_ja),
      region: populateName(level.Map.PlaceNameRegion.Name_en, level.Map.PlaceNameRegion.Name_de, level.Map.PlaceNameRegion.Name_fr, level.Map.PlaceNameRegion.Name_ja),
      sizeFactor: level.Map.SizeFactor,
    },
    location: {
      x: X,
      y: Y,
      mapPos: posOnMap(level.Map.SizeFactor, X, Y),
    }
  }

  // console.log(res)
  return res
}


/**
 * Handle Quest related Aether Currents
 *
 *
 */
function aetherQuest(data, level) {

  // NEED TO GET NPC DATA, AND THROUGH THAT GET THE CORRESPONDING LEVEL DATA TO MAP CORRECTLY
  const X = toMapCoord(level.Map.SizeFactor, level.X, level.Map.OffsetX)
  const Y = toMapCoord(level.Map.SizeFactor, level.Z, level.Map.OffsetY)

  const currentKey = Object.keys(data.GameContentLinks.AetherCurrentCompFlgSet)
  const res = {
    id: data.ID,
    type: 2,
    order: currentKey[0].replace('AetherCurrent', ''),
    currentGroup: data.GameContentLinks.AetherCurrentCompFlgSet[currentKey][0],
    quest: {
      name: populateName(data.Quest.Name_en, data.Quest.Name_de, data.Quest.Name_fr, data.Quest.Name_ja),
      issuer: populateName(data.Quest.ENpcResidentStart.Name_en, data.Quest.ENpcResidentStart.Name_de, data.Quest.ENpcResidentStart.Name_fr, data.Quest.ENpcResidentStart.Name_ja),
      level: data.Quest.ClassJobLevel0,
      type: data.Quest.EventIconType.ID,
    },
    requires: {
      name: populateName(data.Quest.PreviousQuest0.Name_en, data.Quest.PreviousQuest0.Name_de, data.Quest.PreviousQuest0.Name_fr, data.Quest.PreviousQuest0.Name_ja),
      level: data.Quest.PreviousQuest0.ClassJobLevel0,
      type: data.Quest.PreviousQuest0.EventIconType,
    },
    map: {
      id: level.Map.PlaceName.ID,
      mapId: level.Map.ID,
      regionId: level.Map.PlaceNameRegion.ID,
      name: populateName(level.Map.PlaceName.Name_en, level.Map.PlaceName.Name_de, level.Map.PlaceName.Name_fr, level.Map.PlaceName.Name_ja),
      region: populateName(level.Map.PlaceNameRegion.Name_en, level.Map.PlaceNameRegion.Name_de, level.Map.PlaceNameRegion.Name_fr, level.Map.PlaceNameRegion.Name_ja),
      sizeFactor: level.Map.SizeFactor,
    },
    location: {
      x: X,
      y: Y,
      mapPos: posOnMap(level.Map.SizeFactor, X, Y),
    }
  }

  return res
}


/**
 *
 */
function toMapCoord(sizeFactor, value, offset) {
  const scale = sizeFactor / 100.0
  const offsetVal = ((value + offset) * scale)
  return Math.round(((41.0 / scale) * ((offsetVal + 1024.0) / 2048.0)) * 10) / 10 + 1
}


/**
 *
 */
function posOnMap(sizeFactor, x, y) {
  const pixelsPerGrid = 50
  const scale = sizeFactor / 100

  const offset = 1

  x = Math.round(((x - offset) * 50 * scale) * 10) / 10
  y = Math.round(((y - offset) * 50 * scale) * 10) / 10

  return { x, y }
}
