# Scripts

Containing scripts to populate the library with data, and then build the complete Faded Copy API.

## `_helpers`

Helpers are reusable functions, to reduce code repetition. These can range from writing out files to returning data in a specific format.

## `fetches`

Any functions that involve making a fetch request to XIVAPI should be kept here. Naming structure uses the prefix `fetch`, followed by the API path as named on XIVAPI. For example `fetchPatchList` related to [XIVAPI's /PatchList](https://xivapi.com/PatchList).

## `process`

Functions used to build and populate Faded Copy API data. This will primarily involve merging the various library data files, combining manually added data, and populating obtain methods for each Orchestrion Roll.
