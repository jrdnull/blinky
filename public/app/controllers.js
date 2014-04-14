'use strict';

var controllers = angular.module('blinky.controllers', ['ui.router']);

controllers.controller('NewPasteCtrl', function ($scope, $state, $http) {
  $scope.submit = function () {
    $http.post('/api/pastes', $scope.paste).success(function (data) {
      $state.go('paste', data, {});
    });
  }
});

controllers.controller('ViewPasteCtrl', function ($scope, $stateParams, $http) {
  $http.get('/api/pastes/' + $stateParams.id).success(function (data) {
    $scope.paste = data;
  });
})

controllers.controller('RecentPastesCtrl', function ($scope, $http) {
  $http.get('/api/pastes').success(function (data) {
    $scope.pastes = data;
  });
});
