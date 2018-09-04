require('dotenv').config()
const geocode = require('./geocode/geocode.js')
const yargs = require('yargs')
const request = require('request')

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(results, undefined, 2))
    let lat = results.latitude
    let long = results.longitude
    getTemperature(lat, long)
  }
})

const getTemperature = (lat, long) => {
  const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${long}`
  request({
    url: weatherURL,
    json: true
  }, (error, response, body) => {
    if (error) {
      // Machine Errors ie no internet
      console.log('Unable to connect to Dark Sky servers.')
    } else {
      console.log(`The Temperature is ${body.currently.temperature}`)
    }
  })

}

