angular.module('sfbike').controller('NavPaneCtrl', ['$scope', 'QueryService', 'MapService', function(scope, queryService, mapService) {
  var queryModels, mapModels, models;
  scope.queryModels = queryService.models;
  queryModels = queryService.models;

  scope.mapModels = mapService.models;
  mapModels = mapService.models;

  scope.models = { query: {}, queryInput: { address: '' } };
  models = scope.models;

  scope.parkingItemSelected = function(parking) {
    return parking.latitude === models.parking.latitude && parking.longitude === models.parking.longitude;
  };

  scope.query = function(input) {
    queryService.save(input).then(function(query) {
      models.query = query;
      scope.renderQuery(query);
    });
  };

  scope.renderDirections = function(origin, parking) {
    mapService.bicycleDirections(origin, parking);
    models.parking = parking;
  };

  scope.renderQuery = function(query) {
    mapService.setMapCenter(query.latitude, query.longitude);

    if(query.nearby_parking && query.nearby_parking.length > 0) {
      mapModels.markers = query.nearby_parking;
      scope.renderDirections(query, query.nearby_parking[0]);
    }
  };
}]);