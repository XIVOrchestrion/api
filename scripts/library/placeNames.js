const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('Place Names', 'Place Names', {
  dest: 'library',
  fileName: 'placeNames',
  file: {
    url: 'PlaceName',
    columns: ['ID', 'Name_en', 'Name_de', 'Name_fr', 'Name_ja'],
    pagination: true,
  },
  format: (data) => {
    const result = {}
    data.forEach((entry, i) => {
      result[entry.ID] = {
        id: entry.ID,
        name: {
          en: entry.Name_en,
          de: entry.Name_de,
          fr: entry.Name_fr,
          ja: entry.Name_ja,
        },
      }
    })

    return result
  },
})
