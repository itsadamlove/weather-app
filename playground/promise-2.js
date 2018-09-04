const request = require('request')
const BASE_URL = `https://maps.google.com/maps/api/geocode/json?address=`

let geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    let url = BASE_URL + encodeURIComponent(address)

    request({
      url: url,
      json: true
    }, (error, response, body) => {
      if (error) {
        // Machine Errors ie no internet
        reject('Unable to connect to Google servers.')
      } else if (body.status === 'ZERO_RESULTS') {
        // Google Api error
        reject('Unable to find that address.')
      } else if (body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })

  })
}

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage)
})
