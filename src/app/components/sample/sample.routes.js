/**
 * Sample routes
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
**/

(function() {
  'use strict';

  angular.module('app.components.sample').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app.dashboard.sample', {
      url: 'sample',
      views: {
        '@app.dashboard': {
          templateUrl: 'sample/index.html',
          controller: 'SampleController as vm'
        }
      }
    });
  }

})();
