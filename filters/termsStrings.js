const expansions = {
  legacy: 1,
  arr:    2,
  hw:     3,
  sb:     4
}

// Strings and localisations should be kept in the following order:
// [english, deutsch, french, japanese]
//
// If any language uses a duplicate of the English translation, mark as
// true

const beastTribe = {
  amaljaa:  ['Amalj\'aa', '', '', ''],
  ixal:     ['Ixal', '', '', ''],
  kobolds:  ['Kobold', '', '', ''],
  sahagin:  ['Sahagin', '', '', ''],
  sylphs:   ['Sylph', '', '', ''],
  vanuvanu: ['Vanu Vanu', '', '', ''],
  vath:     ['Vath', '', '', ''],
  moogles:  ['Moogle', '', '', ''],
  kojin:    ['Kojin', '', '', ''],
  ananta:   ['Ananta', '', '', '']
}

const beastTribeRanks = {
  neutral:    ['Neutral', '', '', ''],
  recognized: ['Recognized', '', '', ''],
  friendly:   ['Friendly', '', '', ''],
  trusted:    ['Trusted', 'Vertraut', 'Estimé', '信頼'],
  respected:  ['Respected', '', '', ''],
  honored:    ['Honored', '', '', ''],
  sworn:      ['Sworn', 'Solidarisch', 'Assermenté', '友好関係：誓約'],
  bloodsworn: ['Bloodsworn', '', '', ''],
  allied:     ['Allied', '', '', ''],
}

const currencyTomes = {
  en: 'Allagan Tomestones of',
  fr: 'Mémoquartz Allagois',
  de: 'Allagische Stein der ',
  jp: 'アラガントームストーン:'
}

const currency = {
  gil:                ['Gil', true, 'Gils', 'ギル'],
  gcSeal:             ['Grand Company Seals', 'Staatstaler', 'Sceaux de compagnie', '軍票'],
  mgp:                ['MGP', true, 'Points du Gold Saucer', 'マンダヴィル・マンダヴィル・ゴールドソーサーポイント'],
  alliedSeal:         ['Allied Seals', 'Jagdabzeichen', 'Insignes Allié', '同盟記章'],
  centurioSeal:       ['Centurio Seals', 'Centurio-Abzeichen', 'Insignes Centurio', 'セントリオ記章'],
  wolfMark:           ['Wolf Marks', 'Wolfsmarken', 'Marques de Loup', '対人戦績'],
  beastAmaljaa:       ['Steel Amalj\'ok', 'Stahl-Amalj\'oks', 'Amalj\'oks d\'acier', 'アマルジャ鋼鉄刀貨'],
  beastSylph:         ['Sylphic Goldleaves', 'Sylphen-Goldblätter', 'Feuilles Dorées de Sylphe', 'シルフ金葉貨'],
  beastKobold:        ['Titan Cobaltpieces', 'Titan-Koboldeisenstücke', 'Pièces de Cobalt Kobolde', 'コボルド鏡鉄錘貨'],
  beastSahagin:       ['Rainbowtide Psashps', 'Regenbogenwellen-Psashpen', 'Psashps Irisécaille', 'サハギン虹貝貨'],
  beastIxal:          ['Ixali Oaknots', 'Ixal-Eichenmünzen', 'Pièces en Chêne Ixale', 'イクサル樫木貨'],
  beastVanu:          ['Vanu Whitebones', 'Vanu-Weißknochen', 'Pièces d\'os Blanc Vanu Vanu', 'バヌバヌ白骨貨'],
  beastVath:          ['Black Copper Gil', 'Schwarzkupfer-Gil', 'Gils de Cuivre Noir', 'グナース偽黒銅貨'],
  beastMoogle:        ['Carved Kupo Nuts', 'Kupo-Schnitznüsse', 'Noix de Kupo Gravées', '飾りクポの実'],
  beastKojin:         ['Kojin Sango', 'Kojin-Korallen', 'Sango Kojin', 'コウジン珊瑚貨'],
  beastAnanta:        ['Ananta Dreamstaffs', 'Ananta-Traumstab', 'Barrette Béatifique Ananta', 'アナンタ魔金錫貨'],
  tomePhilo:          [`${currencyTomes.en} Philosophy`, `${currencyTomes.de} Philosophie`, `${currencyTomes.fr} Philosophal`, `${currencyTomes.jp}哲学`],
  tomeMyth:           [`${currencyTomes.en} Mythology`, `${currencyTomes.de} Mythologie`, `${currencyTomes.fr} Mythologique`, `${currencyTomes.jp}神話`],
  tomeSold:           [`${currencyTomes.en} Soldiery`, `${currencyTomes.de} Strategie`, `${currencyTomes.fr} Martial`, `${currencyTomes.jp}戦記`],
  tomePoet:           [`${currencyTomes.en} Poetics`, `${currencyTomes.de} Poesie`, `${currencyTomes.fr} Poétiques`, `${currencyTomes.jp}詩学`],
  tomeLaw:            [`${currencyTomes.en} Law`, `${currencyTomes.de} Juristik`, `${currencyTomes.fr} Juridique`, `${currencyTomes.jp}法典`],
  tomeEso:            [`${currencyTomes.en} Esoterics`, `${currencyTomes.de} Esoterik`, `${currencyTomes.fr} Ésotérique`, `${currencyTomes.jp}禁書`],
  tomeLore:           [`${currencyTomes.en} Lore`, `${currencyTomes.de} Tradition`, `${currencyTomes.fr} Traditionnel`, `${currencyTomes.jp}伝承`],
  tomeScrip:          [`${currencyTomes.en} Scripture`, `${currencyTomes.de} Theologie`, `${currencyTomes.fr} Théologique`, `${currencyTomes.jp}聖典`],
  tomeVeri:           [`${currencyTomes.en} Verity`, `${currencyTomes.de} Wahrheit`, `${currencyTomes.fr} Véridique`, `${currencyTomes.jp}真理`],
  tomeCreat:          [`${currencyTomes.en} Creation`, `${currencyTomes.de} Schöpfung`, `${currencyTomes.fr} Cosmogonique`, `${currencyTomes.jp}万物`],
  tomeMend:           [`${currencyTomes.en} Mendacity`, `${currencyTomes.de} Verlogenheit`, `${currencyTomes.fr} Mensonger`, `${currencyTomes.jp}虚構`],
  scripsRedGather:    [''],
  scripsRedCraft:     [''],
  scripsYellowGather: [''],
  scripsYellowCraft:  ['']
}

