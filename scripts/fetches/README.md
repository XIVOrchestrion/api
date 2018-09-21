# Libra process

Scripts used to populate the FadedCopyAPI Library with up to date information.

- Fetch latest `PatchList` data. Check if recently updated or not.
- - Run `orchestrionRolls` script to search for and pull down all Orchestrion Rolls.
- - Scrape the Orchestrion Rolls data to get `GilShops`, `SpecialShops`, `Achievements`, `Recipes`, and `Quests`
- - Map this data, creating a link for each song.
- - Fetch `Achievements`, using the provided list of `Achievement IDs`.
- - Fetch `Quests`, using the provided list of `Quest IDs`.
- - Fetch `Recipes`, using the provided list of `Recipe IDs`, and assign IDs for *Faded Copy* materials to the data map.
- - Fetch *Faded Copy* data using IDs obtained from `Recipes`, and check for relevant `GilShops` or `SpecialShops` data.
- - Fetch `GilShops`, using the provided list of `GilShop IDs`, and assign IDs for related *NPCs* to the data map.
- - Fetch `SpecialShops` using the provided list of `SpecialShop IDs`, and assign IDs for related *NPCs* to the data map.
- - Import manual data for *NPCs* related to `GilShops` and `SpecialShops`.
- - Fetch `ENpcResident` data, using newly mapped *NPC* data, and assign to correct locations.
- - Fetch other data, e.g `Instances`.
- Begin building out manual links for the data map. This information is all manually entered, and assigned to the correct location.



```
14257: {
  [
    id: 14289,
    mapId: 'faded',
    type: 'fadedRaid',
    recipe: 31521,
    instance: 30001,
  ],
  [
    mapId: 'recipe',
    type: 'recipe',
    id: 31521,
    materials: [ 14289, ]
  ]
}
```

Manual link example:

```
14257: { type: 'fadedRaid', fadedId: 14289, instance: 30001, }
```

This will look for song `14257`, and check each contained Method Map for `mapId === 'faded' && type === this.type && id === this.fadedId` to ensure it is placed in the correct location.
