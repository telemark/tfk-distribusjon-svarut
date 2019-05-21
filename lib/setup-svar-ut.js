'use strict'

const miss = require('mississippi')
const config = require('../config')
const logger = require('./logger')
const readFileSync = require('fs').readFileSync
const basename = require('path').basename

module.exports = miss.through(function (chunck, encoding, callback) {
  let item = JSON.parse(chunck)
  let svarUt = {}
  const options = {
    config: {
      url: 'https://' + config.SVARUT_USERNAME + ':' + config.SVARUT_PASSWORD + '@' + config.SVARUT_URL,
      action: 'http://www.ks.no/svarut/services/ForsendelsesServiceV4/sendForsendelse'
    },
    query: {
      tittel: item.svarUtTitle,
      dokumenter: item.documents.map(document => {
        return {
          filnavn: basename(document.document),
          data: readFileSync(document.document).toString('base64'),
          mimetype: 'application/pdf'
        }
      }),
      forsendelse: {
        avgivendeSystem: config.SVARUT_AVGIVENDE_SYSTEM,
        konteringskode: config.SVARUT_KONTERINGSKODE,
        krevNiva4Innlogging: false,
        kryptert: false,
        kunDigitalLevering: false
      },
      mottaker: item.recipients,
      printkonfigurasjon: {
        brevtype: 'BPOST',
        fargePrint: true,
        tosidig: true
      }
    }
  }

  svarUt.options = options

  item.svarUt = svarUt

  logger(['setup-svarut', item._id])

  return callback(null, JSON.stringify(item))
})