const events = {
  allSaintsWake:        ['All Saints\'s Wake', '', '', ''],
  hatchingTide:         ['Hatching-tide', '', '', ''],
  heavensturn:          ['Heavensturn', '', '', ''],
  littleLadiesDay:      ['Little Ladies\'s Day', '', '', ''],
  makeItRain:           ['The Make It Rain Campaign', '', '', ''],
  moonfireFaire:        ['Moonfire Faire', '', '', ''],
  starlightCelebration: ['Starlight Celebration', '', '', ''],
  theRising:            ['The Rising', '', '', ''],
  valentionesDay:       ['Valentione\'s Day', '', '', ''],
}

const locales = {
  azysLa:                   ['Azys La', '', '', ''],
  centralShroud:            ['Central Shroud', '', '', ''],
  centralThanalan:          ['Central Thanalan', '', '', ''],
  coerthasCentralHighlands: ['Coerthas Central Highlands', 'Zentrales Hochland Von Coerthas', 'Hautes Terres Du Coerthas Central', 'クルザス中央高地'],
  coerthasWesternHighlands: ['Coerthas Western Highlands', '', '', ''],
  easternLaNoscea:          ['Eastern La Noscea', 'Östliches La Noscea', 'Noscea Orientale', '東ラノシア'],
  easternThanalan:          ['Eastern Thanalan', 'Östliches Thanalan', 'Thanalan Oriental', '東ザナラーン'],
  eastShroud:               ['East Shroud', 'Ostwald', 'Forêt De L\'est', '黒衣森：東部森林'],
  foundation:               ['Foundation', 'Fundamente', 'Ishgard - L\'Assise', 'イシュガルド：下層'],
  idyllshire:               ['Idyllshire', '', '', ''],
  kugane:                   ['Kugane', '', '', ''],
  lavenderBeds:             ['Lavender Beds', '', '', ''],
  limsaLowerDecks:          ['Limsa Lominsa Lower Decks', 'Untere Decks', 'Limsa Lominsa - L\'Entrepont', 'リムサ・ロミンサ：下甲板層'],
  limsaUpperDecks:          ['Limsa Lominsa Upper Decks', 'Obere Decks', 'Limsa Lominsa - Le Tillac', 'リムサ・ロミンサ：上甲板層'],
  lowerLaNoscea:            ['Lower La Noscea', 'Unteres La Noscea', 'Basse-Noscea', '低地ラノシア'],
  matoyasCave:              ['Matoya\'s Cave', 'Matoyas Höhle', 'Caverne De Matoya', 'マトーヤの洞窟'],
  middleLaNoscea:           ['Middle La Noscea', '', '', ''],
  mist:                     ['Mist', '', '', ''],
  morDhona:                 ['Mor Dhona', true, true, 'モードゥナ'],
  newGridania:              ['New Gridania', 'Neu-Gridania', 'Nouvelle Gridania', 'グリダニア：新市街'],
  northernThanalan:         ['Northern Thanalan', 'Nördliches Thanalan', 'Thanalan Septentrional', '北ザナラーン'],
  northShroud:              ['North Shroud', 'Nordwald', 'Forêt Du Nord', '黒衣森：北部森林'],
  oldGridania:              ['Old Gridania', 'Alt-Gridania', 'Vieille Gridania', 'グリダニア：旧市街'],
  outerLaNoscea:            ['Outer La Noscea', 'Äußeres La Noscea', 'Noscea Extérieure', '地ラノシア'],
  rhalgrsReach:             ['Rhalgr\'s Reach', '', '', ''],
  shirogane:                ['Shirogane', '', '', ''],
  southernThanalan:         ['Southern Thanalan', 'Südliches Thanalan', 'Thanalan Méridional', '南ザナラーン'],
  southShroud:              ['South Shroud', 'Südwald', 'Forêt Du Sud', '黒衣森：南部森林'],
  theAzimSteppe:            ['The Azim Steppe', '', '', ''],
  theChurningMists:         ['The Churning Mists', 'Wallende Nebel', 'L\'Écume Des Cieux De Dravania', 'ドラヴァニア雲海'],
  theDomanEnclave:          ['The Doman Enclave', '', '', ''],
  theDravanianForelands:    ['The Dravanian Forelands', 'Dravanisches Vorland', 'Avant-pays Dravanien', '高地ドラヴァニア'],
  theDravanianHinterlands:  ['The Dravanian Hinterlands', '', '', ''],
  theForgottenKnight:       ['The Forgotten Knight', 'Der Vergessene Ritter', 'Le Chevalier Oublié', '忘れられた騎士亭'],
  theFringes:               ['The Fringes', '', '', ''],
  theGoblet:                ['The Goblet', '', '', ''],
  theGoldSaucer:            ['The Gold Saucer', 'Gold Saucer', 'Gold Saucer', 'ゴールドソーサー'],
  theLochs:                 ['The Lochs', '', '', ''],
  thePeaks:                 ['The Peaks', '', '', ''],
  thePillars:               ['The Pillars', 'Strebewerk', 'Ishgard - Les Contreforts', 'イシュガルド：上層'],
  theRubySea:               ['The Ruby Sea', '', '', ''],
  theSeaOfClouds:           ['The Sea Of Clouds', 'Abalathisches Wolkenmeer', 'L\'Écume Des Cieux D\'Abalathia', 'アバラシア雲海'],
  theWakingSands:           ['The Waking Sands', '', '', ''],
  uldahStepsOfNald:         ['Ul\'dah - Steps of Nald', 'Nald-Kreuzgang', 'Ul\'dah - Faubourg de Nald', 'ウルダハ：ナル回廊'],
  uldahStepsOfThal:         ['Ul\'dah - Steps of Thal', 'Thal-Kreuzgang', 'Ul\'dah - Faubourg De Thal', 'ウルダハ：ザル回廊'],
  upperLaNoscea:            ['Upper La Noscea', 'Oberes La Noscea', 'Haute-Noscea', '高地ラノシア'],
  westernLaNoscea:          ['Western La Noscea', 'Westilches La Noscea', 'Noscea Occidentale', '西ラノシア'],
  westernThanalan:          ['Western Thanalan', '', '', ''],
  wolvesDenPier:            ['Wolves\' Den Pier', '', '', ''],
  yanxia:                   ['Yanxia', '', '', ''],
  duty: {
    sastasha: [
      'Sastasha',
      true,
      true,
      '逆襲要害 サスタシャ浸食洞'
    ],
    sastashaHard: [
      'Sastasha (Hard)',
      'Sastasha (schwer)',
      'Sastasha (brutal)',
      '逆襲要害 サスタシャ浸食洞 (Hard)'
    ],
    tamtara: [
      'The Tam-Tara Deepcroft',
      'Totenacker Tam-Tara',
      'L\'Hypogée De Tam-Tara',
      '惨劇霊殿 タムタラの墓所'
    ],
    tamtaraHard: [
      'The Tam-Tara Deepcroft (Hard)',
      'Totenacker Tam-Tara (schwer)',
      'L\'Hypogée De Tam-Tara (brutal)',
      '惨劇霊殿 タムタラの墓所 (Hard)'
    ],
    copperbellMines: [
      'Copperbell Mines',
      'Kupferglocken-Mine',
      'Les Mines De Clochecuivre',
      '騒乱坑道 カッパーベル銅山'
    ],
    copperbellMinesHard: [
      'Copperbell Mines (Hard)',
      'Kupferglocken-Mine (schwer)',
      'Les Mines De Clochecuivre (brutal)',
      '騒乱坑道 カッパーベル銅山 (Hard)'
    ],
    pharosSirius: [
      'Pharos Sirius',
      true,
      'Le Phare De Sirius',
      '制圧巨塔 シリウス大灯台'
    ],
    pharosSiriusHard: [
      'Pharos Sirius (Hard)',
      'Pharos Sirius (schwer)',
      'Le Phare De Sirius (brutal)',
      '制圧巨塔 シリウス大灯台 (Hard)'
    ],
    theAetherochemicalResearchFacility: [
      'The Aetherochemical Research Facility',
      'Ätherochemisches Forschungslabor',
      'Le Laboratoire De Magismologie',
      '蒼天聖戦 魔科学研究所'
    ],
    theAntitower: [
      'The Antitower',
      'Antiturm',
      'L\'Antitour',
      '星海観測 逆さの塔'
    ],
    theLostCityOfAmdapor: [
      'The Lost City Of Amdapor',
      'Historisches Amdapor',
      'Les Vestiges De La Cité D\'Amdapor',
      '神聖遺跡 古アムダプール市街'
    ],
    theLostCityOfAmdaporHard: [
      'The Lost City Of Amdapor (Hard)',
      'Historisches Amdapor (schwer)',
      'Les Vestiges De La Cité D\'Amdapor (brutal)',
      '神聖遺跡 古アムダプール市街 (Hard)'
    ],
    theLabyrinthOfTheAncients: [
      'The Labyrinth Of The Ancients',
      'Kristallturm - Das Labyrinth Der Alten',
      'La Tour De Cristal - Dédale Antique',
      'クリスタルタワー：古代の民の迷宮'
    ],
    syrcusTower: [
      'Syrcus Tower',
      'Kristallturm - Der Syrcus-Turm',
      'La Tour De Cristal - Tour De Syrcus',
      'クリスタルタワー：シルクスの塔'
    ],
    theWorldOfDarkness: [
      'The World Of Darkness',
      'Die Welt Der Dunkelheit',
      'La Tour De Cristal - Monde Des Ténèbres',
      'クリスタルタワー：闇の世界'
    ],
    domaCastle: [
      'Doma Castle',
      'Burg Doma',
      'Le Château De Doma',
      '解放決戦 ドマ城'
    ],
    theRidoranaLighthouse: [
      'The Ridorana Lighthouse',
      'Richtfeuer Von Ridorana',
      'Le Phare De Ridorana',
      '封じられた聖塔 リドルアナ'
    ],
    theSwallowsCompass: [
      'The Swallow\'s Compass',
      'Kompass Der Schwalbe',
      'Le Compas De L\'Hirondelle',
      '風水霊殿 ガンエン廟'
    ],
  },
  trial: {
    ultimasBane: [
      'The Minstrel\'s Ballad: Ultima\'s Bane',
      'Heldenlied Von Ultima',
      'Le Fléau D\'Ultima',
      '究極幻想 アルテマウェポン破壊作戦'
    ],
    theBowlOfEmbersExtreme: [
      'The Bowl Of Embers (Extreme)',
      'Zenit Der Götter - Ifrit',
      'Le Cratère Des Tisons (extrême)',
      '極イフリート討滅戦'
    ],
    theHowlingEyeExtreme: [
      'The Howling Eye (Extreme)',
      'Zenit Der Götter - Garuda',
      'Hurlœil (extrême)',
      '極ガルーダ討滅戦'
    ],
    theNavelExtreme: [
      'The Navel (Extreme)',
      'Zenit Der Götter - Titan',
      'Le Nombril (extrême)',
      '極タイタン討滅戦'
    ],
    thordansReign: [
      'The Minstrel\'s Ballad: Thordan\'s Reign',
      'Heldenlied Von Thordans Fall',
      'Le Règne De Thordan',
      '蒼天幻想 ナイツ・オブ・ラウンド討滅戦'
    ],
    containmentBayS1T7: [
      'Containment Bay S1T7 (Extreme)',
      'Zenit Der Götter - Sephirot',
      'Unité De Contention S1P7 (extrême)',
      '極魔神セフィロト討滅戦'
    ],
    containmentBayP1T6: [
      'Containment Bay P1T6 (Extreme)',
      'Zenit Der Götter - Sophia',
      'Unité De Contention P1P6 (extrême)',
      '極女神ソフィア討滅戦',
    ],
    containmentBayZ1T9: [
      'Containment Bay Z1T9 (Extreme)',
      'Zenit Der Götter - Zurvan',
      'Unité De Contention Z1P9 (extrême)',
      '極鬼神ズルワーン討滅戦'
    ],
    shinryusDomain: [
      'The Minstrel\'s Ballad: Shinryu\'s Domain',
      'Heldenlied Von Shinryu',
      'Le Domaine De Shinryu',
      '極神龍討滅戦'
    ],
    theJadeStoa: [
      'The Jade Stoa (Extreme)',
      'Seelensturm - Byakko',
      'La Clairière De Jade (extrême)',
      '極白虎征魂戦'
    ],
    tsukuyomisPain: [
      'The Minstrel\'s Ballad: Tsukuyomi\'s Pain',
      'Zenit Der Götter - Tsukuyomi',
      'Castrum Fluminis (extrême)',
      '極ツクヨミ討滅戦'
    ],
    theBindingCoilT5: [],
    theSecondCoilT4: [],
    theSecondCoilT4Savage: [],
    theFinalCoilT3: [],
    theFinalCoilT4: [],
  }
}



