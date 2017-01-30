/* eslint-disable no-console */

var request = require('request');
var jsFilename = 'getWeather: ';

/**
 * GetWeather library
 * @constructor
 */
function GetWeather() {

}

/**
 * Function to call the openweathermap API and get forecast
 * @param  {Object} data          The data
 * @param  {string} data.location The location
 * @param  {string} data.units    The data
 * @param  {string} data.apiKey   The data
 * @param  {Function} cbGetForecast The callback
 * @return {Function}               Returns the callback
 */
GetWeather.prototype.getForecastDetailsWithCity = function(data, cbGetForecast) {
  var msgHdr = jsFilename + 'getForecastDetailsWithCity: ';

  console.log(msgHdr + 'data = ', data);
  var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + data.location + '&units=' + data.units + '&APPID=' + data.apiKey;
  //  var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=2222222222&units=' + requestParams.units + '&APPID=' + requestParams.apiKey;

  console.log(msgHdr + 'url = ', url);

  request({
    method: 'GET',
    url: url,
  }, function (errGetWeather, resGetWeather, bodyGetWeather) {
    if (errGetWeather) {
      console.log(msgHdr + 'errGetWeather: ', errGetWeather);
      return cbGetForecast(errGetWeather);
    }

    var weatherAPIResponse = '';

    try {
      weatherAPIResponse = JSON.parse(bodyGetWeather);
    } catch (errParseWeather) {
      console.log(msgHdr + 'errParseWeather = ', errParseWeather);
      return cbGetForecast(errParseWeather);
    }

    if (resGetWeather.statusCode === 404 || resGetWeather.statusCode === 502) {
      console.log(msgHdr + 'no result found = ', bodyGetWeather);
      return cbGetForecast(404);
    }

    if (resGetWeather.statusCode === 500) {
      console.log(msgHdr + 'possible error statusCode = ', resGetWeather.statusCode);
      return cbGetForecast(new Error(weatherAPIResponse.message));
    }

    if (resGetWeather.statusCode !== 200) { // catch all
      console.log(msgHdr + 'did not receive 200', bodyGetWeather);
      return cbGetForecast(new Error('did not receive 200'));
    }

    return cbGetForecast(null, weatherAPIResponse);
  });
};

module.exports = new GetWeather();
