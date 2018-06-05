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
const updateShops = require('./scripts/library/shops')
const updatePlaceNames = require('./scripts/library/placeNames')
const updateNpcResidents = require('./scripts/library/npcResidents')
const updateOrchestrionRolls = require('./scripts/library/orchestrionRolls')

const buildNpcList = require('./scripts/library/npcList')



global.appRoot = path.resolve(__dirname)


const api = async function(args) {
  let config = {}

  args.length ? args.forEach(a => config[a] = true) : config = false


  // Library updating
  if (!config || config.libra) {
    const progress = {
      patches: false,
      orchestrionRolls: false,
      npcResidents: false,
    }

    // updatePatches.fetch()
    // updateOrchestrionRolls.fetch()
    // updateNpcResidents.fetch()


      await updateOrchestrionRolls.fetch()
        .then(() => console.log('fire'))


    // await updateNpcResidents.fetch()

    // buildNpcList()

    // updatePlaceNames.fetch()

    // if( await updatePatches.patches() ) {
    //   console.log('will update')
    //   return
    // }
    //
    // console.log('no change')
    // return
  }
}


api(process.argv.slice(2))
