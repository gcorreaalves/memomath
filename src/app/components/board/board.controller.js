/**
 * Board controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.board').controller('BoardController', Controller);

  Controller.$inject = ['$scope'];

  function Controller($scope) {

    this.hits = 0;
    this.pieces_opened = [];
    this.total_pieces_opened = [];

    this.pieces = [
      { id : 1, content : '1', pair : 2 },
      { id : 2, content : '2', pair : 1 },
      { id : 3, content : '3', pair : 4 },
      { id : 4, content : '4', pair : 3 },
      { id : 5, content : '5', pair : 6 },
      { id : 6, content : '6', pair : 5 },
      { id : 7, content : '7', pair : 8 },
      { id : 8, content : '8', pair : 7 },
      { id : 9, content : '9', pair : 10 },
      { id : 10, content : '10', pair : 9 },
      { id : 11, content : '11', pair : 12 },
      { id : 12, content : '12', pair : 11 }
    ];

    this.complete = function(){
      console.log(this.hits);
      if( this.is_completed() ){
        $scope.$emit('game_completed', 'Some data');
      }
    };

  }

  Controller.prototype.handle_choice = function(piece){

    this.pieces_opened.push(piece);

    let pieces = this.pieces_opened;

    count_hits.call(this, pieces);

    this.complete();

  };

  Controller.prototype.is_completed = function(){
    return this.hits === (this.pieces.length / 2);
  };

  function check_pair(pieces){
    if(pieces[0].id === pieces[1].pair){
      return true;
    }
    return false;
  };

  function count_hits(pieces){
    let total_pieces = this.total_pieces_opened;
    if( pieces.length === 2 ){
      if( check_pair( pieces ) ){
        if( total_pieces.indexOf( pieces[0] ) === -1 ){
          this.hits++;
          total_pieces.push(pieces[0])
          total_pieces.push(pieces[1]);
        }
      }
      pieces.length = 0;
    }
  };

})();
