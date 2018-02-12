const o = require('../_obtainMethods')


const helper = {
  msq: (name, level) => {
    return o(
      'msq',
      [
        name,
        level
      ],
      true,
      false
    )
  },
  quest: (name, level, issuer, location, x, y) => {
    return o(
      'quest',
      [
        name,
        level,
        issuer,
        location,
        x, y
      ],
      true,
      false,
    )
  },
  achievement: () => {
    return o(
    )
  },
}


module.exports = (song, achievement) => {
  switch (song.id) {

    default:
      return null
  }
}
