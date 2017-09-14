'use strict'

const miss = require('mississippi')

const fromString = string => {
  return miss.from(function (size, next) {
    // if there's no more content
    // left in the string, close the stream.
    if (string.length <= 0) return next(null, null)

    // Pull in a new chunk of text,
    // removing it from the string.
    var chunk = string.slice(0, size)
    string = string.slice(size)

    // Emit "chunk" from the stream.
    next(null, chunk)
  })
}

module.exports = (item, callback) => {
  const checkRetries = require('./lib/check-retries')
  const getNextJob = require('./lib/get-next-job')
  const saveJobDone = require('./lib/save-job-done')
  const saveJobErrorOrRetry = require('./lib/save-job-error-or-retry')
  const cleanupJob = require('./lib/cleanup-job')
  const cleanupDocuments = require('./lib/cleanup-documents')
  const sendStatusMessage = require('./lib/send-status-message')
  const sendDocumentsToSvarUt = require('./lib/send-documents-to-svar-ut')
  const setupItem = require('./lib/setup-item')
  const setupSvarut = require('./lib/setup-svar-ut')
  const start = fromString(JSON.stringify(item))

  const finished = error => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, {message: 'success'})
    }
  }

  miss.pipe(
    start,
    checkRetries,
    getNextJob,
    setupItem,
    setupSvarut,
    sendDocumentsToSvarUt,
    saveJobDone,
    saveJobErrorOrRetry,
    cleanupJob,
    cleanupDocuments,
    sendStatusMessage,
    finished
  )
}
