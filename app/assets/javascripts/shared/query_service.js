angular.module('sfbike').service('QueryService', ['$window', function(window) {
  var service, models;
  models = { coords: {} };
  service = { models: models };

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
