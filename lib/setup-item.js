'use strict'

const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)

  item.errors = []
  item.CALLBACK_STATUS_MESSAGE = config.CALLBACK_STATUS_MESSAGE

  logger(['setup-item', item._id])

  return callback(null, JSON.stringify(item))
})
