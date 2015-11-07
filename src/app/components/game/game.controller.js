/**
 * Game controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.game').controller('GameController', Controller);

  let Scope, State, AService, Session;

  Controller.$inject = ['$scope', '$state', 'AttemptService', 'session'];

  function Controller($scope, $state, AttemptService, session) {

    Scope    = $scope;
    State    = $state;
    AService = AttemptService;
    Session  = session;

    this.is_playing = false;

    this.hit_errors = 0;

    Scope.$on('board_completed', this.complete.bind(this));
    Scope.$on('board_hit_error', this.count_hit_errors.bind(this));
    Scope.$on('countdown', this.game_over.bind(this));

  }

  Controller.prototype.play = function(){
    this.get_player();
    this.time = 100;
    this.is_playing = true;
    this.start_game = new Date();
  };

  Controller.prototype.get_player = function () {
    let player = Session.get('player');
    if( player ){
      this.player = player;
    }else{
      State.go('app.dashboard.game');
    }
  };

  Controller.prototype.count_hit_errors = function(event, data){
    this.hit_errors++;
  };

  Controller.prototype.complete = function(event, data){
    this.end_game = new Date();
    this.send_attempt(true);
    this.reset_game();
  };

  Controller.prototype.game_over = function(){
    this.end_game = new Date();
    this.send_attempt(false);
    this.reset_game();
  };

  Controller.prototype.reset_game = function(){
    this.is_playing = false;
    this.start_game = 0;
    this.end_game   = 0;
    this.hit_errors = 0;
  };

  Controller.prototype.send_attempt = function(completed){
    let attempt = this;
    let data = {
        name     : attempt.player.name
      , email    : attempt.player.email
      , attempts : [ {
          level  : 1
        , errors : attempt.hit_errors
        , time   : (attempt.end_game - attempt.start_game) / 1000
        , created_at : new Date().getTime()
        , completed : completed
      } ]
    };
    AService.create( data );
  };

})();
