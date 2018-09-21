const fetch = require('node-fetch')
const fs = require('fs')
const Ora = require('ora')


module.exports = class MapData {
  constructor(target, dataSource, config) {
    this.target       = target
    this.dataSource   = dataSource

    this.mapTarget    = config.mapTarget
    this.keySource    = config.keySource
    this.dataSet      = config.dataSet
  }

  buildMap () {

    const mappedData = JSON.parse(fs.readFileSync(this.target, 'utf8'))
    const mapKeys = Object.entries(mappedData)
    const sourceFiles = fs.readdirSync(this.dataSource)

    sourceFiles.forEach(entry => {
      const fileName = parseInt(entry.replace('.json', ''))
      const data = JSON.parse(fs.readFileSync(`${this.dataSource}/${entry}`, 'utf8'))

      let objKey
      mapKeys.forEach(obj => {
        const mapTarget = obj[1][this.mapTarget]
        if (mapTarget === data[this.keySource])
          objKey = obj[0]

        return
      })

      this.dataSet.forEach(key => {
        mappedData[objKey][key.newKey] = key.fileName ? fileName : data[key.original]
      })
    })

    fs.writeFileSync('aetherCurrents.json', JSON.stringify(mappedData), 'utf8')
  }
}
