angular.module('sfbike').service('MapService', [function() {
  var events, models, service;
  events = {};
  models = { options: {}, events: events, markers: [] };
  service = { models: models };

  // Google Map event handlers
  events.tilesloaded = function(map) { models.map = map; };

  service.setMapCenter = function(latitude, longitude) {
    if(models.options.center == null) models.options.center = {};
    models.options.center.latitude = latitude;
    models.options.center.longitude = longitude;
  }
  return service;
}]);
