/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

'use strict';

// Declare app level module which depends on filters, and services
angular.module('weatherApp')
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/forecast', { templateUrl: 'partials/forecast.html', controller: 'WeatherAppCtrl' });
  $routeProvider.when('/login', { template: '<login></login>' });
  $routeProvider.otherwise({ redirectTo: '/login' });

  if (window.history && window.history.pushState) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

}]);
