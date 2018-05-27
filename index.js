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


global.appRoot = path.resolve(__dirname)


const api = async function(args) {
  let config = {}

  args.length ? args.forEach(a => config[a] = true) : config = false


  // Library updating
  if (!config) {

    if ( await updatePatches.print() ) {
      return console.log('will run updates')
      //updateCurrency.print()
      //updateShops.print()
      return
    }

    console.log('skipping updates')
    return
  }
}


api(process.argv.slice(2))
