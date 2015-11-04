/**
 * Player controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.player').controller('PlayerController', Controller);

  let State, Service;

  Controller.$inject = ['$state', 'PlayerService'];

  function Controller($state, PlayerService) {
    State   = $state;
    Service = PlayerService;
    this.player = {
        name  : ''
      , email : ''
    };
  }

  Controller.prototype.create = function(){
    if( this.player.name && this.player.email ){
      let result = Service.create(this.player);
      result.then((data) => {
        if( data.status === 201 ){
          State.go('app.dashboard.players');
        }
      }, (errors) => {

      });
    }
  };

  Controller.prototype.list = function(){
    let result = Service.list();
    result.then( (data) => {
      this.players = data.data;
    }, (errors) => {

    });
  };

})();
