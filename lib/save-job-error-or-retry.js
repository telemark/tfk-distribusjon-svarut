'use strict'

const fs = require('fs')
const path = require('path')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')
const doRetry = require('./do-retry')

module.exports = miss.through(function (chunck, encoding, callback) {
  const item = JSON.parse(chunck)
  logger(['save-job-error-or-retry', item._id, 'starts'])
  if (item.errors.length > 0) {
    logger(['save-job-error-or-retry', item._id, 'got errors'])
    const directory = doRetry(item.errors) ? config.RETRY_DIRECTORY_PATH : config.ERROR_DIRECTORY_PATH
    logger(['save-job-error-or-retry', item._id, 'directory', directory])
    const fileName = directory + '/' + item._id + '.json'
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))

    let documents = item.documents || []

    documents.forEach(function (document) {
      logger(['save-job-error', item._id, 'moves', document.document])
      let errorFile = directory + '/' + path.basename(document.document)
      fs.renameSync(document.document, errorFile)
    })
  } else {
    logger(['save-job-error-or-retry', item._id, 'finished', 'no errors'])
  }

  return callback(null, JSON.stringify(item))
})
