angular.module('sfbike').controller('NavPaneCtrl', ['$scope', 'QueryService', 'MapService', function(scope, queryService, mapService) {
  var queryModels, mapModels, models;
  scope.queryModels = queryService.models;
  queryModels = queryService.models;

  scope.mapModels = mapService.models;
  mapModels = mapService.models;

  scope.models = { query: {}, queryInput: { address: '' } };
  models = scope.models;

  // Try to geolocate on page load
  var firstLoad = true;
  mapModels.events.tilesloaded = function(map) {
    mapModels.map = map;

    if(firstLoad) {
      firstLoad = false;

      queryService.getLocation().then(function(coords) {
        scope.query(coords);
      }, function(error){
        scope.query();
      });
    }
  };

  scope.parkingItemSelected = function(parking) {
    return parking.latitude === models.parking.latitude && parking.longitude === models.parking.longitude && parking.address === models.parking.address;
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
