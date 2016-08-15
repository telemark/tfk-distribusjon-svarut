'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)

  if (item.errors.length === 0) {
    const fileName = config.DONE_DIRECTORY_PATH + '/' + item._id + '.json'
    console.log(item._id + ': save-job-done')
    fs.writeFileSync(fileName, JSON.stringify(item, null, 2))
  } else {
    console.log(item._id + ': errors in file. save-job-done skipped')
  }

  return callback(null, JSON.stringify(item))
})
