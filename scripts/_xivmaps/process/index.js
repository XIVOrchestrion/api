const fs = require('fs')
const request = require('request')
const { apiPath, destLibra, pathMaps } = require ('../../../_consts')
const populateName = require('../../_helpers/populateName')


module.exports = async function () {
  const territories = JSON.parse(fs.readFileSync(`${destLibra}/territoryType.json`, 'utf8'))

  // For now we're only working with Territory 1/Limsa Lominsa Lower Decks
  const d = territories[0]
  // console.log(d.GameContentLinks.Aetheryte.Territory)
  // getImageAsset(d.Map.MapFilename, d.Map.PlaceName.Name, pathMaps)

  const points = d.GameContentLinks.Level.Territory.map(item => mapPoint(item))

  fs.writeFileSync('./docs/xivmaps/limsalominsa.json', JSON.stringify(points), 'utf8')
}


/**
 * @param {string} id - Level data to use
 */
const mapPoint = (id ) => {
  const d = JSON.parse(fs.readFileSync(`${destLibra}/xivmaps/levels/${id}.json`, 'utf8'))
  const posX = toMapCoord(d.Map.SizeFactor, d.X, d.Map.OffsetX)
  const posY = toMapCoord(d.Map.SizeFactor, d.Z, d.Map.OffsetY)
  return {
    id: d.ID,
    objectKey: d.ObjectKey,
    x: posX,
    y: posY,
    point: posOnMap(d.Map.SizeFactor, posX, posY),
  }
}


/**
 * @param {string} url - URL to the image asset
 * @param {string} fileName - Unminified file name to save as
 * @param {string} savePath - Destination folder
 *
 * @returns - Saves file to the destination folder
 */
const getImageAsset = (url, fileName, savePath) => {
  const extension = url.slice(-4)
  fileName = fileName.replace(/ /gi, '').toLowerCase()
  url = `${apiPath}${url}`
  savePath = `${savePath}/maps/${fileName}${extension}`

  return request.get(url).pipe(fs.createWriteStream(savePath))
}


/**
 *
 */
const toMapCoord = (sizeFactor, value, offset) => {
  const scale = sizeFactor / 100.0
  const offsetVal = ((value + offset) * scale)
  return Math.round(((41.0 / scale) * ((offsetVal + 1024.0) / 2048.0)) * 10) / 10 + 1
}


/**
 *
 */
const posOnMap = (sizeFactor, x, y) => {
  const pixelsPerGrid = 50
  const scale = sizeFactor / 100

  const offset = 1

  x = Math.round(((x - offset) * 50 * scale) * 100) / 100
  y = Math.round(((y - offset) * 50 * scale) * 100) / 100

  return { x, y }
}
