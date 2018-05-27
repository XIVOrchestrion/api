const fetch = require('node-fetch')
const fs = require('fs')


/**
 * Create a library of terms from various data sources.
 *
 * @param {string} name
 * @param {string} plural
 * @param {Object} config
 * @param {Func} callback
 */
module.exports = class Library {

  constructor(name, plural, config, callback) {
    this.name = name
    this.plural = plural

    this.dest = `./docs/${config.dest ? config.dest + '/' : ''}`
    this.filePath = `${this.dest}${config.fileName}.json`
    this.files = config.files
    this.useCallback = config.useCallback
    this.checkLibVer = config.checkLibVer

    this.callback = callback
  }


  async fetch() {
    this.args = arguments

    const libraryFiles = this.files.map(file => {
      return new Promise((resolve, reject) => {
        this.resolve = resolve

        let apiColumns = file.columns ? `?columns=${file.columns.join(',')}` : ''
        let apiPath = `https://api.xivdb-staging.com/${file.url}${apiColumns}`

        callApi( apiPath, processData.bind(this) )
      })
    })

    return await Promise.all(libraryFiles)
      .then(data => data)
  }


  async print() {
    await this.fetch()
      .then(res => res)
  }
}


/**
 * @param {string} apiPath - API URL to fetch from
 * @param {processData} cb - Callback to handle response
 */
function callApi(apiPath, cb) {
  const config = {
    method: 'GET',
    mode:   'cors',
  }

  fetch(apiPath, config)
    .then(res => res.json())
    .then(cb)
    .catch(e => {
      throw new Error(e)
    })
}




/**
 * @callback processData
 * @param {Array} data
 */
function processData(data) {

  if (this.checkLibVer)
    checkUpdates(this.dest, this.filePath, data, this.resolve)
}




/**
 * Compare new data against existing to decide whether should update.
 *
 * @param {string} dest
 * @param {string} filePath
 * @param {Array} data
 * @param {function} resolve
 */
function checkUpdates(dest, filePath, data, resolve) {

  if (!fs.existsSync(dest))
    fs.mkdirSync(dest)

  fs.exists(filePath, (exists) => {

    if (!exists)
      return createJSON(filePath, data, true)

    fs.readFile(filePath, 'utf8', (e, fileData) => {
      if (!JSON.stringify(data) === fileData)
        return createJSON(filePath, data)

      console.log('Data unchanged. Skipping Library update.')
      return resolve(false)
    })
  })
}




/**
 * Write data to JSON file
 *
 * @param {string} filePath
 * @param {Array} data
 * @param {bool} isNew
 */
function createJSON(filePath, data, isNew) {
  console.log(filePath)
  fs.writeFile(`${filePath}`, JSON.stringify(data), 'utf8', () => {
    console.log(`Wrote new file to ${filePath}`)
  })
}




function checkPages(apiPath) {
  return apiPath
  // fetch(apiPath)
  //   .then()
}
