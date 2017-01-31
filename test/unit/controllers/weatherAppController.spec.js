/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */

'use strict';

describe('weatherApp.controllers module', function() {

  var scope;
  var WeatherAppController;
  var WeatherAppFactory;

  beforeEach(function() {
    module('weatherApp');
    module('weatherApp.controllers');
    module('weatherApp.services');

    inject(function($rootScope, $controller, _weatherFactory_) {

      scope = $rootScope.$new();
      WeatherAppFactory = _weatherFactory_;

      WeatherAppController = $controller('WeatherAppCtrl', {
        $scope: scope,
        weatherFactory: WeatherAppFactory
      });

    });
  });

    // Check if Controller definition is found
  it('controller should be defined', function() {
    expect(WeatherAppController).toBeDefined();
  });

    // Start testing the controller
  describe('when the controller is invoked,', function() {

    var factorySpy;
    var forecastResult = {};
    var paramObj = {};

    beforeEach(function() {

      scope.location = 'Phoenix';
      paramObj = {
        location: scope.location,
        selectedUnit: scope.selectedUnit
      };
      forecastResult = {
        result: 'result'
      };

      inject(function() {
        factorySpy = spyOn(WeatherAppFactory, 'getForecastUsingCity').and.returnValue({
          then: function (successFn) {
            successFn(forecastResult);
          }
        });
      });
    });

    it('check for controller variables initialized', function() {
      expect(scope.dataPresent).toBeFalsy();
      expect(scope.selectedUnit).toEqual('imperial');
    });

    it('check for controller method definitions present', function() {
      expect(scope.getForecastByLocation).toBeDefined();
    });

    it('check factory method getForecastUsingCity parameters and return value', function() {

      scope.getForecastByLocation();

            // Assert that the factory method is called with correct parameter
      expect(factorySpy).toHaveBeenCalledWith(paramObj);

            // Assert the return value of the factory method
      expect(scope.forecast).toEqual(forecastResult);
    });

  });

});
