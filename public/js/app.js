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
    url: '/paste',
    templateUrl: getTemplateUrl('paste'),
    controller: 'NewPasteCtrl'
  });

  $stateProvider.state('paste-view', {
    url: '/:id',
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

function getTemplateUrl(name) {
  return 'assets/template/' + name + '.html';
}