const fs = require('fs')
const { destLibra, destLibraCurrents, destLibraLevels } = require ('../../_consts')
const mapData = require('../_helpers/mapData')


// module.exports = new mapData (
//   `${destLibra}/aetherCurrentObjs.json`,
//   destLibraLevels,
//   {
//     mapTarget: 'ID',
//     keySource: 'ObjectKey',
//     dataSet: [
//       {
//         fileName: true,
//         newKey: 'Level',
//       }
//     ]
//   }
// )

module.exports = function () {
  const eObj = JSON.parse(fs.readFileSync(`${destLibra}/aetherCurrentObjs.json`, 'utf8'))
  const currentsFileNames = fs.readdirSync(destLibraCurrents)
  const currentsFileIds = currentsFileNames.map(file => parseInt(file.replace('.json', '')))
  const levelsFileNames = fs.readdirSync(destLibraLevels)
  const levelsFileIds = levelsFileNames.map(file => parseInt(file.replace('.json', '')))
  const levelsFile = levelsFileNames.map(item => {
    return JSON.parse(fs.readFileSync(`${destLibraLevels}/${item}`, 'utf8'))
  })

  const eObjKeys = Object.entries(eObj)
  const res = []
  eObjKeys.forEach(obj => {
    const objCurrentKey = obj[1].Data
    const levelObjectKey = obj[1].ID

    // console.log(levelObjectKey)

    let levelKey
    levelsFile.forEach(level => {
      // console.log(level.ID)
      if (level.ObjectKey === levelObjectKey)
        levelKey = level.ID

      return
    })

    currentsFileIds.splice(currentsFileIds.indexOf(objCurrentKey), 1)

    res.push({
      current: objCurrentKey,
      level: levelKey,
    })
  })

  currentsFileIds.forEach(item => {
    const data = JSON.parse(fs.readFileSync(`${destLibraCurrents}/${item}.json`, 'utf8'))
    const npcId = data.Quest.ENpcResidentStart.ID
    // console.log(npcId)
    let levelKey
    levelsFile.forEach(level => {
      if (level.ObjectKey === npcId)
        levelKey = level.ID

      return
    })

    // currentsFileIds.splice(currentsFileIds.indexOf(item), 1)

    res.push({
      current: item,
      level: levelKey,
    })
  })

  // console.log(currentsFileIds.length)

  fs.writeFileSync(`${destLibra}/aetherCurrents.json`, JSON.stringify(res), 'utf8')

  // const buildMap = () => {
  //
  //   const mappedData = JSON.parse(fs.readFileSync(this.target, 'utf8'))
  //   const mapKeys = Object.entries(mappedData)
  //   const sourceFiles = fs.readdirSync(this.dataSource)
  //
  //   sourceFiles.forEach(entry => {
  //     const fileName = parseInt(entry.replace('.json', ''))
  //     const data = JSON.parse(fs.readFileSync(`${this.dataSource}/${entry}`, 'utf8'))
  //
  //     let objKey
  //     mapKeys.forEach(obj => {
  //       const mapTarget = obj[1][this.mapTarget]
  //       if (mapTarget === data[this.keySource])
  //         objKey = obj[0]
  //
  //       return
  //     })
  //
  //     this.dataSet.forEach(key => {
  //       mappedData[objKey][key.newKey] = key.fileName ? fileName : data[key.original]
  //     })
  //   })
  //
  //   fs.writeFileSync('aetherCurrents.json', JSON.stringify(mappedData), 'utf8')
  // }
}
