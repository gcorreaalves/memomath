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
                        '<div class="board__piece">',
                          '<a href="javascript:;" id="{{value.id}}" ng-if="!value.shown"',
                            'ng-click="vm.handle_choice(value)"></a>',
                          '<div ng-if="value.shown">',
                            '{{value.content}}',
                          '</div>',
                        '</div>',
                      '</div>',
                    '</div>',
                  '</div>'].join(' ')
      };
    }

})();
