'use strict'

var sfbike = angular.module('sfbike', [])

sfbike.controller('MapPaneCtrl', ['$scope', 'QueryService', function(scope, locationService) {
  window.l = locationService;
  scope.test = 'Map Ctrl';
}]);


sfbike.directive('mapPane', function() {
  return {
    restrict: 'A',
    scope: {},
    controller: 'MapPaneCtrl',
    templateUrl: '/templates/map_pane.html',
    link: function(scope, el, attrs) {
    }
  };
});

sfbike.service('QueryService', ['$window', function(window) {
  var service, models;
  models = { coords: {} };
  service = { models: models };

  service.getLocation = function() {
    if(window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(function(pos) {
        models.coords.latitude = pos.coords.latitude;
        models.coords.longitude = pos.coords.longitude;
      });
    }
  };

  return service;
}]);
