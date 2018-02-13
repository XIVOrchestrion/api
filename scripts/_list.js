const fs = require('fs')

module.exports = function(fileName, data, base, _helperCreateJSONFn) {
  const filePath = `${base}${fileName}.json`

  console.log(filePath)

  fs.exists(filePath, (exists) => {
    let logMessage = fileName + " list "
    
    console.log(exists)

    if (exists)
      logMessage += "updated."
    else
      logMessage += "created."

    logMessage += "\n"
    
    _helperCreateJSONFn.call(this, fileName, data, logMessage)
  })
}