'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../config')
const logger = require('./logger')

module.exports = (filename) => {
  return new Promise((resolve, reject) => {
    const retryFilePath = `${config.RETRY_DIRECTORY_PATH}/${filename}`
    const item = JSON.parse(fs.readFileSync(retryFilePath, 'utf-8'))
    const jobFilePath = `${config.JOB_DIRECTORY_PATH}/${filename}`
    logger(['move-retry-to-job', 'starts', item._id])
    fs.renameSync(retryFilePath, jobFilePath)

    let documents = item.documents || []

    documents.forEach(function (document) {
      logger(['move-retry-to-job', item._id, 'moves document', document.document])
      let retryDocument = config.RETRY_DIRECTORY_PATH + '/' + path.basename(document.document)
      fs.renameSync(retryDocument, document.document)
    })

    logger(['move-retry-to-job', 'finished', item._id])

    resolve(`File ${filename} moved to jobs`)
  })
}
