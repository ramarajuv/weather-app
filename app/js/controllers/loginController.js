'use strict';

/* Controllers */

angular.module('weatherApp.controllers')

// Controller to handle Login
.controller('LoginCtrl', ['$scope', '$location', '$localStorage', 'weatherFactory',
  function($scope, $location, $localStorage, weatherFactory) {

    $scope.message = '';
    $scope.loginData = {
      username: '',
      password: ''
    };

        // Get forecast data for location as given in $scope.location
    $scope.submitLogin = function() {

      $scope.message = '';

      if ($scope.loginData.username === '' || $scope.loginData.password === '') {
        $scope.message = 'Please provide login information';
        return;
      }

      console.log('**** Before calling Factory method for Login****');

      weatherFactory.authUser($scope.loginData)
                .then(
                    function(data) {
                      console.log('Login authenticated', data);
                      $localStorage.token = data.token;
                      $location.path('forecast');
                    },
                    function() {
                      console.log('Login failed');
                      $scope.message = 'Login failed due to incorrect username/password. Please correct and retry.';
                    }
                );
    };

    $scope.submitLogout = function() {
      console.log('---------- User Logged Out ---------------');
      $localStorage.token = null;
      $location.path('login');
    };
  }
]);
