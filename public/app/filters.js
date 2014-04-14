'use strict';

var filters = angular.module('blinky.filters', []);

filters.filter('dateObject', function() {
  return function(date) {
    return new Date(date);
  }
});
