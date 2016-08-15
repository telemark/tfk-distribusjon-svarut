'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const path = require('path')

module.exports = miss.through(function (chunck, encoding, callback) {
  const item = JSON.parse(chunck)

  if (item.errors.length > 0) {
    const fileName = config.ERROR_DIRECTORY_PATH + '/' + item._id + '.json'
    console.log(item._id + ': save-job-error')
    console.log(item._id + ': save-job-error: Writes ' + item._id + '.json')
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))

    var documents = item.documents || []

    documents.forEach(function (document) {
      console.log(item._id + ': save-job-error. Moves ' + document.document)
      var errorFile = config.ERROR_DIRECTORY_PATH + '/' + path.basename(document.document)
      fs.renameSync(document.document, errorFile)
    })
  } else {
    console.log(item._id + ': save-job-error - no errors found')
  }

  return callback(null, JSON.stringify(item))
})
