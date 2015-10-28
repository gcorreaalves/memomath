(function(){
  'user strict';

  angular
    .module('app.components.board')
    .directive('board', function(){
      return {
        restrict : 'EA',
        template: '<h1>Board</h1>'
      };
    });

})();
