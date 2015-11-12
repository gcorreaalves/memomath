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
      return $http.post(`${APP.API_URL}/question`, question);
    };

    this.update = function(id, question){
      return $http.put(`${APP.API_URL}/question/${id}`, question);
    };

    this.show = function(id){
      return $http.get(`${APP.API_URL}/question/${id}`);
    };

    this.list = function(){
      return $http.get(`${APP.API_URL}/questions`);
    };

    this.remove = function(id){
      return $http.delete(`${APP.API_URL}/question/${id}`);
    };

  }

})();
