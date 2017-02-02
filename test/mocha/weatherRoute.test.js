/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

var supertest = require('supertest');
var should = require('should');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:8000');

// UNIT test begin
describe('Unit tests for weather module begin here', function () {

  // #1 should return home page for root context
  it('should return home page', function (done) {
    // calling root context
    server
    .get('/')
    .expect('Content-type', /text\/html/)
    .expect(200)
    .end(function (err, res) {
        // If error, fail and throw it
      if (err != null) {
        throw done(err);
      } else {
            // Error key should not exist in response
        should.not.exist(res.body.error);
        res.status.should.equal(200);
      }
      done();
    });
  });

  var authToken;
  // #2 get auth token if user is authenticated
  it('should retrieve token if user is authenticated', function (done) {
    // login the user
    server
    .post('/auth/login')
    .send({ username: 'rama', password: 'rama' })
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (authError, authResponse) {
        // If error, fail and throw it
      if (authError != null) {
        throw done(authError);
      } else {
        authResponse.body.status.should.equal(200);
        should.exist(authResponse.body.token);
        authToken = authResponse.body.token;
        done();
      }
    });
  });

  // #3 retrieve weather if user is authenticated
  it('should pass weather retrieval if user is authenticated', function (done) {
    // Get weather
    server
    .get('/api/getForecastDetailsWithCity/85308/imperial/279b4be6d54c8bf6ea9b12275a567156')
    .send({})
    .set('Authorization', authToken)
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (weatherErr, weatherRes) {
        // If error, fail and throw it
      if (weatherErr != null) {
        throw done(weatherErr);
      } else {
        weatherRes.status.should.equal(200);
        should.exist(weatherRes.body.city);
        done();
      }
    });
  });

  it('should fail weather retrieval if location does not exist', function (done) {
    // Get weather for invalid location
    server
    .get('/api/getForecastDetailsWithCity/855008855/imperial/279b4be6d54c8bf6ea9b12275a567156')
    .send({})
    .set('Authorization', authToken)
    // .set('Content-type', 'json')
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (weatherErr, weatherRes) {
        // If error, fail and throw it
      if (weatherErr != null) {
        throw done(weatherErr);
      } else {
        weatherRes.statusCode.should.equal(404);
        done();
      }
    });
  });

  it('should fail weather retrieval if user is not authenticated', function (done) {
    // Get weather without authentication
    server
    .get('/api/getForecastDetailsWithCity/85308/imperial/279b4be6d54c8bf6ea9b12275a567156')
    .send({})
    .set('Authorization', null)
    .expect('Content-type', /json/)
    .expect(200)
    .end(function (weatherErr, weatherRes) {
        // If error, fail and throw it
      if (weatherErr != null) {
        throw done(weatherErr);
      } else {
        weatherRes.statusCode.should.equal(200);
        should.exist(weatherRes.body.city);
        done();
      }
    });
  });

});
