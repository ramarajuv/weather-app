/* eslint-disable linebreak-style */
/**
 * Authentication Router module.
 * @author Rama Raju Vatsavai <rrv.atwork@gmail.com>
 * @module routes/authRoute
 */

var jwt = require('jsonwebtoken');
var config = require('./authConfig');

/** The Router class from restify-router module */
var Router = require('restify-router').Router;

/** An instance of Router class */
var router = new Router();

/** On a GET request for /auth/users, return the list of users */
router.get('/auth/users', handleGetUsers);

/** On a POST request for /auth/login, validate the user credentials and generate a token */
router.post('/auth/login', handleLogin);

/**
* Handler function for the GET request
* @function handleGetUsers
* @param {Object} req the http request
* @param {Object} res the http response
* @param {Object} next the chain handler for routes
*/
function handleGetUsers(req, res, next) {
  res.send(config.users);
  next();
}

/**
 * Handler function for the POST request to handle user validation and Authentication
 * @function handleLogin
 * @param {Object} req the http request
 * @param {Object} res the http response
 * @param {Object} next the chain handler for routes
 */
function handleLogin(req, res, next) {
  if (req.body != null && req.body.username != null) {

    var username = req.body.username;
    var password = req.body.password;
    var userObj = config.users[username];
    console.log('userObj ', userObj);

    if (userObj != null && password === userObj.password) {
      var profile = {
        username: username,
        password: password
      };

            // If username and passowrd match, then proceed with token generation and respond
      var token = jwt.sign(profile, config.secret, { expiresIn: 60 * 60 });
      res.send({
        result: true,
        message: 'Authentication Successful',
        status: 200,
        token: token
      });
    } else {
      res.send({
        result: false,
        message: 'Authentication Failed',
        status: 401,
        token: null
      });
    }
  }
  next();
}

/** Export the Router instance */
module.exports = router;
