'use strict';

/* Filters */

angular.module('weatherApp.filters', [])

  .filter('placeholder', [function() {
    return function (input, phvalue) {
      return (angular.isUndefined(input) || input == '') ? phvalue : input;
    };
  }]);
