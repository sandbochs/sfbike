angular.module('sfbike').controller('MapPaneCtrl', ['$scope', 'QueryService', 'MapService', function(scope, queryService, mapService) {
  var queryModels, mapModels;
  scope.queryModels = queryService.models;
  queryModels = queryService.models;
  scope.mapModels = mapService.models;
  mapModels = mapService.models;

  var coords = { latitude: 37.75415, longitude: -122.489689 };
  mapModels.options.center = coords;
  mapModels.options.zoom = 15;
}]);
