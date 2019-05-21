'use strict'

const miss = require('mississippi')
const svarUt = require('svarut')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  let item = JSON.parse(chunck)
  const options = JSON.parse(JSON.stringify(item.svarUt.options))
  logger(['send-documents-to-svar-ut', item._id, 'starts'])
  svarUt.sendForsendelse(options)
    .then(id => {
      item.svarUt.response = id
      logger(['send-documents-to-svar-ut', item._id, 'finished', JSON.stringify(id)])
      return callback(null, JSON.stringify(item))
    }).catch(error => {
      console.log(error)
      logger(['send-documents-to-svar-ut', item._id, 'error', JSON.stringify(error)])
      item.errors.push(JSON.stringify(error))
      return callback(null, JSON.stringify(item))
    })
})
