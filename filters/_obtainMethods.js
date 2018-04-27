module.exports = (methodText, methodValues, available, promo, extra) => {
  const result = {
    method: {
      text: methodText,
      values: methodValues.map(val => {
        if (val instanceof Array)
          return {
            de: val[1] === true ? val[0] : val[1],
            en: val[0],
            fr: val[2] === true ? val[0] : val[2],
            jp: val[3] === true ? val[0] : val[3]
          }

        return val
      })
    },
    available: available,
    promo: promo,
  }

  if (extra)
    result.extra = extra

  return result
}
