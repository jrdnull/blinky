'use strict';

var directives = angular.module('blinky.directives', []);

directives.directive('paste', function() {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs) {
      attrs.$observe('code', function(code) {
        element.find('code').html(hljs.highlightAuto(code).value);
      });
    },
    template: '<pre><code></code></pre>'
  };
});
