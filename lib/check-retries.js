'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')
const moveRetry = require('./move-retry-to-job')
const isJsonFile = file => file.indexOf('.json') > -1

module.exports = miss.through((chunck, encoding, callback) => {
  const jobs = fs.readdirSync(config.RETRY_DIRECTORY_PATH).filter(isJsonFile)
  logger(['check-retries'])
  if (jobs.length > 0) {
    logger(['check-retries', 'retries found'])
    moveRetry(jobs[0])
      .then((message) => {
        logger(['check-retries', 'finished', message])
        return callback(null, JSON.stringify({}))
      })
      .catch((error) => {
        logger(['check-retries', 'error', JSON.stringify(error)])
        return callback(null, JSON.stringify({}))
      })
  } else {
    logger(['check-retries', 'no retries'])
    return callback(null, JSON.stringify({}))
  }
})
