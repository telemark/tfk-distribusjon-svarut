'use strict'

const miss = require('mississippi')
const Wreck = require('wreck')
const generateToken = require('tfk-generate-jwt')
const config = require('../config')
const token = generateToken({key: config.JWT_KEY, payload: {system: 'tfk-distribusjon-svarut'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  if (item.CALLBACK_STATUS_URL) {
    console.log(item._id + ': send-status-message')
    wreckOptions.payload = JSON.stringify({status: item.CALLBACK_STATUS_MESSAGE})
    Wreck.post(item.CALLBACK_STATUS_URL, wreckOptions, function (error, response, payload) {
      if (error) {
        return callback(error, null)
      } else {
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    console.log(item._id + ': send-status-message No message to send')
    return callback(null, JSON.stringify(item))
  }
})
