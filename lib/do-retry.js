'use strict'

function doRetry (error) {
  let result = false
  if (/ENOTFOUND/.test(error)) {
    result = true
  } else if (/503 Service unavailable/.test(error)) {
    result = true
  }

  return result
}

module.exports = (errors) => {
  const retries = errors.filter(doRetry)

  return retries.length > 0
}
