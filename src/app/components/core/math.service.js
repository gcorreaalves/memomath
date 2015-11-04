/**
 * Math service
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.core').factory('MathService', Service);

  Service.$inject = ['$window'];

  function Service($window) {

    console.log($window.MathJax);

    return $window.MathJax;

  }

})();
