const libraryFile = require('./libraryFile')


module.exports = function(data, name, getConfig, resolve) {
  const all = data.slice(0)
  recursiveFetch(all, ...arguments)
}


function recursiveFetch(all, data, name, getConfig, resolve) {
  const entry = data.shift()
  new libraryFile (
    `${name} ${entry.ID ? entry.ID : entry}`,
    name,
    getConfig(entry, all),
    () => {
      if (data.length)
        return recursiveFetch(...arguments)

      if (resolve)
        return resolve()

      return
    }
  ).fetch()
}
