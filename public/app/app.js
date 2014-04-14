'use strict';

var app = angular.module('blinky', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  // default route
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    views: {
      '': { templateUrl: getTemplateUrl('home') },
      'newPaste@home': {
        templateUrl: getTemplateUrl('new-paste'),
        controller: 'NewPasteCtrl'
      },
      'recentPastes@home': {
        templateUrl: getTemplateUrl('recent-pastes'),
        controller: 'RecentPastesCtrl'
      }
    }
  });

  $stateProvider.state('paste', {
    url: '/:id',
    templateUrl: getTemplateUrl('view-paste'),
    controller: 'ViewPasteCtrl'
  });
});

app.controller('NewPasteCtrl', function($scope, $state, $http) {
  $scope.submit = function() {
    $http.post('/api/pastes', $scope.paste).success(function(data) {
      $state.go('paste', data, {});
    });
  }
});

app.controller('ViewPasteCtrl', function($scope, $stateParams, $http) {
  $http.get('/api/pastes/' + $stateParams.id).success(function(data) {
    $scope.paste = data;
  });
});

app.controller('RecentPastesCtrl', function($scope, $http) {
  $http.get('/api/pastes').success(function(data) {
    $scope.pastes = data;
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
  return 'assets/app/template/' + name + '.html';
}
