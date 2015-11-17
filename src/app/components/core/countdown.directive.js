/**
 * Countdown service
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function(){
  'use strict';
  angular
    .module('app.components.core')
    .directive('countdown', Directive);

    let Timeout;

    Directive.$inject = ['$timeout'];

    function Directive($timeout){

      Timeout = $timeout;

      return {
        restrict : 'EA',
        scope:{
            bindModel:'=ngModel'
        },
        link: link,
        template: `<div class="time" ng-model="bindModel">
                    <span class="day">00</span> :
                    <span class="hour">00</span> :
                    <span class="minute">00</span> :
                    <span class="second">00</span>
                  </div>`
      };
    }

    function link(scope, element, attrs) {

      let seconds = scope.bindModel;

      if( typeof seconds !== 'number' ){
        let final = new Date(seconds);
        let current = new Date(seconds);
        seconds = Math.floor((final - current) / 1000);
      }

      countdown(scope, element, seconds);
    }

    function countdown(scope, element, time){

      if ( !time ){
        scope.$emit('countdown', true) ;
        return;
      }

      let t = time;

      let days = Math.floor(t / 86400);
      t -= days * 86400;
      let hours = Math.floor(t / 3600) % 24;
      t -= hours * 3600;
      let minutes = Math.floor(t / 60) % 60;
      t -= minutes * 60;
      let seconds = t % 60;

      html(element, days, hours, minutes, seconds);

      Timeout(countdown, 1000, true, scope, element, time-1);
    }

    function html(element, ...date){
      element
      .find('.day').text(date[0])
      .siblings('.hour').text(date[1])
      .siblings('.minute').text(date[2])
      .siblings('.second').text(date[3]);
    }

})();
