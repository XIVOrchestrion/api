const fs = require('fs')
const dir = __dirname
console.log('\n')

const update = async function(args) {
  let config = {}

  if (args.length)
    args.forEach(a => config[a] = true)
  else
    config = false

  let orchestrionUi

  await new Promise((resolve) => fs.readFile(`${dir}/../docs/orchestrionUi.json`, 'utf8', (e, data) => {
    resolve(data)
  })).then(data => orchestrionUi = JSON.parse(data))

  // Patches
  if (!config || config.patches) {
    message('Patches')
    await require(`${dir}/patches/list.js`).fetch()
  }

  // Orchestrion Rolls
  if (!config || config.music) {
    message('Orchestrion Rolls')
    await require(`${dir}/orchestrionrolls/list.js`).fetch(orchestrionUi)
    await require(`${dir}/orchestrionrolls/data.js`).fetch()
  }
  if (config && config.musicList) {
    await require(`${dir}/orchestrionrolls/list.js`).fetch(orchestrionUi)
  }

  if (config && config.updateCSV) {
    await require(`${dir}/orchestrionrolls/csv.js`).fetch()
  }
}


function message(type) {
  console.info(`Updating ${type}.`)
}


update(process.argv.slice(2))