const vendorNames = {
  amberTrader:       ['Amber Trader', 'Bernstein-Händlerin', 'Collectionneuse D\'ambre Rare', '稀少琥珀商人'],
  ardolain:          ['Ardolain', true, true, 'アルドラン'],
  auriana:           ['Auriana', true, true, 'オーリアナ'],
  bangoZango:        ['Bango Zango', true, true, 'ブルゲール商会 バンゴ・ザンゴ'],
  bertana:           ['Bertana', true, true, 'ベルタナ'],
  chachamun:         ['Chachamun', true, true, '武具屋 チャチャムン'],
  eUnaKotor:         ['E-Una-Kotor', true, true, 'エ・ウナ・コトロ'],
  frine:             ['Frine', true, true, 'よろず屋 フリヌ'],
  goldSaucerPrize:   ['Gold Saucer Attendant', 'Sonderartikel-Händlerin', 'Préposée Aux Lots', '景品交換窓口'],
  hanekoBurneko:     ['Haneko Burneko', true, true, '雑貨商人 ハネコ・ブンネコ'],
  hismena:           ['Hismena', true, true, 'ヒスメナ'],
  housingMerchant:   ['Housing Merchant', 'Krämer', 'Quincaillier', 'よろず屋'],
  junkmonger:        ['Junkmonger', 'Krämerin', 'Quincaillière', 'よろず屋'],
  maisenta:          ['Maisenta', true, true, '黒兎堂 マイセンタ'],
  merchantMender:    ['Merchant & Mender', 'Krämerin', 'Quincaillière', 'よろず屋'],
  roarich:           ['Roarich', true, true, 'アシュガナ貿易 ロリッヒ'],
  stormSergeant:     ['Storm Sergeant', 'Versorgungsoffizier', 'Sergent Du Maelstrom', '物資支給官'],
  travelingMerchant: ['Traveling Merchant', 'Händlerin', 'Quincaillière', 'よろず屋'],
  tribeAmaljaa:      ['Amalj\'aa Vendor', 'Amalj\'aa-Händler', 'Vendeur Amalj\'aa', 'アマルジャ族のよろず屋'],
  tribeAnanta:       ['Madhura', true, true, 'マドゥラ'],
  tribeIxal:         ['Ixali Vendor', true, true, ''],
  tribeKojin:        ['Shikitahe', true, true, 'シキタヘ'],
  tribeMoogle:       ['Mogmul Mogbelly', 'Mogmul Mogbauch', 'Mogmul', '大食いのモグムリ'],
  tribeSahagin:      ['Sahagin Vendor', true, true, ''],
  tribeSylph:        ['Sylphic Vendor', true, true, ''],
  tribeVanuVanu:     ['Luna Vanu', true, true, '商人のルナバヌ'],
  tribeVath:         ['Vath Stickpeddler', 'Krämer', 'Camelot', 'アキンド'],
}

