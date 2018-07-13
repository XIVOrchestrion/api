const fs = require('fs')

/**
 * Write out the data map
 *
 * @param {Object} data
 * @param {string} directory
 * @param {string} fileName
 */
module.exports = function (data, directory, fileName) {
  const dest = `${directory}/${fileName}.json`

  if (fs.existsSync(dest)) {
    const existingData = fs.readFileSync(dest, 'utf-8')

    if (existingData === JSON.stringify(data))
      return console.log(`${dest} unchanged.`)

    fs.writeFileSync(dest, JSON.stringify(data), 'utf-8')
    return console.log(`${dest} updated.`)
  }

  fs.writeFileSync(dest, JSON.stringify(data), 'utf-8')
  return console.log(`${dest} created.`)
}
