const fs             = require('fs')
const csvOrchestrion = require('./scripts/orchestrionrolls/csv.js')
const cacheBust      = require('./scripts/_cacheBust')


const update = async function(args) {
  let config       = {}
  let functionList = []
  let orchestrionUi

  args.length ? args.forEach(a => config[a] = true) : config = false

  await new Promise((resolve) => fs.readFile(`./docs/orchestrionUi.json`, 'utf8', (e, data) => {
    resolve(data)
  })).then(data => orchestrionUi = JSON.parse(data))

  console.log('\n')

  /* Update CSV-based files */
  if (config && config.updateCSV) {
    functionList += csvOrchestrion.fetch()
  }

  /* Update Patches */
  if (!config || config.patches) {
    message('Patches')
    await patchesList()
  }

  /* Update Orchestrion Rolls files */
  if (!config || config.music) {
    await message('Orchestrion Rolls')
    await new Promise((resolve, reject) => {
      orchestrionRollsList(orchestrionUi)
    }).then(resolve())
    // await new Promise(resolve => orchestrionRollsData())
    //   .then(res => console.log(res))
    // orchestrionRollsList(orchestrionUi)
  }

  if (config && config.musicList) {
    message('Orchestrion Rolls List')
    await orchestrionRollsList(orchestrionUi)
  }

  cacheBust()
}

function patchesList() {
  require('./scripts/patches/list.js').fetch()
  //new Promise((resolve, reject) => resolve())
}

function orchestrionRollsList(data) {
  require('./scripts/orchestrionrolls/list.js').fetch(data)
  //new Promise((resolve, reject) => resolve(require('./scripts/orchestrionrolls/list.js').fetch(data)))
}

function orchestrionRollsData() {
  require('./scripts/orchestrionrolls/data.js').fetch()
  
  // new Promise((resolve, reject) => resolve())
}


function message(type) {
  console.info(`Updating ${type}.`)
}


update(process.argv.slice(2))
