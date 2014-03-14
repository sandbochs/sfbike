angular.module('sfbike').service('MapService', ['$q', function(q) {
  var events, models, service, priv;
  events = {};
  models = { options: {}, events: events, markers: [] };
  service = { models: models };
  priv = {};
  priv.directionsService = new google.maps.DirectionsService();
  priv.directionsRenderer = new google.maps.DirectionsRenderer();
  priv.initialLoad = true;

  service.setMapCenter = function(latitude, longitude) {
    if(models.options.center === null) models.options.center = {};

    if(latitude && longitude) {
      models.options.center.latitude = latitude;
      models.options.center.longitude = longitude;
    }
  };

  priv.directionRequestOptions = function(origin, destination, travelMode) {
    var originCoords, destCoords, options;
    originCoords = new google.maps.LatLng(origin.latitude, origin.longitude);
    destCoords = new google.maps.LatLng(destination.latitude, destination.longitude);
    options = { origin: originCoords, destination: destCoords, travelMode: travelMode };

    return options;
  };

  priv.fetchDirections = function(origin, destination, travelMode) {
    var deferred, options;
    deferred = q.defer();

    options = priv.directionRequestOptions(origin, destination, travelMode);
    priv.directionsService.route(options, function(directions, status) {
      priv.storeDirections(destination, directions);
      deferred.resolve(directions);
    });

    return deferred.promise;
  };

  priv.storeDirections = function(destination, directions) {
    var validDirections = directions.status === google.maps.DirectionsStatus.OK;

    if(validDirections && destination.directions === undefined ) {
      destination.directions = directions;
    }
  };

  service.renderDirections = function(directions) {
    if(directions.status === google.maps.DirectionsStatus.OK) {
      var options = priv.directionsRendererOptions(directions);
      priv.directionsRenderer.setOptions(options);
    }
  };

  priv.directionsRendererOptions = function(directions) {
    var options;
    options = {
      directions: directions,
      draggable: false,
      hideRouteList: true,
      map: models.map,
      suppressInfoWindows: true
    };

    return options;
  };

  service.bicycleDirections = function(origin, destination) {
    if(destination.directions) {
      service.renderDirections(destination.directions);
    }
    else {
      var promise = priv.fetchDirections(origin, destination, google.maps.TravelMode.BICYCLING);
      promise.then(function(directions) { service.renderDirections(directions); });
    }
  };

  return service;
}]);
