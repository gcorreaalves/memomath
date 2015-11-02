/**
 * Question routes
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
**/

(function() {
  'use strict';

  angular.module('app.components.question').config(Routes);

  Routes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app.dashboard.question', {
      url: 'question',
      views: {
        '@app.dashboard': {
          templateUrl: 'question/index.html',
          controller: 'QuestionController as vm'
        }
      }
    })
    .state('app.dashboard.questions', {
      url: 'questions',
      views: {
        '@app.dashboard': {
          templateUrl: 'question/list.html',
          controller: 'QuestionController as vm'
        }
      }
    });
  }

})();
