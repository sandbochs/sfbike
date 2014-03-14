angular.module('sfbike').controller('NavPaneCtrl', ['$scope', 'QueryService', 'MapService', function(scope, queryService, mapService) {
  window.np = scope;
  window.qs = queryService;
  window.ms = mapService;

  var queryModels, mapModels, models;
  scope.queryModels = queryService.models;
  queryModels = queryService.models;

  scope.mapModels = mapService.models;
  mapModels = mapService.models;

  scope.models = { query: {}, queryInput: '' };
  models = scope.models;

  scope.query = function(input) {
    query = { address: input }

    queryService.save(query).then(function(query) {
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

  scope.query('351 California St. 94104');
}]);
