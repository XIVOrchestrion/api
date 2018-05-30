const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('NPC Residents', 'NPC Residents', {
  dest: 'library',
  fileName: 'npcResidents',
  file: {
    url: 'ENpcResident',
    columns: [
      'ID',
      'Name_en',
      'Name_de',
      'Name_fr',
      'Name_ja',
      'Base.ENpcData_0',
      'Base.ENpcData_1',
      'Base.ENpcData_2',
      'Base.ENpcData_3',
      'Base.ENpcData_5',
      'Base.ENpcData_6',
      'Base.ENpcData_7',
      'Base.ENpcData_8',
      'Base.ENpcData_9',
      'Base.ENpcData_10',
      'Base.ENpcData_11',
      'Base.ENpcData_12',
      'Base.ENpcData_13',
      'Base.ENpcData_14',
      'Base.ENpcData_15'
    ],
    pagination: true,
  },
  format: (data) => {
    const result = {}
    data.forEach((entry, i) => {
      if(entry['Base.ENpcData_0'] === 0)
        return

      const shopVals = []
      Object.entries(entry).forEach(key => {
        if (key[0].includes('Base.ENpcData_') && key[1] !== 0)
          return shopVals.push(key[1])

        return
      })

      const nameCheck = name => name === entry.Name_en ? true : name

      result[entry.ID] = {
        id: entry.ID,
        name: {
          en: entry.Name_en,
          de: nameCheck(entry.Name_de),
          fr: nameCheck(entry.Name_fr),
          ja: nameCheck(entry.Name_ja),
        },
        shopVals: shopVals,
      }
    })

    return result
  },
})
