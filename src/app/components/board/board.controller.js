/**
 * Board controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.board').controller('BoardController', Controller);

  let Scope, Timeout;

  Controller.$inject = ['$scope', '$timeout'];

  function Controller($scope, $timeout) {

    Scope   = $scope;
    Timeout = $timeout;

    this.hits = 0;
    this.pieces_opened = [];
    this.total_pieces_opened = [];

    this.pieces = [
      { id : 1, content : "$$9 - 7$$", pair : 2, shown : false },
      { id : 2, content : '2', pair : 1, shown : false },
      { id : 3, content : '$${ x + 5 \\over 2} = 10$$', pair : 4, shown : false },
      { id : 4, content : '15', pair : 3, shown : false },
      { id : 5, content : '$$2+2$$', pair : 6, shown : false },
      { id : 6, content : '4', pair : 5, shown : false },
      { id : 7, content : '3', pair : 8, shown : false },
      { id : 8, content : '$$ \\sqrt{9} $$', pair : 7, shown : false },
      { id : 9, content : '$$ 10.10 $$', pair : 10, shown : false },
      { id : 10, content : '100', pair : 9, shown : false },
      { id : 11, content : '$$ 8 \\over 2$$', pair : 12, shown : false },
      { id : 12, content : '4', pair : 11, shown : false }
    ].sort( () => 0.5 - Math.random() );

  }

  Controller.prototype.close_piece = function(id){
    this.pieces.forEach(function(piece){
      if( piece.id === id){
        Timeout(function(){
          piece.shown = false;
        }, 2000);
      }
    });
  };

  Controller.prototype.open_piece = function(id){
    this.pieces.find( (element, index, array) => {
      if( element.id === id){
        element.shown = true;
      }
    });
  };

  Controller.prototype.open_piece = function(id){
    this.pieces.find( (element, index, array) => {
      if( element.id === id){
        element.shown = true;
      }
    });
  };

  Controller.prototype.complete = function(){
    if( this.is_completed() ){
      Scope.$emit('board_completed', 'Some data');
    }
  };

  Controller.prototype.handle_choice = function(piece){

    this.open_piece(piece.id);

    this.pieces_opened.push(piece);

    let pieces = this.pieces_opened;

    this.store_hits(pieces);

  };

  Controller.prototype.is_completed = function(){
    return this.hits === (this.pieces.length / 2);
  };

  Controller.prototype.check_pair = function(pieces){
    if(pieces[0].id === pieces[1].pair){
      return true;
    }
    return false;
  };

  Controller.prototype.store_hits = function(pieces){
    let total_pieces = this.total_pieces_opened;
    if( pieces.length < 2 ){
      return false;
    }
    if( this.check_pair( pieces ) ){
      if( total_pieces.indexOf( pieces[0] ) === -1 ){
        this.hits++;
        total_pieces.push(...pieces);
        this.complete();
      }
    }else{
      pieces.forEach( (piece) => {
        this.close_piece(piece.id);
      });
    }
    pieces.length = 0;
    return true;
  };

})();
