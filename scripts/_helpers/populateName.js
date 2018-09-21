/**
 * Quick way to compare name variants and return a
 * minified, usable object
 *
 * @param {string} en - English item name
 * @param {string} de - German item name
 * @param {string} fr - French item name
 * @param {string} jp - Japanese item name
 * @returns {Object}
 */
module.exports = (en, de, fr, jp) => {

  const checkName = (nameToCheck, en) => {
    return nameToCheck === en || nameToCheck === true
         ? true
         : nameToCheck
  }

  return {
    en: en,
    de: checkName(de, en),
    fr: checkName(fr, en),
    jp: checkName(jp, en),
  }
}
