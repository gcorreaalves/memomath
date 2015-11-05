/**
 * Attempt routes
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
**/

(function() {
  'use strict';

  angular.module('app.components.attempt').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app.dashboard.attempts', {
      url: 'attempts',
      views: {
        '@app.dashboard': {
          templateUrl: 'attempt/list.html',
          controller: 'AttemptController as vm'
        }
      }
    });
  }

})();
