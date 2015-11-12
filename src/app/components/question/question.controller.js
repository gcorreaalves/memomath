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
    if( this.question.question && this.question.answer ){
      let result = Service.create(this.question);
      result.then((data) => {
        if( data.status === 201 ){
          State.go('app.dashboard.questions');
        }
      }, (errors) => {

      });
    }
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
