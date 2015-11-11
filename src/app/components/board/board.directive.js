(function(){
  'use strict';

  angular
    .module('app.components.board')
    .directive('board', Directive);

    function Directive(){
      return {
        restrict : 'EA',
        template: `<div class="row" ng-init="vm.init()">
                      <div class="board-container">
                        <div class="text-center" ng-repeat="(key, value) in vm.pieces">
                          <piece></piece>
                        </div>
                      </div>
                    </div>`
      };
    }

})();
