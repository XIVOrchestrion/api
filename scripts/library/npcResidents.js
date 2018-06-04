const { destLibra } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')


module.exports = new libraryFile ('NPC Residents', 'NPC Residents', {
  dest: destLibra,
  fileName: 'npcResidents',
  file: {
    url: 'ENpcResident',
    columns: [
      'ID',
      'Base.ENpcData0',
      'Base.ENpcData1',
      'Base.ENpcData2',
      'Base.ENpcData3',
      'Base.ENpcData5',
      'Base.ENpcData6',
      'Base.ENpcData7',
      'Base.ENpcData8',
      'Base.ENpcData9',
      'Base.ENpcData10',
      'Base.ENpcData11',
      'Base.ENpcData12',
      'Base.ENpcData13',
      'Base.ENpcData14',
      'Base.ENpcData15'
    ],
  },
  pagination: true,
  format: (data) => {

    const result = {}
    data.forEach((entry, i) => {
      if(entry['Base.ENpcData0'] === 0)
        return

      const shopVals = []
      Object.entries(entry).forEach(key => {
        if (key[0].includes('Base.ENpcData') && key[1] !== 0)
          return shopVals.push(key[1])

        return
      })

      const nameCheck = name => name === entry.Name_en ? true : name

      result[entry.ID] = {
        id: entry.ID,
        shopVals: shopVals,
      }
    })

    return result
  },
})
