require('dotenv').config()
const yargs = require('yargs')

const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')

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
    //console.log(JSON.stringify(results, undefined, 2))
    console.log(`Searching for current weather information for ${results.address}...\n`)
    weather.getTemperature(results.latitude, results.longitude, (errorMessage, results) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(`The temperature is currently ${results.temperature} degrees celsius but it feels like ${results.apparantTemperature} degrees celsius`)
      }
    })
  }
})

