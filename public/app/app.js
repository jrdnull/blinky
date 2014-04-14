'use strict';

var app = angular.module('blinky', [
  'ui.router',
  'blinky.controllers',
  'blinky.directives',
  'blinky.filters',
  'blinky.services'
]);

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

function getTemplateUrl(name) {
  return 'assets/app/template/' + name + '.html';
}
