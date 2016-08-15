'use strict'

const miss = require('mississippi')
const config = require('../config')

module.exports = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var svarUt = {}
  const options = {
    config: {
      url: 'https://' + config.SVARUT_USERNAME + ':' + config.SVARUT_PASSWORD + '@' + config.SVARUT_URL,
      action: 'http://www.ks.no/svarut/services/ForsendelsesServiceV4/sendForsendelse'
    },
    tittel: item.svarUtTitle,
    dokumenter: item.documents,
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

  svarUt.options = options

  item.svarUt = svarUt

  console.log(item._id + ': setup-svar-ut')

  return callback(null, JSON.stringify(item))
})
