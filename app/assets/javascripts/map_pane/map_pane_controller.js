angular.module('sfbike').controller('MapPaneCtrl', ['$scope', 'QueryService', 'MapService', function(scope, queryService, mapService) {
  var queryModels, mapModels;
  scope.queryModels = queryService.models;
  queryModels = queryService.models;
  scope.mapModels = mapService.models;
  mapModels = mapService.models;

  // Load a map of San Francisco
  mapModels.options.center = { latitude: 37.7577, longitude: -122.4376 };
  mapModels.options.zoom = 13;

}]);
