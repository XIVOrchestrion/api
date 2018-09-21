const fetchApi = require('./fetchApi')

let recursiveCreated
let recursiveUpdated
let fileNumber

module.exports = function(data, name, getConfig, resolve, resolveData) {
  recursiveCreated = 0
  recursiveUpdated = 0
  fileNumber = 1
  const all = data.slice(0)
  recursiveFetch(all, ...arguments)
}

function recursiveFetch(all, data, name, getConfig, resolve, resolveData) {
  const entry = data.shift()

  new fetchApi (
    `${name} (${fileNumber}/${all.length})`,
    getConfig(entry, all),
    (spinner, created, updated) => {
      fileNumber++

      if (created)
        recursiveCreated++

      if (updated)
        recursiveUpdated++

      if (data.length)
        return recursiveFetch(...arguments)

      spinner.succeed(`Processing for ${name} files complete. Created ${recursiveCreated} / Updated ${recursiveUpdated}`)

      if (resolveData)
        resolve(all)

      resolve()
    }
  ).fetch()
}
