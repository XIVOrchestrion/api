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
const updateInstances = require('./scripts/library/instances')
const updateGilShops = require('./scripts/library/gilShop')
const updateSpecialShops = require('./scripts/library/specialShop')
const updatePlaceNames = require('./scripts/library/placeNames')
const updateNpcResidents = require('./scripts/library/npcResidents')
const updateOrchestrionRolls = require('./scripts/library/orchestrionRolls')
const updateOrchestrionUi = require('./scripts/library/orchestrionUi')
const updateCrafts = require('./scripts/library/crafts')
const updateQuests = require('./scripts/library/quests')

const buildNpcList = require('./scripts/library/npcList')

const buildOrchestrionRolls = require('./scripts/orchestrionRolls/orchestrionRolls')



global.appRoot = path.resolve(__dirname)


const api = async function(args) {
  let config = {}

  args.length ? args.forEach(a => config[a] = true) : config = false

  // Library updating
  if (!config || config.libra) {

    const testScriptPatches = require('./_scripts/libra/patches')
    const testScriptOrchestrion = require('./_scripts/libra/orchestrionRolls')
    const testScriptCurrencies = require('./_scripts/libra/currency')
    const testScriptRecipes = require('./_scripts/libra/recipes')
    await new Promise((resolve, reject) => testScriptPatches.fetch(resolve))
      // .then(() => new Promise( resolve => testScriptOrchestrion.fetch(resolve)))
      // .then(() => new Promise( resolve => testScriptRecipes(resolve)))

    // await new Promise((resolve, reject) => updatePatches.fetch(resolve))
    //   // .then(() => new Promise( resolve => updateGilShops.fetch(resolve) ))
    //   // .then(() => new Promise( resolve => updateSpecialShops.fetch(resolve) ))
    //   // .then(() => new Promise( resolve => updateOrchestrionUi.fetch(resolve) ))
    //   // .then(() => new Promise( resolve => updateOrchestrionRolls.fetch(resolve) ))
    //   // .then(() => new Promise( resolve => updateNpcResidents.fetch(resolve) ))
    //   // .then(() => buildNpcList())
    //   // .then(() => new Promise( resolve => updateQuests.fetch(resolve) ))
    //   // .then(() => new Promise( resolve => updateInstances.fetch(resolve) ))
    //   .then(() => new Promise( resolve => updateCrafts.fetch(resolve) ))
    //   .catch(e => console.warn(e))
    //
    // // updatePlaceNames.fetch()
  }

  if (!config | config.build) {
    if (fs.existsSync('./library/orchestrion', 'utf8'))
      buildOrchestrionRolls('./library/orchestrion')

  }
}


api(process.argv.slice(2))
