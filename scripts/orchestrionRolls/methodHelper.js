const fs = require('fs')
const populateName = require('../helpers/populateName')


const helper = {
  purchase: (data, methodData) => {
    /**
     * Return an Object for purchase data
     *
     * @returns {Object} - 'Purchase', Currency, Cost, NPC Name, NPC Location
     */

    const npc = JSON.parse(fs.readFileSync(`./library/npcs/${methodData.npc}.json`, 'utf8'))
    const shop = JSON.parse(fs.readFileSync(`./library/shops/${methodData.id}.json`, 'utf8'))

    const npcDetails = {
      name: populateName(npc.Name_en, npc.Name_de, npc.Name_fr, npc.Name_ja),
      location: {
        x: '',
        y: '',
      },
    }

    const shopDetails = {
      currency: {},
      cost: ''
    }
    if (shop.Url.includes('GilShop') ) {
      shopDetails.cost = data.PriceMid
      shopDetails.currency = populateName('Gil', true, true, 'ギル')

    } else {
      Object.keys(shop).forEach(key => {
        if (!key.includes('ItemReceive'))
          return

        const vals = Object.values(shop[key])
        if (!vals.includes(data.ID))
          return

        const itemKey = key.replace('ItemReceive', '')
        const countCost = `CountCost${itemKey}`
        const itemCost = `ItemCost${itemKey}`

        shopDetails.cost = shop[countCost]
        shopDetails.currency = populateName(
          shop[itemCost].Plural_en,
          shop[itemCost].Plural_de,
          shop[itemCost].Plural_fr,
          shop[itemCost].Plural_ja || shop[itemCost].Name_ja
        )

        return
      })
    }

    const res = Object.assign({type: 'purchase'}, npcDetails, shopDetails)
    return res
  },
  quest: (data, methodData) => {
    /**
     * Return an Object for quest data
     *
     * @returns {Object} - 'Quest', Quest Name, Quest Level, Issuer Name, Issuer Location
     */
    const quest = JSON.parse(fs.readFileSync(`./library/quest/${methodData.id}.json`, 'utf8'))

    const res = {
      type: 'quest',
      npc: {
        name: populateName(
          quest.ENpcResidentStart.Name_en,
          quest.ENpcResidentStart.Name_de,
          quest.ENpcResidentStart.Name_fr,
          quest.ENpcResidentStart.Name_ja
        ),
        location: {
          x: '',
          y: '',
        }
      },
      level: quest.ClassJobLevel0,
      name: populateName(quest.Name_en, quest.Name_de, quest.Name_fr, quest.Name_ja)
    }

    return res
  }
}

module.exports = helper
