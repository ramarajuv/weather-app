/* global angular */

(function() { // eslint-disable-line
  'use strict'; // eslint-disable-line

  angular
    .module('weatherApp')
    .directive('login', login);

  function login() {
    var directive = {
      restrict: 'E',
      templateUrl: 'js/components/login/login.html',
      scope: {},
      controller: controller,
      controllerAs: 'vm',
      bindToController: true,
    };

    return directive;

    function controller($scope, $log, $location, $localStorage, authService) {
      var eventSource = null;
      var evtArray = []; // stores array of listeners to destroy

      var vm = this;

      vm.message = '';
      vm.loginData = {
        username: '',
        password: ''
      };

      // methods
      vm.submitLogin = submitLogin;
      vm.submitLogout = submitLogout;

      activate();

      function activate() {
        $scope.$on('$destroy', function() {
          $log.debug('login: $on.destroy()');
          if (eventSource !== null) {
            eventSource.close();
          }

          evtArray.forEach(function(evt) {
            evt();
          });
        });
      }

      // Get forecast data for location as given in vm.location
      function submitLogin() {
        vm.message = '';

        if (vm.loginData.username === '' || vm.loginData.password === '') {
          vm.message = 'Please provide login information';
          return;
        }

        $log.info('**** Before calling Factory method for Login****');
        authService.login(vm.loginData)
        .then(function(data) {
          $log.info('Login authenticated', data);
          $localStorage.token = data.token;
          $location.path('forecast');
        },
        function() {
          $log.info('Login failed');
          vm.message = 'Login failed due to incorrect username/password. Please correct and retry.';
        });
      }

      function submitLogout() {
        authService.logout()
      }
    }
  }
})();
