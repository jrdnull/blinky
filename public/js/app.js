'use strict';

var app = angular.module('blinky', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  // default route
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: getTemplateUrl('home')
  });

  $stateProvider.state('paste', {
    url: '/pastes/new',
    templateUrl: getTemplateUrl('paste'),
    controller: 'NewPasteCtrl'
  });

  $stateProvider.state('paste-view', {
    url: '/pastes/:id',
    templateUrl: getTemplateUrl('paste-view'),
    controller: 'ViewPasteCtrl'
  });
});

app.controller('NewPasteCtrl', function($scope, $state, $http) {
  $scope.submit = function() {
    $http.post('/api/pastes', $scope.paste).success(function(data, status, headers, config) {
      $state.go('paste-view', data, {});
    });
  }
});

app.controller('ViewPasteCtrl', function($scope, $stateParams, $http) {
  $http.get('/api/pastes/' + $stateParams.id).success(function(data) {
    $scope.paste = data;
  });
});

app.directive('paste', function($timeout, $interpolate) {
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

app.filter('dateObject', function() {
  return function(date) {
    return new Date(date);
  }
});

function getTemplateUrl(name) {
  return 'assets/template/' + name + '.html';
}
