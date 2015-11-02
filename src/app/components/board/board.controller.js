/**
 * Board controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.board').controller('BoardController', Controller);

  let Scope, Timeout, Service;

  Controller.$inject = ['$scope', '$timeout', 'BoardService'];

  function Controller($scope, $timeout, BoardService) {

    Scope   = $scope;
    Timeout = $timeout;
    Service = BoardService;

    this.hits = 0;
    this.pieces_opened = [];
    this.total_pieces_opened = [];

  }

  Controller.prototype.init = function(){
    let result = Service.get_pieces();
    result.then((questions) => {
      this.pieces = questions;
    }, (errors) => {
      console.log(errors);
    });
  };

  Controller.prototype.open_piece = function(id){
    this.pieces.find( (element, index, array) => {
      if( element.id === id){
        element.shown = true;
      }
    });
  };

  Controller.prototype.close_piece = function(id){
    this.pieces.forEach(function(piece){
      if( piece.id === id){
        Timeout(function(){
          piece.shown = false;
        }, 2000);
      }
    });
  };

  Controller.prototype.handle_choice = function(piece){

    this.open_piece(piece.id);

    this.pieces_opened.push(piece);

    let pieces = this.pieces_opened;

    this.store_hits(pieces);

  };

  Controller.prototype.check_pair = function(pieces){
    if(pieces[0].id === pieces[1].pair){
      return true;
    }
    return false;
  };

  Controller.prototype.complete = function(){
    if( this.is_completed() ){
      Scope.$emit('board_completed', 'Some data');
    }
  };

  Controller.prototype.is_completed = function(){
    return this.hits === (this.pieces.length / 2);
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
