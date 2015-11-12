/**
 * Question controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.question').controller('QuestionController', Controller);

  let State, Service;

  Controller.$inject = ['$state', 'QuestionService'];

  function Controller($state, QuestionService) {
    State   = $state;
    Service = QuestionService;
    this.question = {
        question  : ''
      , answer    : ''
      , level     : 1
    };
  }

  Controller.prototype.create = function(){
    let result = Service.create(this.question);
    result.then((data) => {
      if( data.status === 201 ){
        State.go('app.dashboard.questions');
      }
    }, (errors) => {

    });
  };

  Controller.prototype.edit = function(id){
    let result = Service.update(id, this.question);
    result.then( (data) => {
      State.go('app.dashboard.questions');
    }, (errors) => {
      console.log(errors);
    });
  };

  Controller.prototype.save = function(){
    let id = State.params.id;

    if( this.question.question && this.question.answer && this.question.level ){
      if(id){
        return this.edit(id);
      }
      return this.create();
    }else{
      console.log('Missing fields....');
    }

  };

  Controller.prototype.show = function(){
    let id = State.params.id;
    let result = Service.show(id);
    result.then( (data) => {
      this.question = data.data;
    }, (errors) => {

    });
  };

  Controller.prototype.list = function(){
    let result = Service.list();
    result.then( (data) => {
      this.questions = data.data;
    }, (errors) => {

    });
  };

  Controller.prototype.remove = function(question){
    let result = Service.remove(question._id);
    result.then( (data) => {
      State.go(State.current, {}, {reload:true});
    }, (errors) => {
      console.log(errors);
    });
  };

})();
