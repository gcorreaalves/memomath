/**
 * Attempt controller
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.attempt').controller('AttemptController', Controller);

  let State, Service;

  Controller.$inject = ['$state', 'AttemptService'];

  function Controller($state, AttemptService) {
    State   = $state;
    Service = AttemptService;
    this.attempt = {
        name  : ''
      , email : ''
    };
  }

  Controller.prototype.create = function(){
    if( this.attempt.name && this.attempt.email ){
      let result = Service.create(this.attempt);
      result.then((data) => {
        if( data.status === 201 ){
          State.go('app.dashboard.attempts');
        }
      }, (errors) => {

      });
    }
  };

  Controller.prototype.list = function(){
    let result = Service.list();
    result.then( (data) => {
      this.attempts = data.data;
    }, (errors) => {

    });
  };

})();
