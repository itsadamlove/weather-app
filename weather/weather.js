const request = require('request')

const getTemperature = (lat, lng, callback) => {
  const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}`
  request({
    url: weatherURL,
    json: true
  }, (error, response, body) => {
    if (error) {
      // Machine Errors ie no internet
      callback('Unable to connect to Dark Sky servers.')
    } else if (response.statusCode === 400) {
      callback(body.error)
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: fahrenheitToCelsius(body.currently.temperature),
        apparantTemperature: fahrenheitToCelsius(body.currently.apparentTemperature)
      })
    }
  })
}

const fahrenheitToCelsius = (f) => {
  return ((f-32)*(5/9)).toFixed(2)
}

module.exports = {
  getTemperature
}
