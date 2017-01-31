(function () {
  'use strict';

  angular.module('weatherApp.services', ['ngResource'])
    .factory('weatherFactory', function ($q, $resource, $http) {

      var getForecastUsingCity = function (requestParam) {

        console.log('***** Inside Factory method getForecastUsingCity ****');

        var apiKey = '279b4be6d54c8bf6ea9b12275a567156';
        var apiBaseUrl = '/api/getForecastDetailsWithCity/:location/:units/:apiKey';

        var deferred = $q.defer();

        var resource = $resource(apiBaseUrl, null, {
          get: {
            method: 'GET',
            headers: {
              Authorization: requestParam.token
            }
          }
        });

        resource.get(
          {
            location: requestParam.location,
            units: requestParam.selectedUnit,
            apiKey: apiKey
          },
          {
            headers: {
              authorization: requestParam.token
            }
          },
          function (response) {
            deferred.resolve(response);
          },
          function (error) {
            console.log('weatherAppService: error = ', error);
            return deferred.reject(error);
          }
        );

        return deferred.promise;
      };

      var authUser = function (requestParam) {

        console.log('***** Inside Factory method authUser ****');

        var apiBaseUrl = '/auth/login';

        var deferred = $q.defer();
        var resource = $resource(apiBaseUrl);

        console.log('userData ', requestParam);

        resource.save(
          {
            username: requestParam.username,
            password: requestParam.password
          },
          function (response) {
            if (!response.result) {
              return deferred.reject(response.status);
            }
            else deferred.resolve(response);
          },
          function (error) {
            return deferred.reject(error);
          }
        );

        return deferred.promise;
      };

      return {
        getForecastUsingCity: getForecastUsingCity,
        authUser: authUser
      };
    });
}());
