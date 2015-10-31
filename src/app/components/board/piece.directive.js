(function(){
  'user strict';

  angular
    .module('app.components.board')
    .directive('piece', Directive);

    function Directive(){
      return {
        link: function(scope, element, attrs) {
          element.on('click', function(event) {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
          });
        },
        restrict : 'EA',
        template: ['<div class="board__piece">',
                    '<a href="javascript:;" id="{{value.id}}" ng-if="!value.shown"',
                      'ng-click="vm.handle_choice(value)"></a>',
                    '<div ng-if="value.shown">',
                      '{{value.content}}',
                    '</div>',
                  '</div>'].join(' ')
      };
    }

})();
