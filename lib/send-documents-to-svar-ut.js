'use strict'

const miss = require('mississippi')
const svarUt = require('svarut')

module.exports = miss.through((chunck, encoding, callback) => {
  var item = JSON.parse(chunck)
  const options = JSON.parse(JSON.stringify(item.svarUt.options))
  console.log(item._id + ': send documents to svarut')
  svarUt(options, (error, id) => {
    if (error) {
      item.errors.push(JSON.stringify(error))
    } else {
      item.svarUt.response = id
      console.log(item._id + ': svarut id returned - ' + JSON.stringify(id))
    }
    return callback(null, JSON.stringify(item))
  })
})
