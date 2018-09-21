/**
 * FadedCopyAPI is a tool to populate the Faded Copy website.
 *
 * @author Liam Morgan <lite@getignited.co.uk> (https://github.com/getignited)
 * @copyright © 2018 Liam Morgan
 */

const fs = require('fs')
const path = require('path')

const fetchCurrency = require('./scripts/fetches/fetchCurrency')
const fetchInstanceContent = require('./scripts/fetches/fetchInstanceContent')
const fetchOrchestrion = require('./scripts/fetches/fetchOrchestrion')
const fetchPatchList = require('./scripts/fetches/fetchPatchList')
const fetchAetherCurrent = require('./scripts/fetches/fetchAetherCurrent')
const fetchAetherLinks = require('./scripts/fetches/fetchAetherLinks')
const fetchAetherLevels = require('./scripts/fetches/fetchAetherLevels')

const territoryType = require('./scripts/_xivmaps/fetch/territoryType')
const level = require('./scripts/_xivmaps/fetch/level')
const buildMaps = require('./scripts/_xivmaps/process')

const processOrchestrion = require('./scripts/process/processOrchestrion')
const processAetherCurrents = require('./scripts/process/aetherCurrents')

const mapAetherCurrents = require('./scripts/maps/aetherCurrents')


global.appRoot = path.resolve(__dirname)


const api = async function(args) {
  let config = {}

  args.length ? args.forEach(a => config[a] = true) : config = false

  const fetchCurrencyData = () => new Promise((resolve, reject) => fetchCurrency.fetch(resolve))
  const fetchPatchData = () => new Promise((resolve, reject) => fetchPatchList.fetch(resolve))
  const fetchInstanceData = () => new Promise((resolve, reject) => fetchInstanceContent.fetch(resolve))
  const fetchOrchestrionData = () => new Promise((resolve, reject) => fetchOrchestrion.fetch(resolve))
  const fetchAetherCurrentData = () => new Promise((resolve, reject) => fetchAetherCurrent.fetch(resolve))
  const fetchAetherLinksData = data => new Promise((resolve, reject) => fetchAetherLinks(data, resolve))
  const fetchAetherLevelsData = data => new Promise((resolve, reject) => fetchAetherLevels(data, resolve))

  const fetchTerritoryType = () => new Promise(resolve => territoryType.fetch(resolve))
  const fetchLevels = () => new Promise(resolve => level(resolve))

  console.clear()

  if (config.help || config['--help']) {
    console.log(`
      currents: Fetch Aether Currents data from XIVAPI
      currentsBuild: Build data object for Aether Currents
    `)
  }

  if(config.faded) {
    await fetchPatchData()
      // .then(() => fetchCurrencyData())
      // .then(() => fetchInstanceData())
      .then(() => fetchOrchestrionData())
      // .then(res => processOrchestrion(res))
    //   return fs.readFileSync('../library/fetchOrchestrion.json')
    // })
  }

  if (config.fadedBuild) {

    await processOrchestrion()
  }

  /**
   * - Check Patch Data
   * - Fetch all Aether Current items
   * - Use Aether Current IDs to get Levels data
   * - Fetch required Levels data
   * - Map Levels to the relate ID data
   */
  if(config.currents) {
    await fetchPatchData()
      .then(() => fetchAetherCurrentData())
      .then(data => fetchAetherLinksData(data))
      .then(data => fetchAetherLevelsData(data))
      .then(() => mapAetherCurrents())
      .then(() => console.log('✅  Currents Library data is now populated'))
  }

  if(config.currentsBuild) {
    if (!fs.existsSync('./library/currents'))
      console.error('Currents data does not exist. Please run `npm start currents` and try again.')

    processAetherCurrents()
  }


  if (config.map) {
    await fetchPatchData()
      .then(() => fetchLevels())
  }

  if (config.mapBuild) {
    buildMaps()
  }
}

api(process.argv.slice(2))
