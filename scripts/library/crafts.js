const { destLibra, destLibraRecipe } = require ('../_consts')
const libraryFile = require('../helpers/libraryFile')
const recursiveFetch = require('../helpers/recursiveFetch')


module.exports = new libraryFile ('Crafting Recipe', 'Crafting Recipes', {
  dest: destLibra,
  fileName: 'craftRecipes',
  file: {
    url: 'Recipe',
    columns: [
      'ID',
      'ItemResult.ItemAction.Type',
    ],
  },
  list: true,
  useCallback: true,
}, (data, args, resolve) => {
  const filtered = data.filter(entry => entry['ItemResult.ItemAction.Type'] === 5845)

  recursiveFetch(filtered, 'Crafting Recipe', (entry, all) => {
    return {
      dest: destLibraRecipe,
      fileName: entry.ID,
      file: {
        url: `Recipe/${entry.ID}`,
      },
      format: (data, args) => data,
    }
  }, resolve)
})
