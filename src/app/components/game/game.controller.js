/**
 * Game controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.game').controller('GameController', Controller);

  Controller.$inject = ['$scope'];

  function Controller($scope) {

    this.Player  = '';
    this.is_playing = false;

    $scope.$on('game_completed', this.complete.bind(this));

  }

  Controller.prototype.play = function(){
    this.is_playing = true;
  };

  Controller.prototype.complete = function(){
    this.is_playing = false;
    console.log('Parabéns...', this.Player);
  };

  Controller.prototype.game_over = function(){
    this.is_playing = false;
  }

})();
