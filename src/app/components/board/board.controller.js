/**
 * Board controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.board').controller('BoardController', Controller);

  Controller.$inject = ['$scope', '$timeout'];

  function Controller($scope, $timeout) {

    this.hits = 0;
    this.pieces_opened = [];
    this.total_pieces_opened = [];

    this.pieces = [
      { id : 1, content : '1', pair : 2, shown : false },
      { id : 2, content : '2', pair : 1, shown : false },
      { id : 3, content : '3', pair : 4, shown : false },
      { id : 4, content : '4', pair : 3, shown : false },
      { id : 5, content : '5', pair : 6, shown : false },
      { id : 6, content : '6', pair : 5, shown : false },
      { id : 7, content : '7', pair : 8, shown : false },
      { id : 8, content : '8', pair : 7, shown : false },
      { id : 9, content : '9', pair : 10, shown : false },
      { id : 10, content : '10', pair : 9, shown : false },
      { id : 11, content : '11', pair : 12, shown : false },
      { id : 12, content : '12', pair : 11, shown : false }
    ];

    this.complete = function(){
      if( this.is_completed() ){
        $scope.$emit('game_completed', 'Some data');
      }
    };

    this.open_piece = function(id){
      this.pieces.forEach(function(piece){
        if( piece.id === id){
          piece.shown = true;
        }
      });
    };

    this.close_piece = function(id){
      this.pieces.forEach(function(piece){
        if( piece.id === id){
          $timeout(function(){
            piece.shown = false;
          }, 2000);
        }
      });
    };

  }

  Controller.prototype.handle_choice = function(piece){

    this.open_piece(piece.id);

    this.pieces_opened.push(piece);

    let pieces = this.pieces_opened;

    store_hits.call(this, pieces);

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

  function store_hits(pieces){
    let total_pieces = this.total_pieces_opened;
    if( pieces.length === 2 ){
      if( check_pair( pieces ) ){
        if( total_pieces.indexOf( pieces[0] ) === -1 ){
          this.hits++;
          total_pieces.push(pieces[0])
          total_pieces.push(pieces[1]);
        }
      }else{
        pieces.forEach(function(piece){
          this.close_piece(piece.id);
        }.bind(this));
      }
      pieces.length = 0;
    }
  };

})();
