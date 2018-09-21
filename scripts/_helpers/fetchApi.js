const fetch = require('node-fetch')
const fs = require('fs')
const Ora = require('ora')


/**
 * Create a library file for a data set
 *
 * @param {string} name
 * @param {string} plural
 * @param {Object} config
 * @param {Func} callback
 */

module.exports = class FetchApi {
  constructor (name, config, callback) {
    this.name         = name

    this.apiPath      = config.apiPath
    this.apiColumns   = config.apiColumns
    this.fileDest     = config.fileDest
    this.fileName     = config.fileName
    this.filePath     = `${this.fileDest}/${this.fileName}.json`
    this.fileList     = config.fileList
    this.formatData   = config.formatData

    this.callback     = callback
    this.useCallback  = config.useCallback
    this.recursive    = config.recursive

    this.created      = 0
    this.updated      = 0
    this.errors       = 0
    this.toProcess    = 0
    this.processed    = 0

    this.spinner      = config.spinner || new Ora({
      text: `Fetching ${this.name} data from xivapi`,
      // spinner: 'shark'
    })
    this.spinnerProcess = new Ora()
  }

  /**
   * Make a fetch request to xivapi
   */
  async fetch (resolve, reject) {
    this.args = arguments
    this.resolve = resolve
    this.reject = reject

    !this.spinner.isSpinning ? this.spinner.start() : this.spinner.text = `Fetching ${this.name} data from xivapi`

    const apiUrl = `https://xivapi.com/${this.apiPath}`
    const apiColumns = this.apiColumns ? `&columns=${this.apiColumns.join(',')}` : ''
    const apiKey = '8e70697a42734df5843a'

    if (!apiKey) {
      this.spinner.fail(`An error occured \n`)
      throw new Error('xivapi key is required')
    }

    const apiPath = `${apiUrl}?key=${apiKey}${apiColumns}`

    // if (!this.dataList)
    await callApi.call(this, apiPath)
      .then(response => process.call(this, response))
  }
}


/**
 * Make single or recursive calls to XIVAPI
 *
 * @param {string} apiPath - Formatted URL containing the apiKey and columns
 * @param {Array} result - Previously fetched pages if making a recursive call
 */
async function callApi (apiPath, result = []) {
  const config = {
    method: 'GET',
    mode: 'cors',
  }

  const data = await fetch (apiPath, config)
    .then(response => response.json())
    .catch(e => {
      if (this.errors === 10) {
        this.spinner.fail(`An error occured fetching ${this.name} data \n`)
        throw new Error (`An error has occured: ${e}`)
      }

      this.spinner.text = `Error processing ${this.name} api data. Retry attempt #${++this.errors}.`
      callApi.call(this, apiPath, result)
    })

  // If not a paginated results object, return the data
  if (!data.Results) {
    return data
  }

  // Combine previous pages' data with newest pull
  this.spinner.text = `Fetching ${this.name} data (${data.Pagination.Page}/${data.Pagination.PageTotal}) from xivapi`
  result = [...result, ...data.Results]

  // Handle next page if
  if (data.Pagination.PageNext !== 1) {
    apiPath = apiPath.includes('&page=')
            ? apiPath.replace(/(&page=[0-9]*)/g, `&page=${data.Pagination.PageNext}`)
            : `${apiPath}&page=${data.Pagination.PageNext}`

    return callApi.call(this, apiPath, result)
  }

  this.spinner.text = `${this.name} data scrapped from xivapi`
  return result
}


/**
 * Compare the data to previously cached files and prepare to write it out
 *
 * @param {(Array|Object)} data - Data fetched from xivapi
 */
function process (data) {
  // Handle errors within data
  if (data && typeof data === 'object' && data.error)
    return console.error(data.error)

  // Remove empty objects from the start of arrays
  if (data instanceof Array)
    data = data.filter(d => d.ID !== 0)

  if (this.useCallback)
    return handleCallback.call(this, data)


  const checkFileData = (d, logMsg) => {
    const fileDest = this.fileDest
    const filePath = this.filePath

    d = formatData.call(this, d)

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const existingData = JSON.parse( fs.readFileSync(filePath, 'utf8') )

      if (d === existingData) {
        logMsg += ' is up-to-date. Skipping.'
        this.spinner.text = logMessage

        return resolve.call(this, d)
      }

      logMsg += ' updated.'
      return writeFile.call(this, d, logMsg, false)
    }

    logMsg += ' created.'
    return writeFile.call(this, d, logMsg, true)
  }


  if (this.fileList) {
    this.toProcess = 1
    this.spinner.text = `Preparing to create ${this.toProcess} file`

    return checkFileData(data, `${this.name} @ ${this.filePath}`,)
  }

  return checkFileData(data, `${this.name} @ ${this.filePath}`,)
}


/**
 *
 */
function writeFile (d, logMsg, isNew) {
  d = formatData.call(this, d)

  if (!fs.existsSync(this.fileDest))
    fs.mkdirSync(this.fileDest)

  fs.writeFileSync(this.filePath, JSON.stringify(d), 'utf8')
  this.spinner.text = logMsg

  if (isNew)
    this.created++
  else
    this.updated++

  if (this.useCallback)
    return this.callback()

  progress.call(this)

  // if (this.fileList)
  finalise.call(this, d)
}


/**
 * @param {Array} - Data to format
 */
function formatData (d) {
  if (this.formatted)
    return d

  if (!this.formatted && typeof this.formatData === 'function')
    d = this.formatData(d, this.args)

  this.formatted = true
  return d
}


/**
 *
 */
function progress () {
  this.processed++

  if (this.processed === this.toProcess) {
    this.spinner.succeed(`Processing for ${this.name} complete. Created ${this.created} / Updated ${this.updated}`)
  }
}


/**
 *
 */
function finalise (d) {
  if (this.recursive)
    return this.callback(this.spinner, this.created, this.updated)

  if (this.callback)
    return this.callback(d, this.spinner, this.args, this.resolve)

  if (this.resolve)
    return this.resolve(d)

  return
}



function handleCallback (d) {
  if (!this.useCallback)
    return this.spinner.fail(`Processing for ${this.name} halted. handleCallback() should not have been called.`)

  d = formatData.call(this, d)

  return this.callback(d, this.spinner, this.args, this.resolve)
}
