const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('NPC Residents', 'NPC Residents', {
  dest: destLibra,
  fileName: 'npcResidents',
  file: {
    url: 'ENpcResident',
    columns: [
      'ID',
      'GilShop',
      'SpecialShop',
      'Quests',
    ],
  },
  list: true,
  max: 500,
  format: (data) => {

    const result = {}
    data.forEach((entry, i) => {
      // Remove entries containing null values
      if (!entry.GilShop || !entry.SpecialShop || !entry.Quests)
        return

      // Remove entries that contain no links
      if(entry.GilShop.length === 0 && entry.SpecialShop.length === 0 && entry.Quests.length === 0)
        return

      result[entry.ID] = {
        id: entry.ID,
        values: [].concat(entry.GilShop, entry.SpecialShop, entry.Quests)
      }
    })

    return result
  }
})
