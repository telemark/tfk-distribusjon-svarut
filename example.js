'use strict'

const svarUt = require('./index')

svarUt({}, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(JSON.stringify(message))
  }
})
