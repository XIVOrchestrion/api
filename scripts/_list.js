const fs = require('fs')

module.exports = function(fileName, data, base, _helperCreateJSONFn) {
  const filePath = `${base}${fileName}.json`

  fs.exists(filePath, (exists) => {
    let logMessage = fileName + " list "

    if (exists)
      logMessage += "updated."
    else
      logMessage += "created."

    logMessage += "\n"
    
    _helperCreateJSONFn.call(this, fileName, data, logMessage)
  })
}