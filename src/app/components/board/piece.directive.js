(function(){
  'use strict';

  angular
    .module('app.components.board')
    .directive('piece', Directive);

    Directive.$inject = ['MathService'];

    function Directive(MathService){
      return {
        link: function(scope, element, attrs) {
          element.on('click', function(event) {
            MathService.Hub.Queue(["Typeset",MathService.Hub]);
          });
        },
        restrict : 'EA',
        template: `<div class="board__piece">
                      <a href="javascript:;" id="{{value.id}}" ng-if="!value.shown" ng-click="vm.handle_choice(value)"></a>
                      <div ng-if="value.shown">
                       {{value.content}}
                      </div>
                    </div>`
      };
    }

})();
