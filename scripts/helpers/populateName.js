/**
 * Quick way to compare name variants and return a
 * minified, usable object
 *
 * @param {string} nameEn
 * @param {string} nameDe
 * @param {string} nameFr
 * @param {string} nameJp
 * @returns {Object}
 */
module.exports = (nameEn, nameDe, nameFr, nameJp) => {

  const checkName = (nameToCheck, nameEn) => nameToCheck === nameEn || nameToCheck === true
                  ? true
                  : nameToCheck

  return {
    en: nameEn,
    de: checkName(nameDe, nameEn),
    fr: checkName(nameFr, nameEn),
    jp: checkName(nameJp, nameEn),
  }
}
