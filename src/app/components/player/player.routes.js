/**
 * Player routes
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
**/

(function() {
  'use strict';

  angular.module('app.components.player').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app.dashboard.player', {
      url: 'player',
      views: {
        '@app.dashboard': {
          templateUrl: 'player/index.html',
          controller: 'PlayerController as vm'
        }
      }
    })
    .state('app.dashboard.players', {
      url: 'players',
      views: {
        '@app.dashboard': {
          templateUrl: 'player/list.html',
          controller: 'PlayerController as vm'
        }
      }
    });
  }

})();
