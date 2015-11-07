/**
 * Player controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.player').controller('PlayerController', Controller);

  let State, Service, Session;

  Controller.$inject = ['$state', 'PlayerService', 'session'];

  function Controller($state, PlayerService, session) {
    State   = $state;
    Service = PlayerService;
    Session = session;
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
          Session.set('player', {
              'name' : this.player.name
            , 'email' : this.player.email
          });
          State.go('app.dashboard.game.play');
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
