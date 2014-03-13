'use strict'

var sfbike = angular.module('sfbike', [])
sfbike.config(['$httpProvider', function(httpProvider) {
  httpProvider.defaults.headers.common['Accept'] = 'application/json';
}]);

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

sfbike.service('QueryService', ['$window', '$http', function(window, http) {
  var service, models;
  models = { coords: {} };
  service = { models: models, query: {} };

  service.query.post = function(params) {
    var config = {
      url: '/queries',
      method: 'post',
      data: params,
      responseType: 'json'
    }

    return http(config);
  }

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
