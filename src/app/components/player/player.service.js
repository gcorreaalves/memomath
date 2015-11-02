/**
 * Player service
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.player').service('PlayerService', Service);

  Service.$inject = ['APP', '$http'];

  function Service(APP, $http) {

    this.create = function(player){
      return $http.post(`${APP.API_URL}/player`, player)
    };

    this.list = function(){
      return $http.get(`${APP.API_URL}/players`);
    };

  }

})();
