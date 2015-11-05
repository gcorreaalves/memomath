/**
 * Attempt service
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.attempt').service('AttemptService', Service);

  Service.$inject = ['APP', '$http'];

  function Service(APP, $http) {

    this.create = function(attempt){
      return $http.post(`${APP.API_URL}/attempt`, attempt);
    };

    this.list = function(){
      return $http.get(`${APP.API_URL}/attempts`);
    };

  }

})();
