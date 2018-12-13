'use strict'

const miss = require('mississippi')
const Wreck = require('wreck')
const generateToken = require('tfk-generate-jwt')
const config = require('../config')
const logger = require('./logger')
const token = generateToken({ key: config.JWT_KEY, payload: { system: 'tfk-distribusjon-svarut' } })
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = miss.through(function (chunck, encoding, callback) {
  let item = JSON.parse(chunck)
  logger(['send-status-message', item._id, 'starts'])
  if (item.CALLBACK_STATUS_URL) {
    logger(['send-status-message', item._id, 'sending message'])
    wreckOptions.payload = JSON.stringify({ status: item.CALLBACK_STATUS_MESSAGE })
    Wreck.post(item.CALLBACK_STATUS_URL, wreckOptions, function (error, response, payload) {
      if (error) {
        return callback(error, null)
      } else {
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    logger(['send-status-message', item._id, 'no message to send'])
    return callback(null, JSON.stringify(item))
  }
})
