'use strict'

const fs = require('fs')
const miss = require('mississippi')
const logger = require('./logger')

module.exports = miss.through((chunck, encoding, callback) => {
  const item = JSON.parse(chunck)
  const documents = item.documents || []
  logger(['cleanup-documents', 'start', item._id])
  if (item.errors.length === 0 && documents.length > 0) {
    documents.forEach(function (document) {
      logger(['cleanup-documents', 'document removed', document.filsti])
      fs.unlinkSync(document.filsti)
    })
  }

  logger(['cleanup-documents', 'finished', item._id])
  return callback(null, JSON.stringify(item))
})
