angular.module('sfbike').controller('NavPaneCtrl', ['$scope', 'QueryService', 'MapService', function(scope, queryService, mapService) {
  window.np = scope;
  window.qs = queryService;
  window.ms = mapService;

  var queryModels, mapModels, models;
  scope.queryModels = queryService.models;
  queryModels = queryService.models;
  scope.mapModels = mapService.models;
  mapModels = mapService.models;
  models = { query: {} };

  scope.query = function(query) {
    queryService.save(query).then(function(query) {
      scope.renderQuery(query);
    });
  }

  scope.renderQuery = function(query) {
    mapService.setMapCenter(query.latitude, query.longitude);

    if(query.nearby_parking && query.nearby_parking.length > 0) {
      var nearestParking = query.nearby_parking[0];

      scope.renderParking(query.nearby_parking);
      mapService.bicycleDirections(query, nearestParking);
    }
  }

  scope.renderParking = function(parking) {
    mapModels.markers = parking;
  }
}]);
