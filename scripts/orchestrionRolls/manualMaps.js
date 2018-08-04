const fs = require('fs')

/**
 * Create manual maps for data that is unmappable through XIVDB API
 */
module.exports = async function (data) {

  // instance: [songs]
  const typeDungeon = {

  }

  const typeFadedDungeon = {
    2:  [14242],
    3:  [14243],
    4:  [14241],
    17: [14244],
    18: [14243],
    22: [14247],
    24: [14242],
    28: [14241],
    38: [14245],
    40: [14244],
    42: [14247],
    43: [14246],
  }

  const typeTrial = {

  }

  const typeFadedTrial = {
    20008: [14251],
    20009: [14252],
    20010: [14253],
    20012: [15821],
    20013: [14250],
    20018: [15819, 15820],
    20021: [15823],
    20023: [16821],
    20036: [14254],
    20038: [14255],
  }

  const typeRaid = {

  }

  const typeFadedRaid = {
    30006: [14263, 14267],
    30010: [14264, 14267],
    30018: [14265],
    30019: [14267],
    30001: [14256, 14257, 14262],
    30011: [14258, 14259, 14262],
    30020: [14260, 14261, 14262],
  }

  const customMap = {}

  Object.entries(typeFadedTrial).forEach(entry => {
    const key = entry[0]
    const val = entry[1]

    customMap[key] = {
      type: 'fadedTrial',
      song: val
    }
  })

  Object.entries(typeFadedRaid).forEach(entry => {
    const key = entry[0]
    const val = entry[1]

    customMap[key] = {
      type: 'fadedRaid',
      song: val
    }
  })

  return customMap
}
