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
    this.file = config.file
    this.fileName = config.fileName
    this.format = config.format
    this.pagination = config.pagination

    this.callback = callback
    this.useCallback = config.useCallback

    this.errors = 0
    this.toProcess = 0
  }


  async fetch() {
    this.args = arguments

    let apiColumns = this.file.columns ? `&columns=${this.file.columns.join(',')}` : ''
    let apiPath = `https://api.xivdb-staging.com/${this.file.url}`

    callApi.call(this, apiPath, apiColumns)
      .then(data => processData.call(this, data))
  }
}




/**
 * Fetch data recursively from XIVDB API.
 *
 * @param {string} api - API URL to fetch from
 * @param {string} columns - Columns to narrow down fetched data
 * @param {Array} result - Data results from API
 * @param {Number} page - Page to start call from
 */
async function callApi(api, columns, result = [], page = 1) {
  const apiPage = this.pagination && page > 1 ? `&page=${page}` : ''
  const apiPath = `${api}?pretty=1${columns}${apiPage}`
  const config = {
    method: 'GET',
    mode: 'cors',
  }

  const data = await fetch(apiPath, config)
    .then(response => response.json())
    .catch(e => {
      if(this.errors > 10)
        throw new Error(`XIVDB API Error: ${e}`)

      ++this.errors
      console.info(`API retry attempt ${this.errors}`)
      callApi(api, columns, result, page)
    })

  if (this.pagination && data.pagination) {
    console.log(`Fetched page ${page}/${data.pagination.page_total} from ${api}`)
    result = [...result, ...data.results]

    if (data.pagination.page_next)
      return callApi.call( this, api, columns, result, data.pagination.page_next)

    return result
  }

  return data
}




/**
 * Handling fetched data
 *
 * @param {Array} data - Data fetched from callApi()
 */
function processData(data) {

  if (data && typeof data === 'object' && data.error)
    return console.error(data.error)

  if (this.useCallback)
    return resolve.call(this, data)

  if (data instanceof Array) {
    this.toProcess = data.length;
    console.log(`Starting processing ${this.name}.`)
    console.log('\n')
    compareJSON.call(this, data)
  } else if (data && typeof data === 'object') {
    this.toProcess = 1
    this.useCallback = true
    compareJSON.call(this, data)
  }
}




/**
 * Format data according to the library spec
 *
 * @param {Array} data - Data fetched from callApi()
 */
function formatData(data) {
  if (this.formatted)
    return data

  if (!this.formatted && typeof this.format === 'function')
    data = this.format(data, this.args)

  this.formatted = true
  return data
}




/**
 * Compare fetched data to existing JSON data
 *
 * @param {Array} data - Data fetched from callApi()
 */
function compareJSON(data) {
  const fileName = this.fileName
  const filePath = this.filePath
  const fileDest = this.dest
  let logMessage = `${this.name} @ ${filePath} `

  fs.exists(filePath, (exists) => {
    data = formatData.call(this, data)

    if (exists)
      return ((data, fileName, logMessage) => {
        fs.readFile(filePath, 'utf8', (e, fileData) => {

          if (fileData === JSON.stringify(data))
            return resolve.call(this, data, logMessage += 'unchanged.')

          logMessage += 'updated.'

          createJSON.call(this, fileDest, filePath, data, logMessage)
        })
      })(data, fileName, logMessage)

    logMessage += 'created.'
    createJSON.call(this, fileDest, filePath, data, logMessage)
  })
}




/**
 * Write data to JSON file
 *
 * @param {string} dest
 * @param {string} filePath
 * @param {Array} data
 * @param {string} logMessage
 */
function createJSON(dest, filePath, data, logMessage) {

  if (!fs.existsSync(dest))
    fs.mkdirSync(dest)

  fs.writeFile(filePath, JSON.stringify(data), 'utf8', () => {
    console.log(logMessage)

    if (this.useCallback) {
      if (typeof this.callback !== 'function')
        throw new Error('Individual request should have callback.')

      return this.callback()
    }
  })
}




/**
 * Resolve data and handle Callbacks
 *
 * @param {Array} data - Formatted data fetched from callApi()
 * @param {string} logMessage - An update message to display progress
 */
function resolve(data, logMessage) {
  if (this.useCallback) {
    if (typeof this.callback !== 'function')
      throw new Error("useCallback detected with no callback.")

    if (logMessage)
      console.log(logMessage)

    return this.callback(data, this.args)
  }

  if (logMessage)
    return console.log(logMessage)

  throw new Error("Resolve should not have been called.")
}
