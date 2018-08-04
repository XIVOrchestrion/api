/**
 * FadedCopyAPI is a tool to populate the Faded Copy website.
 *
 * @author Liam Morgan <lite@getignited.co.uk> (https://github.com/getignited)
 * @copyright © 2018 Liam Morgan
 */

const fs = require('fs')
const path = require('path')

const fetchCurrency = require('./fetches/fetchCurrency')
const fetchInstanceContent = require('./fetches/fetchInstanceContent')
const fetchOrchestrion = require('./fetches/fetchOrchestrion')
const fetchPatchList = require('./fetches/fetchPatchList')

const processOrchestrion = require('./process/processOrchestrion')


global.appRoot = path.resolve(__dirname)


const api = async function(args) {

  const fetchPatchData = () => new Promise((resolve, reject) => fetchPatchList.fetch(resolve))
  const fetchInstanceData = () => new Promise((resolve, reject) => fetchInstanceContent.fetch(resolve))
  const fetchOrchestrionData = () => new Promise((resolve, reject) => fetchOrchestrion.fetch(resolve))

  console.clear()
  await fetchPatchData()
    .then(() => fetchInstanceData())
    .then(() => fetchOrchestrionData())
    .then(res => processOrchestrion(res))
  //   return fs.readFileSync('../library/fetchOrchestrion.json')
  // })
  //   .then(res => console.log(JSON.parse(res) ))
}

api(process.argv.slice(2))
