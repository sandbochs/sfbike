angular.module('sfbike').controller('MapPaneCtrl', ['$scope', 'QueryService', function(scope, queryService) {
  window.q = queryService;
  window.sc = scope;
  scope.test = 'LOADED';

  scope.queryModels = queryService.models;
  var queryModels = scope.queryModels;

  scope.coords = { 'latitude': 37.5929321, 'longitude': -122.401131100001 };
  var coords = scope.coords;
  var events = {
    tilesloaded: function(map) {
      console.log('tilesloaded: ', arguments);
      scope.$apply(function() {
        scope.map = map;
      });
    }
  };

  scope.mapOptions = {
    center: { latitude: coords.latitude, longitude: coords.longitude },
    zoom: 15,
    events: events
  };

  //scope.nearbyParking = JSON.parse('[{"location":"Seidel Advertising and Marketing","address":"562 GRANT AVE","latitude":37.792269,"longitude":-122.40578,"distance":0.258617121165836},{"location":"multiple","address":"1105 STOCKTON ST","latitude":37.795904,"longitude":-122.408477,"distance":0.45319525429032},{"location":"Cozy Cable Car Cafe","address":"519 POWELL ST","latitude":37.78943926,"longitude":-122.40889284,"distance":0.487192765123059}]');
  scope.nearbyParking = [];

  queryService.getLocation().then(function(geo) {
    coords = { latitude: geo.coords.latitude, longitude: geo.coords.longitude }
    params = { coords: coords };
    queryService.query.post(params).then(function(response) {
      query = response.data;
      scope.nearbyParking = query.nearby_parking;
    });

    scope.mapOptions.center = coords;
  });
}]);
