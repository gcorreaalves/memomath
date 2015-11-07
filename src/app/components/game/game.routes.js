/**
 * Game routes
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
**/

(function() {
  'use strict';

  angular.module('app.components.game').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app.dashboard.game', {
      url: 'game',
      views: {
        '@app.dashboard': {
          templateUrl: 'game/index.html',
          controller: 'GameController as vm'
        }
      }
    })
    .state('app.dashboard.game.play', {
      url: '/play',
      views: {
        '@app.dashboard': {
          templateUrl: 'game/game.html',
          controller: 'GameController as vm'
        }
      }
    });
  }

})();
