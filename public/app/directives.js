'use strict';

var directives = angular.module('blinky.directives', []);

directives.directive('paste', function($timeout, $interpolate) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      // there must be a better way to do this
      $timeout(function() {
        element.find('code').html(hljs.highlightAuto($interpolate(element.find('code').text())(scope)).value);
      }, 50);
    },
    template: '<pre><code ng-transclude></code></pre>'
  };
});
