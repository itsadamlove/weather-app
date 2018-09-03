const request = require('request')
const BASE_URL = `https://maps.google.com/maps/api/geocode/json?address=`

const geocodeAddress = (address, callback) => {
  let url = BASE_URL + encodeURIComponent(address)

  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      // Machine Errors ie no internet
      callback('Unable to connect to Google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      // Google Api error
      callback('Unable to find that address.')
    } else if (body.status === 'OK'){
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports = {
  geocodeAddress
}
