
/**
 * Weather Router module.
 * @author Rama Raju Vatsavai <rrv.atwork@gmail.com>
 * @module routes/weatherRoute
 */

var request = require('request');
var jwt = require('jsonwebtoken');

var config = require('./authConfig');

/** The Router class from restify-router module */
var Router = require('restify-router').Router;

/** An instance of Router class */
var router = new Router();

/** Verify the user first */
router.use(verifyUser);

/** Handler function to ensure user is authenticated */
function verifyUser(req, res, next) {
  console.log(req.headers);
  var token = req.headers.authorization || req.headers['x-access-token'] || (req.body && req.body.token) || (req.query && req.query.token);
  console.log(token);

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
                // if authentication failed, user should not proceed forward
        return res.send(401, { success: false, message: 'Failed to authenticate token.' });
      } else {
                // if everything is good, proceed to actual route
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
        // if no token, then the user should not procced forward
    return res.send(401, { success: false, message: 'User is not authenticated yet' });
  }

  next();
}

/** On a GET request for /api/getForecastDetailsWithCity/:location/:units/:apiKey, forward the request to handler */
router.get('/api/getForecastDetailsWithCity/:location/:units/:apiKey', handleGetForecastDetailsWithCity);

/**
* Handler function for the GET request
* @function handleGetForecastDetailsWithCity
*/
function handleGetForecastDetailsWithCity(req, res, next) {

  var data = {
    location: req.params.location,
    units: req.params.units,
    apiKey: req.params.apiKey
  };

  getForecastDetailsWithCity(data, res);

  next();
}

/**
* Function to call the openweathermap API and get forecast
* @function getForecastDetailsWithCity
* @param {Object} requestParams The request parameters as an object of location, units and apiKey
* @param {Object} respond The response object for the HTTP method. respond.send() would return to client
*/
function getForecastDetailsWithCity(requestParams, respond) {

  var weatherAPIResponse = '';

  console.log('requestParams --- ', requestParams);
  var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + requestParams.location + '&units=' + requestParams.units + '&APPID=' + requestParams.apiKey;
    //    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=2222222222&units=' + requestParams.units + '&APPID=' + requestParams.apiKey;

  console.log(url);


  request({
    method: 'GET',
    url: url,
  }, function (error, response) {
    if (error) {
      console.log('Error on openweather api call: ', error);
      respond.send(500, 'Error occurred while retrieving data from openweathermap api');
    }
    else {
      var body = response.body;
      var weatherAPIResponse = JSON.parse(body);

      if (response.statusCode == 500 || response.statusCode == 404 || response.statusCode == 502) {
        var errorMsg = {};
        errorMsg.message = weatherAPIResponse.message;
        console.log('------- response message', errorMsg);
        respond.send(500, errorMsg);
      }
      else if (response.statusCode !== 200) {
        log.error('Did not receive 200, body = ', response.body);
        respond.send(weatherAPIResponse);
      }
      else {
        respond.send(weatherAPIResponse);
      }
    }
  });

}

/** Print errors to console */
function printError(error) {
  console.error(error.message);
}

/** Export the Router instance */
module.exports = router;
