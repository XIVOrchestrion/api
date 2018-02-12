const fetch = require('node-fetch')
const fs    = require('fs')
const Papa  = require('papaparse')


module.exports = class CsvHelper {
  constructor(name, plural, config, callback) {
    this.dest        = config.dest
    this.files       = config.files
    this.format      = config.format
    this.useCallback = config.useCallback

    this.name     = name
    this.plural   = plural
    this.callback = callback
  }

  fetch() {
    this.args = arguments

    const csvFiles = this.files.map(file => {
      return new Promise(resolve => {
        this.resolve  = resolve
        const apiPath = `https://raw.githubusercontent.com/viion/ffxiv-datamining/master/csv/${file.url}.csv`

        callApi(apiPath)
          .then(data => parseCSV(data, file))
          .then(res => resolve(res.data))
      })
    })

    return Promise.all(csvFiles)
      .then(data => formatData.call(this, data))
      .then(res => process.call(this, res))
  }
}


function callApi(apiPath) {
  return fetch(apiPath)
    .then(res => res.text())
    .catch(e => {
      throw new Error(e)
    })
}


function parseCSV(data, file) {
  if (data && typeof data === 'object' && data.error)
    return console.error(data.error)

  const config = {
    beforeFirstChunk: chunk => {
      let rows = chunk.split( /\r\n|\r|\n/ )
      rows.splice(0, 1)

      if (file.headers) {
        const headings = rows[0].split(',')
        file.headers.forEach((header, key) => {
          headings[key] = header
        })
        rows[0] = headings.join()
      }

      return rows.join( '\n' )
    },
    dynamicTyping: true,
    header: true,
  }

  return Papa.parse(data, config)
}


function process(data) {
  if (data && typeof data === 'object' && data.error)
    return console.error(data.error)

  const fileName = this.dest
  const filePath = `../docs/${fileName}.json`
  let logMessage = `${fileName} @ ${filePath} `

  fs.exists(filePath, (exists) => {
    
    if (exists)
      return((data, fileName, logMessage) => {
        fs.readFile(filePath, 'utf8', (e, existing) => {
          // Do nothing if there are no changes
          if (data === existing) {
            return 
          }

          logMessage += 'updated.'
          createJSON.call(this, fileName, data, logMessage, false)
        })
      })(data, fileName, logMessage)

    logMessage += 'created.'
    createJSON.call(this, fileName, data, logMessage, true)
  })
}


function createJSON(fileName, data, logMessage, isNew) {
  fs.writeFile(`../docs/${fileName}.json`, JSON.stringify(data), 'utf8', () => {
    console.log(logMessage)

    if (isNew)
      this.created++
    else
      this.updated++

  })
}


function formatData(data) {
  if (this.formatted)
    return data

  if (!this.formatted && typeof this.format === 'function')
    data = this.format(data)

  this.formatted = true
  return data
}
