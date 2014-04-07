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

  $stateProvider.state('paste.:id', {
    url: '/id',
    templateUrl: getTemplateUrl('paste.view')
  });
});

app.controller('NewPasteCtrl', function($scope, $http) {
  $scope.submit = function() {
    $http.post('/api/pastes', $scope.paste).success(function(data, status, headers, config) {
      console.log(data);
      // TODO display new paste
    });
  }
});

function getTemplateUrl(name) {
  return 'assets/template/' + name + '.html';
}
