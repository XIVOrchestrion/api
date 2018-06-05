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

    this.dest = `${config.dest ? config.dest + '/' : ''}`
    this.filePath = `${this.dest}${config.fileName}.json`
    this.file = config.file
    this.fileName = config.fileName
    this.format = config.format
    this.list = config.list

    this.callback = callback
    this.useCallback = config.useCallback

    this.errors = 0
    this.toProcess = 0
  }


  async fetch(resolve, reject) {
    this.args = arguments
    this.resolve = resolve
    this.reject = reject

    let apiColumns = this.file.columns ? `&columns=${this.file.columns.join(',')}` : ''
    let apiPath = `https://api.xivdb-staging.com/${this.file.url}`

    if (!this.list)
      return callApi.call(this, apiPath, apiColumns, processData.bind(this))

    recursiveCallApi.call(this, apiPath, apiColumns)
      .then(data => processData.call(this, data))
  }
}




/**
 * Fetch a single item from XIVDB Api
 *
 * @param {string} api - API URL to fetch from
 * @param {string} columns - Columns to narrow down fetched data
 * @param {function} callback - Function to execute after fetch completes
 */
function callApi(api, columns, callback) {
  const apiPath = `${api}?${columns}`
  const config = {
    method: 'GET',
    mode: 'cors',
  }

  fetch(apiPath, config)
    .then(response => response.json())
    .then(callback)
    .catch(e => {
      if(this.errors === 10)
        throw new Error(`XIVDB API Error: ${e}`)

      ++this.errors
      console.info(`API retry attempt ${this.errors}`)
      callApi.call( this, api, columns, callback )
    })
}




/**
 * Fetch data recursively from XIVDB API.
 *
 * @param {string} api - API URL to fetch from
 * @param {string} columns - Columns to narrow down fetched data
 * @param {Array} result - Data results from API
 * @param {Number} page - Page to start call from
 */
async function recursiveCallApi(api, columns, result = [], page = 1) {
  const apiKey = await fs.readFileSync('./xivdb-api-key.txt', 'utf-8')

  if (!apiKey)
    throw new Error('XIVDB API Key is required.')

  const apiPage = page > 1 ? `&page=${page}` : ''
  const apiPath = `${api}?key=${apiKey}${columns}${apiPage}`
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
      recursiveCallApi.call( this, api, columns, result, page )
    })

  result = [...result, ...data.results]

  if (data.pagination.page_next)
    return recursiveCallApi.call( this, api, columns, result, data.pagination.page_next )

  return result
}




/**
 * Handling fetched data
 *
 * @param {Array} data - Data fetched from recursiveCallApi()
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

          // Handle reject is data is unchanged
          if (fileData === JSON.stringify(data) && this.reject)
            return this.reject('Library is up-to-date.')

          // Handle callbacks or resolve if data is unchanged
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

    this.resolve()
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

    return this.callback(data, this.args, this.resolve)
  }

  if (logMessage)
    console.log(logMessage)

  if (this.resolve)
    return this.resolve()

  throw new Error("Resolve should not have been called.")
}
