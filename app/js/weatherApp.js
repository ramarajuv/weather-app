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
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/forecast', { templateUrl: 'partials/forecast.html', controller: 'WeatherAppCtrl' });
  $routeProvider.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginCtrl' });
  $routeProvider.otherwise({ redirectTo: '/login' });

  if (window.history && window.history.pushState) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

}]);
