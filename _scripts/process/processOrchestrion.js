const fs = require('fs')
const { destLibra } = require ('../_consts')


module.exports = async function () {
  // Go through OrchestrionMap data
  // Fetch all ITEM GameContentLinks
  // Make a fetch for each file
  // Append any game data into the map
  // Add any manual data to the map at this point
  // With the file data obtained save the file down

  const data = await JSON.parse(fs.readFileSync(`${destLibra}/orchestrionMap.json`, 'utf8'))

  const res = data.map(song => {
    return {
      id: song.id,
      name: {
        en: song.name,
      },
      desc: {
        en: song.info.desc,
      },
      sorting: {
        defOrder: song.info.uiId,
        category: song.info.uiCat,
        catOrder: song.info.uiOrder,
      },
    }
  })

  console.log(res)
  fs.writeFileSync('./docs/fadedCopy.json', JSON.stringify(res), 'utf8')

  /**
   * Scan description content to auto-populate Instance Data
   */
  const mapInstances = () => {
    const instances = JSON.parse(fs.readFileSync(`${destLibra}/instances.json`, 'utf8'))
    const instanceNames = instances.filter(i => {
      if (i.type ===  3 || i.type ===  5 || i.type ===  6 || i.type === 7 || i.type === 8 || i.type === 9 || i.type === 11 || i.type === null)
        return

      if (i.name.en === '')
        return

      return i
    }).map(i => i.name.en)


    /**
     * NOTE TO SELF - When appending numbers to Faded Copies, make sure it's appended to correct Copy
     * @param {number} id - Song ID number
     * @param {string} desc - Description to scan through
     */
    const scanDesc = (id, desc) => {
      instanceNames.forEach(name => {
        if (desc.includes(`${name} or`))
          return console.log({desc: desc, name: name})

        if (desc.includes(`${name} (`))
          return

        if (desc.includes(name))
          return console.log({desc: desc, name: name})

        return
      })
    }

    data.forEach(i => {
      if (i.info.desc.startsWith('Materials for synthesis obtained')) {
        scanDesc(i.id, i.info.desc)
      }

      if (i.info.desc.startsWith('Obtained in')) {
        scanDesc(i.id, i.info.desc)
      }

      return
    })
  }

  // mapInstances()
}
