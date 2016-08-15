'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')
const isJsonFile = file => file.indexOf('.json') > -1

module.exports = miss.through((chunck, encoding, callback) => {
  const jobs = fs.readdirSync(config.JOB_DIRECTORY_PATH).filter(isJsonFile)
  var item

  if (jobs.length > 0) {
    console.log('get-next-job')
    item = fs.readFileSync(config.JOB_DIRECTORY_PATH + '/' + jobs[0])
    return callback(null, item.toString())
  } else {
    console.log('No jobs in queue')
    process.exit(0)
  }
})
