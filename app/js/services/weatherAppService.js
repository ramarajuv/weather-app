(function () {
  'use strict';

  angular.module('weatherApp.services', ['ngResource'])
        .factory('weatherFactory', function ($q, $resource) {

          var getForecastUsingCity = function (requestParam) {

            console.log('***** Inside Factory method getForecastUsingCity ****');

            var apiKey = '279b4be6d54c8bf6ea9b12275a567156';
            var apiBaseUrl = '/api/getForecastDetailsWithCity/:location/:units/:apiKey';

            var deferred = $q.defer();
            var resource = $resource(apiBaseUrl);

            resource.get(
                    {
                      location: requestParam.location,
                      units: requestParam.selectedUnit,
                      apiKey: apiKey
                    },
                    function (response) {
                      deferred.resolve(response);
                    },
                    function (error) {
                      return deferred.reject(error.status);
                    }
                );

            return deferred.promise;
          };

          return {
            getForecastUsingCity: getForecastUsingCity
          };
        });
}());
