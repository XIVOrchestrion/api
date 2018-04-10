const fs = require('fs')

// Provides a cache version number for FadedCopy to check against
module.exports = () => {
  fs.writeFile(
    './docs/version.json',
    JSON.stringify({
      '@': +new Date()
    }),
    'utf8',
    () => {
      console.log("Updated cache.")
    }
  )
}