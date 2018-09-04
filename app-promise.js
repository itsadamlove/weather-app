require('dotenv').config()
const yargs = require('yargs')
const axios = require('axios')

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


const BASE_URL = `https://maps.google.com/maps/api/geocode/json?address=`
const geocodeUrl = BASE_URL + encodeURIComponent(argv.address)

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }
    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}`
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherURL)
  })
  .then((response) => {
    const temperature = fahrenheitToCelsius(response.data.currently.temperature)
    const apparentTemperature = fahrenheitToCelsius(response.data.currently.apparentTemperature)
    console.log(`The temperature is currently ${temperature} degrees celsius but it feels like ${apparentTemperature} degrees celsius`)
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log(`Unable to connect to api servers.`)
    } else {
      console.log(e.message)
    }
  })

const fahrenheitToCelsius = (f) => {
  return ((f-32)*(5/9)).toFixed(2)
}
