'use strict';

// Declare app level module which depends on filters, and services
angular.module('weatherApp', [
  'ngRoute',
  'weatherApp.filters',
  'iso-3166-country-codes',
  'weatherApp.services',
  'weatherApp.directives',
  'weatherApp.controllers'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/forecast', { templateUrl: 'partials/forecast.html', controller: 'WeatherAppCtrl' });
  $routeProvider.otherwise({ redirectTo: '/forecast' });
}]);
