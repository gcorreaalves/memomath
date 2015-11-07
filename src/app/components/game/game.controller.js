/**
 * Game controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.game').controller('GameController', Controller);

  let Scope, AService;

  Controller.$inject = ['$scope', 'AttemptService'];

  function Controller($scope, AttemptService) {

    Scope = $scope;
    AService = AttemptService;

    this.Player  = '';
    this.is_playing = false;

    this.hit_errors = 0;

    Scope.$on('board_completed', this.complete.bind(this));
    Scope.$on('board_hit_error', this.count_hit_errors.bind(this));
    Scope.$on('countdown', this.game_over.bind(this));

  }

  Controller.prototype.play = function(){
    this.time = 10;
    this.is_playing = true;
    this.start_game = new Date();
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
        name     : "Gustavo"
      , email    : "gustavo@email.com"
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
