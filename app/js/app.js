/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

'use strict';

// Declare app level module which depends on filters, and services
angular.module('weatherApp', [
  'ngRoute',
  'ngStorage',
  'weatherApp.filters',
  'iso-3166-country-codes',
  'weatherApp.services',
  'weatherApp.directives',
  'weatherApp.controllers'
]);
