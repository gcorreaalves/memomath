/**
 * Question service
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.question').service('QuestionService', Service);

  Service.$inject = ['APP', '$http'];

  function Service(APP, $http) {

    this.create = function(question){
      return $http.post(`${APP.API_URL}/question`, question)
    };

    this.list = function(){
      return $http.get(`${APP.API_URL}/questions`);
    };

  }

})();
