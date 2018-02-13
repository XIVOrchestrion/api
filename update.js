const fs                   = require('fs')
const csvOrchestrion       = require('./scripts/orchestrionrolls/csv.js')
const orchestrionRollsList = require('./scripts/orchestrionrolls/list.js')
const orchestrionRollsData = require('./scripts/orchestrionrolls/data.js')
const patchesList          = require('./scripts/patches/list.js')


const update = async function(args) {
  let config = {}

  if (args.length)
    args.forEach(a => config[a] = true)
  else
    config = false

  let orchestrionUi

  await new Promise((resolve) => fs.readFile(`./docs/orchestrionUi.json`, 'utf8', (e, data) => {
    resolve(data)
  })).then(data => orchestrionUi = JSON.parse(data))

  console.log('\n')

  // Patches
  if (!config || config.patches) {
    message('Patches')
    await patchesList.fetch()
  }

  // Orchestrion Rolls
  if (!config || config.music) {
    message('Orchestrion Rolls')
    await orchestrionRollsList.fetch(orchestrionUi)
    await orchestrionRollsData.fetch()
  }
  if (config && config.musicList) {
    await orchestrionRollsList.fetch(orchestrionUi)
  }

  if (config && config.updateCSV) {
    await csvOrchestrion.fetch()
  }
}


function message(type) {
  console.info(`Updating ${type}.`)
}


update(process.argv.slice(2))
