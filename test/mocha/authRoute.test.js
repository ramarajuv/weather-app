/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

var supertest = require('supertest');
var should = require('should');

// This agent refers to PORT where program is runninng.
var server = supertest.agent('http://localhost:8000');

// UNIT test begin
describe('Unit tests for auth module begin here', function() {

  // #1 should return home page for root context
  it('should return home page', function(done) {

    // calling root context
    server
    .get('/')
    .expect('Content-type', /text\/html/)
    .expect(200)
    .end(function(err, res) {
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

  // #2 authenticate the user
  it('should fail user authentication', function(done) {

    server
    .post('/auth/login')
    .send({ username: 'rama', password: 'bama' })
    .expect('Content-type', /json/)
    .expect(200)
    .end(function(err, res) {
      // If error, fail and throw it
      if (err != null) {
        throw done(err);
      } else {
        /* Response body should have a 401 status code
           and the jsonwebtoken should be null */
        res.body.status.should.equal(401);
        should.exist(res.body.token);
      }
      done();
    });
  });

  // #3 authenticate the user
  it('should pass user authentication', function(done) {

    server
    .post('/auth/login')
    .send({ username: 'rama', password: 'rama' })
    .expect('Content-type', /json/)
    .expect(200)
    .end(function(err, res) {
      // If error, fail and throw it
      if (err != null) {
        throw done(err);
      } else {
        /* Response body should have a 200 status code
           and the jsonwebtoken should not be null */
        should.not.exist(res.body.error);
        res.body.status.should.equal(200);
        should.exist(res.body.token);
      }
      done();
    });
  });

});
