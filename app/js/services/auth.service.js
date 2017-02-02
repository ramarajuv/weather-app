/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

(function () {
  'use strict';

  angular.module('weatherApp.services', ['ngResource'])
    .factory('authService', function ($q, $resource, $localStorage, $location) {

      console.log('no matter how many times Im injected, Im a singleton');

      var service = {
        login: login,
        logout: logout,
      };

      return service;

      function logout() {
        $localStorage.token = null;
        $location.path('login');
      }

      function login(requestParam) {
        console.log('***** Inside Factory method authUser ****');

        var apiBaseUrl = '/auth/login';

        var deferred = $q.defer();
        var resource = $resource(apiBaseUrl);

        console.log('userData ', requestParam);

        resource.save({
          username: requestParam.username,
          password: requestParam.password
        },
        function (response) {
          if (!response.result) {
            return deferred.reject(response.status);
          }
          deferred.resolve(response);
        },
        function (error) {
          return deferred.reject(error);
        });

        return deferred.promise;
      }
    });
}());
