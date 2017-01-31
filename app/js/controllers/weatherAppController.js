/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

'use strict';

/* Controllers */

angular.module('weatherApp.controllers', ['ngMaterial'])

// Controller for "Weather map" api data search
.controller('WeatherAppCtrl', ['$scope', '$location', '$localStorage', 'weatherFactory',
  function($scope, $location, $localStorage, weatherFactory) {

    $scope.message = '';
    $scope.dataPresent = false;

        // scope variables for UI input
    $scope.location = '';
    $scope.zipcode = '';
    $scope.unitChoice = {
      Farenheit: 'imperial',
      Celcius: 'metric'
    };
    $scope.selectedUnit = $scope.unitChoice.Farenheit;

        // url to show images from openweather api
    $scope.iconBaseUrl = 'http://openWeatherFactory.org/img/w/';

    var requestParams = {};

        // Get forecast data for location as given in $scope.location
    $scope.getForecastByLocation = function() {

      $scope.message = '';

      if (($scope.location === '' || $scope.location === undefined) &&
                ($scope.zipcode === '' || $scope.zipcode === undefined)) {
        $scope.message = 'Please provide either City or Zipcode';
        return;
      }

      if ($scope.location !== '') requestParams.location = $scope.location;
      else if ($scope.zipcode !== '') requestParams.location = $scope.zipcode;
      requestParams.selectedUnit = $scope.selectedUnit;
      requestParams.token = $localStorage.token;

      console.log('**** Before calling Factory method ****');
      weatherFactory.getForecastUsingCity(requestParams)
                .then(
                    function(data) {
                      console.log('Forecast received for location : ' + requestParams.location);
                      $scope.forecast = data;
                      $scope.dataPresent = true;
                    },
                    function(error) {
                      console.log('Failed to retreive forecast');

                      if (error.status === 401) {
                        $location.path('/login');
                      } else {
                        $scope.dataPresent = false;
                        $scope.message = 'Could not retreive forecast';
                      }
                    }
                );
    };
  }
]);
