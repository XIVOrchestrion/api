/**
 * FadedCopyAPI is a tool to populate the Faded Copy website.
 *
 * @author Liam Morgan <lite@getignited.co.uk> (https://github.com/getignited)
 * @copyright © 2018 Liam Morgan
 */

const fs = require('fs')
const path = require('path')

const updatePatches = require('./scripts/library/patchList')
const updateCurrency = require('./scripts/library/currency')
const updateGilShops = require('./scripts/library/gilShop')
const updatePlaceNames = require('./scripts/library/placeNames')
const updateNpcResidents = require('./scripts/library/npcResidents')
const updateOrchestrionRolls = require('./scripts/library/orchestrionRolls')
const updateOrchestrionUi = require('./scripts/library/orchestrionUi')

const buildNpcList = require('./scripts/library/npcList')

const buildOrchestrionRolls = require('./scripts/orchestrionRolls/orchestrionRolls')



global.appRoot = path.resolve(__dirname)


const api = async function(args) {
  let config = {}

  args.length ? args.forEach(a => config[a] = true) : config = false


  // Library updating
  if (!config || config.libra) {

    await new Promise((resolve, reject) => updatePatches.fetch(resolve))
      .then(() => new Promise( resolve => updateGilShops.fetch(resolve) ))
      .then(() => new Promise( resolve => updateOrchestrionUi.fetch(resolve) ))
      // .then(() => new Promise( resolve => updateOrchestrionRolls.fetch(resolve) ))
      // .then(() => new Promise( resolve => updateNpcResidents.fetch(resolve) ))
      .then(() => buildNpcList())
      .catch(e => console.warn(e))

    // updatePlaceNames.fetch()
  }

  if (!config | config.build) {
    if (fs.existsSync('./library/orchestrion', 'utf8'))
      buildOrchestrionRolls('./library/orchestrion')

  }
}


api(process.argv.slice(2))
