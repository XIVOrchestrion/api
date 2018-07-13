const fs = require('fs')
const { destLibra, destLibraMusic, destLibraQuest } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')
const recursiveFetch = require('../helpers/recursiveFetch')
const writeMap = require('../helpers/writeMap')


module.exports = new libraryFile ('Quest', 'Quests', {
  dest: destLibra,
  fileName: 'quest',
  file: {
    url: 'Quest',
    columns: [
      'ID',
      'ItemReward00',
      'ItemReward01',
      'ItemReward02',
      'ItemReward03',
      'ItemReward04',
      'ItemReward05',
      'ItemReward10',
      'ItemReward11',
      'ItemReward12',
      'ItemReward13',
      'ItemReward14',
    ],
  },
  list: true,
  useCallback: true,
}, (data, args, resolve) => {
  const songs = fs.readdirSync(destLibraMusic, 'utf8').map(fileName => {
    fileName.replace('.json', '')
    return parseInt(fileName, 10)
  })

  const questMap = {}
  const quests = []

  data.forEach(entry => {
    const id = entry.ID
    const rewards = [
      entry.ItemReward00,
      entry.ItemReward01,
      entry.ItemReward02,
      entry.ItemReward03,
      entry.ItemReward04,
      entry.ItemReward05,
      entry.ItemReward10,
      entry.ItemReward11,
      entry.ItemReward12,
      entry.ItemReward13,
      entry.ItemReward14,
    ]

    rewards.forEach(reward => {
      if (reward === 0 || reward === null)
        return

      if (songs.includes(reward)) {
        questMap[id] ? questMap[id].song.push(reward) : questMap[id] = { song: [reward] }
        !quests.includes(id) ? quests.push(id) : null
      }

      return
    })
  })

  writeMap(questMap, destLibra, 'questMap')

  recursiveFetch(quests, 'Quest', (entry, all) => {
    return {
      dest: destLibraQuest,
      fileName: entry,
      file: {
        url: `Quest/${entry}`,
      },
      format: (data, args) => data,
    }
  }, resolve)
})
