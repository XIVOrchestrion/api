const termsStrings = require('../termsStrings')
const o            = require('../_obtainMethods')

const {
  beastTribe,
  beastTribeRanks,
  currency,
  events,
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
  crafted: (level, stars, specialist, materials) => {
    return o(
      'craft',
      [
        level, stars,
        ['Alchemist', '', '', ''],
        specialist
      ],
      true,
      false,
      {
        // Recipe
      }
    )
  },
  achievement: (achievementId) => {
    return o(
      'achievement',
      [
        ['Jonathas', true, true, 'ジョナサス'],
        locales.oldGridania,
        10.6, 6.3
      ],
      true,
      false,
      {
        //achievement: getAchievement(achievements, achievementId)
      }
    )
  },
  seasonalPurchase: (cost, currency, vendor, event, year, available) => {
    return o(
      'seasonalPurchase',
      [
        cost, currency,
        vendor[0],
        vendor[1],
        vendor[2],
        vendor[3], vendor[4],
        event.map(item => `${item} ${year}`)
      ],
      available,
      false
    )
  },
  fadedDuty: (name, level) => {
    return o(
      'fadedDuty',
      [
        name,
        level
      ],
      true,
      false,
    )
  },
  fadedExploratory: (type, zone) => {
    return o(
      'fadedExploratory',
      [
        type,
        zone
      ],
      true,
      false
    )
  },
  fadedHunt: (rank, location) => {
    return o(
      'fadedHunt',
      [
        rank,
        location
      ],
      true,
      false,
    )
  },
  fadedPurchase: (cost, currency, vendor) => {
    return o(
      'fadedPurchase',
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
  fadedTreasureMap: (type) => {
    return o(
      'fadedTreasureMap',
      [
        type
      ],
      true,
      false,
    )
  },
  fadedTrial: (name, level) => {
    return o(
      'fadedTrial',
      [
        name,
        level
      ],
      true,
      false,
    )
  },
}

module.exports = (song, achievement) => {

  const methods = {
    14221: helper.purchase(5000, currency.mgp, vendors.goldSaucerAttendant),
    14222: helper.purchase(5000, currency.gil, vendors.maisenta),
    14223: helper.purchase(5000, currency.gil, vendors.bangoZango),
    14224: helper.purchase(5000, currency.gil, vendors.roarich),
    14225: helper.purchase(5000, currency.gil, vendors.frine),
    14226: helper.purchase(5000, currency.gil, vendors.hanekoBurneko),
    14227: helper.purchase(10000, currency.mgp, vendors.goldSaucerAttendant),
    14228: helper.purchase(15000, currency.mgp, vendors.goldSaucerAttendant),
    14229: [
      helper.fadedPurchase(500, currency.tomePoet, vendors.auriana),
      helper.crafted(50, false, false)
    ],
    14230: helper.fadedHunt('A', locales.theDravanianForelands),
    14231: helper.fadedHunt('A', locales.theSeaOfClouds),
    14232: helper.achievement(1433),
    14233: helper.purchase(30000, currency.mgp, vendors.goldSaucerAttendant),
    14234: helper.fadedTreasureMap(['all', true, true, true]),
    14235: helper.fadedExploratory(['Airship', true, true, true], ['Sector 23', true, true, true]),
    14236: helper.seasonalPurchase(
      5, ['Fortune Eggs', 'Strahlendes Glücksei', 'Prœuf de la fortune', 'フォーチュンエッグ'],
      [
        ['Dreamer', 'Träumerin', 'Rêveuse', 'エッグドリーマー'],
        false,
        locales.uldahStepsOfNald,
        10.6, 9.9
      ],
      events.hatchingTide, 2016,
      false
    ),
    14237: helper.purchase(6, currency.amber, vendors.amberTrader),
    14238: helper.purchase(3, currency.amber, vendors.amberTrader),
    14239: helper.fadedPurchase(5000, currency.wolfMark, vendors.stormSergeantWolvesDen),
    14240: helper.fadedPurchase(10000, currency.wolfMark, vendors.stormSergeantWolvesDen),
    14241: [
      helper.fadedDuty(locales.duty.sastasha, 15),
      helper.fadedDuty(locales.duty.sastashaHard, 50),
      helper.crafted(30, false, false)
    ],
    14242: [
      helper.fadedDuty(locales.duty.tamtara, 16),
      helper.fadedDuty(locales.duty.tamtaraHard, 50),
      helper.crafted(30, false, false)
    ],
    14243: [
      helper.fadedDuty(locales.duty.copperbellMines, 15),
      helper.fadedDuty(locales.duty.copperbellMinesHard, 50),
      helper.crafted(30, false, false)
    ],
    14244: [
      helper.fadedDuty(locales.duty.pharosSirius, 50),
      helper.fadedDuty(locales.duty.pharosSiriusHard, 60),
      helper.crafted(50, 2, false)
    ],
    14245: [
      helper.fadedDuty(locales.duty.theAetherochemicalResearchFacility, 60),
      helper.crafted(60, false, false)
    ],
    14246: [
      helper.fadedDuty(locales.duty.theAntitower, 60),
      helper.crafted(60, 1, false)
    ],
    14247: [
      helper.fadedDuty(locales.duty.theLostCityOfAmdapor, 50),
      helper.fadedDuty(locales.duty.theLostCityOfAmdaporHard, 60),
      helper.crafted(50, 2, false)
    ],
    14248: helper.purchase(50000, currency.mgp, vendors.goldSaucerAttendant),
    14249: helper.achievement(1434),
    14250: [
      helper.fadedTrial(locales.trial.ultimasBane, 50),
      helper.crafted(50, 3, false)
    ],
    14251: [
      helper.fadedTrial(locales.trial.theBowlOfEmbersExtreme, 50),
      helper.crafted(50, 3, false)
    ],
    14252: [
      helper.fadedTrial(locales.trial.theHowlingEyeExtreme, 50),
      helper.crafted(50, 3, false)
    ],
    14253: [
      helper.fadedTrial(locales.trial.theNavelExtreme, 50),
      helper.crafted(50, 3, false)
    ],
    14254: [
      helper.fadedTrial(locales.trial.thordansReign, 60),
      helper.crafted(60, 1, false)
    ],
    14255: [
      helper.fadedTrial(locales.trial.containmentBayS1T7, 60),
      helper.crafted(60, 1, false)
    ],
    14256: [
      helper.fadedDuty(locales.duty.theLabyrinthOfTheAncients, 50),
      helper.crafted(50, 4, false)
    ],
    14257: [
      helper.fadedDuty(locales.duty.theLabyrinthOfTheAncients, 50),
      helper.crafted(50, 4, false)
    ],
    14258: [
      helper.fadedDuty(locales.duty.syrcusTower, 50),
      helper.crafted(50, 4, false)
    ],
    14259: [
      helper.fadedDuty(locales.duty.syrcusTower, 50),
      helper.crafted(50, 4, false)
    ],
    14260: [
      helper.fadedDuty(locales.duty.theWorldOfDarkness, 50),
      helper.crafted(50, 4, false)
    ],
    14261: [
      helper.fadedDuty(locales.duty.theWorldOfDarkness, 50),
      helper.crafted(50, 4, false)
    ],
    14262: [
      helper.fadedDuty(locales.duty.theLabyrinthOfTheAncients, 50),
      helper.fadedDuty(locales.duty.syrcusTower, 50),
      helper.fadedDuty(locales.duty.theWorldOfDarkness, 50),
      helper.crafted(60, 1, false)
    ],

    14266: helper.purchase(375, currency.tomePoet, vendors.hismena),

    15799: helper.purchase(5000, currency.gil, vendors.roarich),
    15800: helper.purchase(5000, currency.gil, vendors.bangoZango),
    15801: helper.purchase(5000, currency.gil, vendors.maisenta),
    15802: helper.purchase(5000, currency.gil, vendors.frine),

    15808: helper.purchase(5000, currency.gil, vendors.roarich),
    15809: helper.purchase(5000, currency.gil, vendors.bangoZango),
    15810: helper.purchase(5000, currency.gil, vendors.maisenta),

    15824: helper.purchase(20000, currency.mgp, vendors.goldSaucerAttendant),

    16802: helper.purchase(5000, currency.gil, vendors.frine),
    16803: helper.purchase(5000, currency.gil, vendors.frine),
    16804: [
      helper.purchase(5000, currency.gil, vendors.maisenta),
      helper.purchase(5000, currency.gil, vendors.bangoZango),
      helper.purchase(5000, currency.gil, vendors.roarich)
    ],

    16811: helper.purchase(20000, currency.mgp, vendors.goldSaucerAttendant),

    17642: helper.purchase(30000, currency.mgp, vendors.goldSaucerAttendant),
    17643: helper.purchase(30000, currency.mgp, vendors.goldSaucerAttendant),

    22485: helper.purchase(50000, currency.mgp, vendors.goldSaucerAttendant),
    22488: helper.purchase(50000, currency.mgp, vendors.goldSaucerAttendant),
  }

  const thisMethod = methods[song.id] || null

  if (!thisMethod) {
    let songName = song.name_en.replace(' Orchestrion Roll', '')
    console.warn(`No method could be found for Song ${song.id} (${songName}). Please check methods and try again.`)
  }

  return thisMethod
}
