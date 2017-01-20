'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  logger(['save-job-done', 'starts', item._id])
  if (item.errors.length === 0) {
    const fileName = config.DONE_DIRECTORY_PATH + '/' + item._id + '.json'
    logger(['save-job-done', 'no errors', item._id])
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  } else {
    logger(['save-job-done', 'errors', item._id, 'skipped'])
  }

  return callback(null, JSON.stringify(item))
})
