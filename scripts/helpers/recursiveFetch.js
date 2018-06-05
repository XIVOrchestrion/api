const libraryFile = require('./libraryFile')


module.exports = function(data, name, getConfig) {
  const all = data.slice(0)
  recursiveFetch(all, ...arguments)
}


function recursiveFetch(all, data, name, getConfig) {
  const entry = data.shift()
  new libraryFile (
    `${name} ${entry.ID ? entry.ID : entry}`,
    name,
    getConfig(entry, all),
    () => {
      if (data.length)
        return recursiveFetch(...arguments)

      return true
    }
  ).fetch()
}
