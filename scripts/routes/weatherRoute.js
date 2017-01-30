/* eslint-disable no-console */

/**
 * Weather Router module.
 * @author Rama Raju Vatsavai <rrv.atwork@gmail.com>
 * @module routes/weatherRoute
 */

var restify = require('restify');
var request = require('request');
var jwt = require("jsonwebtoken");

var config = require('./authConfig');

var getWeather = require('../lib/getWeather');

/** The Router class from restify-router module */
var Router = require('restify-router').Router;

/** An instance of Router class */
var router = new Router();

var jsFilename = 'weatherRouter: ';

/** Verify the user first */
router.use(verifyUser);

/** Handler function to ensure user is authenticated */
function verifyUser(req, res, next) {
    console.log(req.headers);
    var token = req.headers.authorization || req.headers['x-access-token'] || (req.body && req.body.token) || (req.query && req.query.token);
    console.log(token);

    if (token) {
      jwt.verify(token, config.secret, function (errVerifyToken, decoded) {
        if (errVerifyToken) {
          console.log('errVerifyToken = ', errVerifyToken);
          // if authentication failed, user should not proceed forward
          return res.send(new restify);
        } else {
          // if everything is good, proceed to actual route
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return next(new restify.UnauthorizedError());
    }

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

  if (!req.params.location) return next(new restify.ConflictError('location required'));
  if (!req.params.units) return next(new restify.ConflictError('units required'));
  if (!req.params.apiKey) return next(new restify.ConflictError('apiKey required'));

  getWeather.getForecastDetailsWithCity(data, function(errGetForecast, forecast) {
    if (errGetForecast) {
      if (errGetForecast === 404) {
        return next(new restify.NotFoundError());
      }

      console.log(jsFilename + 'errGetForecast ', errGetForecast);
      return next(new restify.InternalServerError());
    }

    res.send(200, forecast);
    return next();
  });
}


/** Print errors to console */
function printError(error) {
    console.error(error.message);
}

/** Export the Router instance */
module.exports = router;
