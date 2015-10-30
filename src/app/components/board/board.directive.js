(function(){
  'user strict';

  angular
    .module('app.components.board')
    .directive('board', Directive);

    function Directive(){
      return {
        restrict : 'EA',
        template: ['<div class="row">',
                    '<div class="col-xs-8 col-xs-offset-2">',
                      '<div class="col-xs-3 text-center" ng-repeat="(key, value) in vm.pieces">',
                        '<a href="javascript:;" class="thumbnail" ng-click="vm.handle_choice(value)">',
                          '{{value.content}}',
                        '</a>',
                      '</div>',
                    '</div>',
                  '</div>'].join(' ')
      };
    }

})();
