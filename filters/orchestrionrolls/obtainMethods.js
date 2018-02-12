const termsStrings = require('../termsStrings')
const o            = require('../_obtainMethods')

const {
  beastTribe,
  beastTribeRanks,
  currency,
  locales,
  vendorNames,
  vendorMenus,
} = termsStrings


/* vendors
 * Return an array containing relevant data related to necessary vendors
 * - foo: [vendorNames.bar, vendorMenus.bar, locales.bar, posX, posY]
 */
const vendors = {
  amberTrader:                    [vendorNames.amberTrader, vendorMenus.amberExchangeOther, locales.foundation, 10, 10.3],
  ardolain:                       [vendorNames.ardolain, vendorMenus.exchangeCenturioSeals, locales.theForgottenKnight, 13, 11.8],
  auriana:                        [vendorNames.auriana, vendorMenus.poeticsOther, locales.morDhona, 22.7, 6.7],
  bangoZango:                     [vendorNames.bangoZango, vendorMenus.purchaseItems, locales.limsaLowerDecks, 9.9, 11.4],
  bertana:                        [vendorNames.bertana, vendorMenus.uncannyKnickKnacks, locales.idyllshire, 5.8, 5.2],
  chachamun:                      [vendorNames.chachamun, null, locales.easternThanalan, 22.3, 21.3],
  eUnaKotor:                      [vendorNames.eUnaKotor, vendorMenus.exchangeArtifacts, locales.southShroud, 25, 20.6],
  frine:                          [vendorNames.frine, vendorMenus.purchaseItems, locales.thePillars, 6, 9.9],
  goldSaucerAttendant:            [vendorNames.goldSaucerPrize, vendorMenus.prizeExchange2, locales.theGoldSaucer, 5.1, 6.7],
  hanekoBurneko:                  [vendorNames.hanekoBurneko, null, locales.theWakingSands, 6.2, 5.0],
  hismena:                        [vendorNames.hismena, vendorMenus.poeticsOther, locales.idyllshire, 5.8, 5.3],
  housingMerchantLavenderBeds:    [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.lavenderBeds, 11.8, 8.4],
  housingMerchantLavenderBedsSub: [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.lavenderBeds, 14, 11.8],
  housingMerchantMist:            [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.mist, 10.8, 11.5],
  housingMerchantMistSub:         [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.mist, 10.9, 10.8],
  housingMerchantShirogane:       [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.shirogane, 10, 11.8],
  housingMerchantShiroganeSub:    [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.shirogane, 10.5, 10],
  housingMerchantTheGoblet:       [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.theGoblet, 11.5, 9.4],
  housingMerchantTheGobletSub:    [vendorNames.housingMerchant, vendorMenus.purchaseFurnishings1, locales.theGoblet, 12.9, 11.5],
  junkmongerIdyllshire:           [vendorNames.junkmonger, null, locales.idyllshire, 6, 7.2],
  junkmongerMatoya:               [vendorNames.junkmonger, vendorMenus.purchaseItems, locales.matoyasCave, 6.8, 6.1],
  maisenta:                       [vendorNames.maisenta, vendorMenus.purchaseItems, locales.newGridania, 11.4, 11.2],
  merchantAleport:                [vendorNames.merchantMender, vendorMenus.purchaseItems, locales.westernLaNoscea, 26.2, 26.1],
  merchantTailfeather:            [vendorNames.travelingMerchant, vendorMenus.purchaseItems, locales.theDravanianForelands, 32, 23.4],
  roarich:                        [vendorNames.roarich, vendorMenus.purchaseItems, locales.uldahStepsOfNald, 10.6, 9.5],
  stormSergeantWolvesDen:         [vendorNames.stormSergeant, null, locales.wolvesDenPier, 4.5, 6.1],
  tribeAmaljaa:                   [vendorNames.tribeAmaljaa, vendorMenus.tribeAmaljaa, locales.southernThanalan, 23.2, 14.1],
  tribeAnanta:                    [vendorNames.tribeAnanta, vendorMenus.tribeAnanta, locales.theFringes, 20.9, 26.1],
  tribeIxal:                      [vendorNames.tribeIxal, vendorMenus.tribeIxal, locales.northShroud, 24.9, 22.7],
  tribeKojin:                     [vendorNames.tribeKojin, vendorMenus.tribeKojin, locales.theRubySea, 29.2, 16.8],
  tribeMoogle:                    [vendorNames.tribeMoogle, vendorMenus.tribeMoogle, locales.theChurningMists, 15.9, 28.5],
  tribeSahagin:                   [vendorNames.tribeSahagin, vendorMenus.tribeSahagin, locales.westernLaNoscea, 16.9, 22.4],
  tribeSylph:                     [vendorNames.tribeSylph, vendorMenus.tribeSylph, locales.eastShroud, 22.3, 26.4],
  tribeVanuVanu:                  [vendorNames.tribeVanuVanu, vendorMenus.tribeVanuVanu, locales.theSeaOfClouds, 7, 14.2],
  tribeVath:                      [vendorNames.tribeVath, vendorMenus.tribeVath, locales.theDravanianForelands, 23.6, 19.1]
}


const helper = {
  purchase: (cost, currency, vendor) => {
      return o(
        'purchase',
        [
          cost, currency,
          vendor[0],
          vendor[1],
          vendor[2],
          vendor[3], vendor[4]
        ],
        true,
        false
      )
    },
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

    case 16804:
      return [
        helper.purchase(5000, currency.gil, vendors.maisenta)
        helper.purchase(5000, currency.gil, vendors.bangoZango)
        helper.purchase(5000, currency.gil, vendors.roarich)
      ]

    default:
      return null
  }
}