const vendorMenus = {
  amberExchangeOther:    ['(Amber Exchange (Other))', '()', '()', '（）'],
  exchangeArtifacts:     ['(Exchange Artifacts)', '()', '()', '（）'],
  exchangeCenturioSeals: ['(Exchange Centurio Seals)', '()', '()', '（）'],
  poeticsOther:          ['(Allagan Tomestones Of Poetics (Other))', '(Allagische Steine Der Poesie (Anderes))', '(Mémoquartz Allagois Poétiques (divers))', '（アラガントームストーン:詩学の取引（その他））'],
  prizeExchange1:        ['(Prize Exchange I)', '(Gewinne I)', '(Lots (1))', '（景品の交換（その1））'],
  prizeExchange2:        ['(Prize Exchange II)', '(Gewinne II)', '(Lots (2))', '（景品の交換（その2））'],
  purchaseFurnishings1:  ['(Purchase Furnishing (Garden, Orchestrion))', '()', '()', '（）'],
  purchaseItems:         ['(Purchase Items)', '(Waren)', '(Objets)', '（アイテムの取引）'],
  tribeAmaljaa:          ['(Steel Amalj\'ok Exchange)', '()', '()', '（）'],
  tribeAnanta:           ['(Ananta Dreamstaff Exchange)', '()', '()', '（）'],
  tribeIxal:             ['(Ixali Oaknot Exchange)', '()', '()', '（）'],
  tribeKojin:            ['(Kojin Sango Exchange)', '()', '()', '（）'],
  tribeMoogle:           ['(Carved Kupo Nut Exchange)', '()', '()', '（）'],
  tribeSahagin:          ['(Rainbowtide Psashp Exchange)', '()', '()', '（）'],
  tribeSylph:            ['(Sylphic Goldleaf Exchange)', '()', '()', '（）'],
  tribeVanuVanu:         ['(Vanu Whitebone Exchange)', '()', '()', '（）'],
  tribeVath:             ['(Black Copper Gil Exchange)', '()', '()', '（）'],
  uncannyKnickKnacks:    ['(Uncanny Knick Knacks)', '()', '()', '（）']
}

module.exports = {
  expansions,
  beastTribe,
  beastTribeRanks,
  currency,
  events,
  locales,
  vendorNames,
  vendorMenus
}
