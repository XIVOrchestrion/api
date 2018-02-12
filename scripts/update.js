const fs = require('fs');

console.log('\n')

const update = async function(args) {
  let config = {}

  if (args.length)
    args.forEach(a => config[a] = true)
  else
    config = false

  let orchestrionUi
  await new Promise((resolve) => fs.readFile('../docs/orchestrionUi.json', 'utf8', (e, data) => {
    resolve(data)
  })).then(data => orchestrionUi = JSON.parse(data))

  // Patches
  if (!config || config.patches) {
    message('Patches')
    await require('./patches/list.js').fetch()
  }

  // Orchestrion Rolls
  if (!config || config.music) {
    message('Orchestrion Rolls')
    await require('./orchestrionrolls/list.js').fetch(orchestrionUi)
    await require('./orchestrionrolls/data.js').fetch()
  }
  if (config && config.musicList) {
    await require('./orchestrionrolls/list.js').fetch(orchestrionUi)
  }

  if (config && config.updateCSV) {
    await require('./orchestrionrolls/csv.js').fetch()
  }
}


function message(type) {
  console.info(`Updating ${type}.`)
}


update(process.argv.slice(2))
